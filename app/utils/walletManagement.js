/* eslint camelcase: 0 */
import { getFormattedNum3 } from './numbers';

import {
  ACCOUNTS_TABLE,
  ALL_BOUNTIES_SCOPE,
  ALL_PERIODS_SCOPE,
  BOUNTY_TABLE,
  SET_BOUNTY_METHOD,
  PAY_BOUNTY_METHOD,
  INF_LIMIT,
  PERIOD_RATING_TABLE,
  PERIOD_REWARD_TABLE,
  PICKUP_REWARD_METHOD,
  SEND_TOKEN_METHOD,
  TOTAL_RATING_TABLE,
  TOTAL_REWARD_TABLE,
  USER_SUPPLY_SCOPE,
  ALL_USER_BOUNTIES_SCOPE,
  USER_SUPPLY_TABLE,
  BOOST_STATISTICS_TABLE,
  BOOST_STATISTICS_SCOPE,
  USER_BOOST_TABLE,
  ADD_BOOST_METHOD,
} from './constants';
import { MAX_STAKE_PREDICTION, MIN_STAKE_PREDICTION } from 'containers/Boost/constants';

import { ApplicationError } from './errors';

const PERIOD_LENGTH = {
  development: 2*60*60, // two hours
  test: 2*60*60, // two hours
  production: 7*24*60*60, // one week
}

/**
 * @balance - string, example - '1000.000000 PEER'
 */
export const getBalance = async (eosService, user) => {
  const val = await eosService.getTableRow(
    ACCOUNTS_TABLE,
    user,
    undefined,
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
  );

  // remove all chars besides of number
  return val ? convertPeerValueToNumberValue(val.balance) : 0;
};

/**
 * @reward - string, example - '1000.000000 PEER'
 */

const getUserSupplyValues = eosService =>
  eosService.getTableRow(
    USER_SUPPLY_TABLE,
    USER_SUPPLY_SCOPE,
    undefined,
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
  );

const getTotalReward = eosService =>
  eosService.getTableRows(
    TOTAL_REWARD_TABLE,
    ALL_PERIODS_SCOPE,
    0,
    INF_LIMIT,
    undefined,
    undefined,
    undefined,
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
  );

const getTotalRating = eosService =>
  eosService.getTableRows(
    TOTAL_RATING_TABLE,
    ALL_PERIODS_SCOPE,
    0,
    INF_LIMIT,
    undefined,
    undefined,
    undefined,
    process.env.EOS_CONTRACT_ACCOUNT,
  );

const getPeriodRating = (eosService, user) =>
  eosService.getTableRows(
    PERIOD_RATING_TABLE,
    user,
    0,
    INF_LIMIT,
    undefined,
    undefined,
    undefined,
    process.env.EOS_CONTRACT_ACCOUNT,
  );

const getWeekRewards = (eosService, user) =>
  eosService.getTableRows(
    PERIOD_REWARD_TABLE,
    user,
    0,
    INF_LIMIT,
    undefined,
    undefined,
    undefined,
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
  );

export async function getWeekStat(eosService, profile = {}) {
  const [
    { rows: totalReward },
    { rows: totalRating },
    { rows: periodRating },
    { rows: weekRewards },
    userSupplyValues,
  ] = await Promise.all([
    getTotalReward(eosService),
    getTotalRating(eosService),
    getPeriodRating(eosService, profile.user),
    getWeekRewards(eosService, profile.user),
    getUserSupplyValues(eosService),
  ]);

  const normalizedRewards = periodRating.map(x => {
    try {
      const totalRatingForPeriod = totalRating.find(y => y.period === x.period)
        .total_rating_to_reward;

      let totalRewardForPeriod = totalReward.find(y => y.period === x.period);

      if (totalRewardForPeriod) {
        totalRewardForPeriod = convertPeerValueToNumberValue(
          totalRewardForPeriod.total_reward,
        );
      } else {
        const { user_max_supply, user_supply } = userSupplyValues;

        totalRewardForPeriod = createGetRewardPool(
          x.period,
          totalRatingForPeriod,
          convertPeerValueToNumberValue(user_supply),
          convertPeerValueToNumberValue(user_max_supply),
        );
      }
      const hasTaken = Boolean(weekRewards.find(y => y.period === x.period));

      const periodReward =
        (totalRewardForPeriod * x.rating_to_award) / totalRatingForPeriod;

      const reward =
        Number.isNaN(periodReward) || periodReward < 0.000001
          ? 0
          : periodReward;

      return {
        ...x,
        reward,
        hasTaken,
      };
    } catch (err) {
      return {
        ...x,
        reward: 0,
      };
    }
  });

  const numberOfPeriods = Math.ceil(
    (Date.now() / 1000 - +process.env.RELEASE_DATE) /
      +process.env.WEEK_DURATION,
  );

  // Fill by periods with 0 reward - they not stored in blockchain
  return new Array(numberOfPeriods)
    .fill()
    .map((_, index) => {
      const existingPeriod = normalizedRewards.find(y => y.period === index);

      return {
        reward: 0,
        ...(existingPeriod || normalizedRewards[0]),
        period: index,
        periodStarted:
          +process.env.RELEASE_DATE +
          +process.env.WEEK_DURATION * (index + 1) -
          +process.env.WEEK_DURATION,
        periodFinished:
          +process.env.RELEASE_DATE + +process.env.WEEK_DURATION * (index + 1),
      };
    })
    .filter(x => x.periodFinished > profile.registration_time)
    .reverse();
}

export async function sendTokens(
  eosService,
  { from, to, quantity, precision, symbol, contractAccount },
) {
  const data = {
    from,
    to,
    quantity: getNormalizedCurrency(quantity, precision, symbol),
    memo: '',
  };

  const response = await eosService.sendTransaction(
    from,
    SEND_TOKEN_METHOD,
    data,
    contractAccount,
    true,
  );

  return { response, data };
}

export async function pickupReward(eosService, user, periodIndex) {
  const period = periodIndex + 1;
  await eosService.sendTransaction(
    user,
    PICKUP_REWARD_METHOD,
    {
      user,
      period,
    },
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
    true,
  );
}

export async function setBounty(
  user,
  bounty,
  questionId,
  timestamp,
  eosService,
) {
  await eosService.sendTransaction(
    user,
    SET_BOUNTY_METHOD,
    {
      user,
      bounty,
      question_id: questionId,
      timestamp,
    },
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
    true,
  );
}

export async function payBounty(user, questionId, isDeleted, eosService) {
  await eosService.sendTransaction(
    user,
    PAY_BOUNTY_METHOD,
    {
      user,
      question_id: questionId,
      on_delete: +isDeleted,
    },
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
    true,
  );
}

export async function getQuestionBounty(questionId, eosService) {
  const bountyrow = await eosService.getTableRow(
    BOUNTY_TABLE,
    ALL_BOUNTIES_SCOPE,
    questionId,
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
  );
  return bountyrow;
}

export function getNormalizedCurrency(quantity, precision, symbol) {
  if (!Number(quantity)) {
    throw new ApplicationError(`Value has to be number`);
  }

  const num = getFormattedNum3(Number(quantity), precision).replace(/ /gim, '');

  return `${num} ${symbol}`;
}

// TODO: test
export function createGetRewardPool(
  period,
  totalRating,
  userSupply,
  maxUserSupply,
) {
  const inflationRewardPool =
    Number(process.env.START_POOL) *
    Number(process.env.POOL_REDUSE_COEFFICIENT) **
      Math.floor(period / Number(process.env.INFLATION_PERIOD));

  let rewardPool = totalRating * Number(process.env.RATING_TOKEN_COFICIENT);

  if (rewardPool > inflationRewardPool) {
    rewardPool = inflationRewardPool;
  }
  if (maxUserSupply - userSupply < rewardPool) {
    return maxUserSupply - userSupply;
  }

  return rewardPool;
}

// TODO: test
export function convertPeerValueToNumberValue(val) {
  return Number(val.replace(/[a-zA-Z]/gim, '').trim());
}

export async function getGlobalBoostStatistics(eosService) {
  const limit = 100;

  const { rows } = await eosService.getTableRows(
    BOOST_STATISTICS_TABLE,
    BOOST_STATISTICS_SCOPE,
    undefined,
    limit,
    undefined,
    undefined,
    undefined,
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
  );

  return rows;
}

export async function getUserBoostStatistics(eosService, user) {  
  const limit = 100;

  const { rows } = await eosService.getTableRows(
    USER_BOOST_TABLE,
    user,
    undefined,
    limit,
    undefined,
    undefined,
    undefined,
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
  );

  return rows;
}

export async function addBoost(eosService, user, tokens) {
  await eosService.sendTransaction(
    user,
    ADD_BOOST_METHOD,
    {
      user,
      tokens,
    },
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
    true,
  );
}

export const getStakeNum = (stake) => {
  const CURRENCY = ' PEER';

  return +(stake.slice(0, stake.indexOf(CURRENCY)))
}

export const getPredictedBoost = (userStake, maxStake) => {
  let boost = 1;

  if (userStake && maxStake && userStake <= maxStake) {
    boost = userStake / maxStake * (MAX_STAKE_PREDICTION - MIN_STAKE_PREDICTION) + 1;
    boost = Math.floor(boost * 100) / 100;
  } else if (userStake && userStake > 0) {
    boost = MAX_STAKE_PREDICTION;
  }

  return {
    text: `x${boost}`,
    value: boost,
  }
}

export const setWeekDataByKey = (boostStat, key, nextWeekPeriod) => {
  let currentWeekIndex = 0;
  if (boostStat.length > 1) {
    currentWeekIndex = 
      boostStat[boostStat.length - 1].period === nextWeekPeriod ? 
      boostStat.length - 2 : 
      boostStat.length - 1;
  }
  const currentWeekMaxStake = boostStat[currentWeekIndex][key];
  const nextWeekMaxStake = boostStat[boostStat.length - 1][key];

  return [
    getStakeNum(currentWeekMaxStake),
    getStakeNum(nextWeekMaxStake),
  ];
}

export function getBoostWeeks(weekStat, globalBoostStat, userBoostStat) {
  const currentWeek = weekStat ? weekStat[0] : {};
  const nextWeek = currentWeek ? 
    {
      period: currentWeek.period + 1,
      periodStarted: currentWeek.periodFinished,  
      periodFinished: currentWeek.periodFinished + PERIOD_LENGTH[process.env.NODE_ENV],
    } : {};

  if (globalBoostStat && globalBoostStat.length) {
    const [currentWeekMaxStake, nextWeekMaxStake] = setWeekDataByKey(globalBoostStat, 'max_stake', nextWeek.period);

    currentWeek.maxStake = currentWeekMaxStake;
    nextWeek.maxStake = nextWeekMaxStake;
  } else {
    currentWeek.maxStake = 0;
    nextWeek.maxStake = 0;
  }

  if (userBoostStat && userBoostStat.length) {
    const [currentWeekUserStake, nextWeekUserStake] = setWeekDataByKey(userBoostStat, 'staked_tokens', nextWeek.period);

    currentWeek.userStake = currentWeekUserStake;
    nextWeek.userStake = nextWeekUserStake;
  } else {
    currentWeek.userStake = 0;
    nextWeek.userStake = 0;
  }

  return {
    currentWeek: { ...currentWeek },
    nextWeek: { ...nextWeek },
  };
}

export const getRewardAmountByBoost = (
  currentPeriod, 
  amount, 
  globalBoostStat = [], 
  userBoostStat = [],
) => {
  if (!amount || !userBoostStat.length) return amount;

  const filtredUserBoostStat = userBoostStat.filter(item => item.period <= currentPeriod);

  if (!filtredUserBoostStat.length) return amount;

  const currentPeriodUserBoostStat = filtredUserBoostStat[filtredUserBoostStat.length - 1];
  const userStake = getStakeNum(currentPeriodUserBoostStat.staked_tokens);

  if (userStake === 0) return amount;
  
  const currentPeriodGlobalBoostStat = globalBoostStat.find(item => item.period === currentPeriodUserBoostStat.period);
  const maxStake = currentPeriodGlobalBoostStat.max_stake;

  const boost = getPredictedBoost(userStake, maxStake);

  if (boost.value <= 1) return amount;

  return amount * boost.value * 1000;
}
