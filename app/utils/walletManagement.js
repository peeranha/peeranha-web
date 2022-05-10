/* eslint camelcase: 0 */
import {
  CURRENT_STAKE_FORM,
  MAX_STAKE_PREDICTION,
  MIN_STAKE_PREDICTION,
} from 'containers/Boost/constants';
import { getFormattedNum3 } from './numbers';

import {
  ALL_BOUNTIES_SCOPE,
  BOOST_MODIFIER_HIGH,
  BOOST_MODIFIER_LOW,
  BOOST_MULTIPLIER,
  BOUNTY_TABLE,
  EDIT_BOUNTY_METHOD,
  INF_LIMIT,
  PAY_BOUNTY_METHOD,
  SEND_TOKEN_METHOD,
  SET_BOUNTY_METHOD,
  TOKEN_AWARDS_SCOPE,
  TOKEN_AWARDS_TABLE,
  WEI_IN_ETH,
} from './constants';

import { ApplicationError } from './errors';
import { getRewardStat } from './theGraph';
import {
  GET_AVAILABLE_BALANCE,
  GET_AVERAGE_STAKE,
  GET_BOOST,
  GET_STAKE,
  GET_USER_STAKE,
} from './ethConstants';

const PERIOD_LENGTH = {
  development: 2 * 60 * 60, // two hours
  test: 2 * 60 * 60, // two hours
  production: 7 * 24 * 60 * 60, // one week
};

/**
 * @balance - string, example - '1000.000000 PEER'
 */
export const getBalance = async (ethereumService, user) => {
  if (user) {
    const balance = await ethereumService.getUserBalance(user);
    return Number(balance.toString() / WEI_IN_ETH);
  }
  return 0;
};

export const getAvailableBalance = async (ethereumService, user) => {
  if (user) {
    const balance = await ethereumService.getUserAvailableBalance(user);
    return Number(balance.toString() / WEI_IN_ETH);
  }
  return 0;
};

/**
 * @reward - string, example - '1000.000000 PEER'
 */

export async function getWeekStat(ethereumService, user) {
  const [rewards, periods] = await getRewardStat(user);
  const inactiveFirstPeriods = [];

  periods.map(period => {
    if (!rewards.find(reward => reward.period.id === period.id)) {
      inactiveFirstPeriods.push({
        period: period.id,
        reward: 0,
        hasTaken: false,
        periodStarted: period.startPeriodTime,
        periodFinished: period.endPeriodTime,
      });
    }
  });

  const activePeriods = rewards
    .map(periodReward => ({
      period: periodReward.period.id,
      reward: periodReward.tokenToReward,
      hasTaken: periodReward.isPaid,
      periodStarted: periodReward.period.startPeriodTime,
      periodFinished: periodReward.period.endPeriodTime,
    }))
    .reverse();
  return inactiveFirstPeriods.concat(activePeriods);
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

export async function pickupReward(ethereumService, user, periodIndex) {
  return await ethereumService.claimUserReward(user, periodIndex);
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

export function getEditBountyTrActData(user, bounty, questionId, timestamp) {
  return {
    action: EDIT_BOUNTY_METHOD,
    data: {
      user,
      bounty,
      question_id: questionId,
      timestamp,
    },
    account: process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
    waitForGettingToBlock: true,
  };
}

export async function editBounty(
  user,
  bounty,
  questionId,
  timestamp,
  eosService,
) {
  const {
    action,
    data,
    account,
    waitForGettingToBlock,
  } = getEditBountyTrActData(user, bounty, questionId, timestamp);

  await eosService.sendTransaction(
    user,
    action,
    data,
    account,
    waitForGettingToBlock,
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
  let inflationRewardPool = Number(process.env.START_POOL) * 1000000;

  for (
    let i = 1;
    i <= Math.floor(period / Number(process.env.INFLATION_PERIOD));
    i++
  ) {
    inflationRewardPool = Math.floor(
      inflationRewardPool * Number(process.env.POOL_REDUSE_COEFFICIENT),
    );
  }

  inflationRewardPool /= 1000000;

  let rewardPool = totalRating * Number(process.env.RATING_TOKEN_COFICIENT);

  if (rewardPool > inflationRewardPool) {
    rewardPool = inflationRewardPool;
  }
  if (maxUserSupply - userSupply < rewardPool) {
    return maxUserSupply - userSupply;
  }

  return Math.round(rewardPool * 1000000) / 1000000;
}

// TODO: test
export function convertPeerValueToNumberValue(val) {
  return Number(val.replace(/[a-zA-Z]/gim, '').trim());
}

export async function getUserBoostStatistics(
  ethereumService,
  user,
  currentPeriod,
) {
  const averageStakeCurrent =
    (await ethereumService.getTokenDataWithArgs(GET_AVERAGE_STAKE, [
      currentPeriod,
    ])) / WEI_IN_ETH;
  const averageStakeNext =
    (await ethereumService.getTokenDataWithArgs(GET_AVERAGE_STAKE, [
      currentPeriod + 1,
    ])) / WEI_IN_ETH;

  const availableBalance =
    (await ethereumService.getTokenDataWithArgs(GET_AVAILABLE_BALANCE, [
      user,
    ])) / WEI_IN_ETH;

  const userStakeCurrent =
    (await ethereumService.getTokenDataWithArgs(GET_USER_STAKE, [
      user,
      currentPeriod,
    ])) / WEI_IN_ETH;
  const userStakeNext =
    (await ethereumService.getTokenDataWithArgs(GET_USER_STAKE, [
      user,
      currentPeriod + 1,
    ])) / WEI_IN_ETH;

  const userBoostCurrent =
    (await ethereumService.getTokenDataWithArgs(GET_BOOST, [
      user,
      currentPeriod,
    ])) / 1000;
  const userBoostNext =
    (await ethereumService.getTokenDataWithArgs(GET_BOOST, [
      user,
      currentPeriod + 1,
    ])) / 1000;

  const totalPeriodStake = await ethereumService.getTokenDataWithArgs(
    GET_STAKE,
    [currentPeriod + 1],
  );

  return {
    averageStakeCurrent,
    averageStakeNext,
    availableBalance,
    userStakeCurrent,
    userStakeNext,
    userBoostCurrent,
    userBoostNext,
    totalPeriodStake,
  };
}

export async function getUserBoost(ethereumService, user, period) {
  return Number(
    (await ethereumService.getTokenDataWithArgs(GET_BOOST, [user, period])) /
      1000,
  );
}

export async function getUserStake(ethereumService, user, period) {
  return Number(
    (await ethereumService.getTokenDataWithArgs(GET_USER_STAKE, [
      user,
      period,
    ])) / WEI_IN_ETH,
  );
}

export async function addBoost(ethereumService, user, tokens) {
  await ethereumService.setStake(user, tokens);
}

export function calculateNewBoost(userBoostStat, newStake) {
  if (!userBoostStat) {
    return [0, null];
  }

  let predictedBoost;
  let newAverageStake;

  const totalStake = Number(
    userBoostStat.totalPeriodStake[0].toString() / WEI_IN_ETH,
  );
  const totalUsers = Number(userBoostStat.totalPeriodStake[1].toString());

  if (userBoostStat.userStakeNext > 0) {
    newAverageStake =
      (totalStake - userBoostStat.userStakeNext + newStake) / totalUsers;
  } else {
    newAverageStake = (totalStake + newStake) / (totalUsers + 1);
  }

  if (newStake <= newAverageStake) {
    predictedBoost =
      (newStake / newAverageStake) * BOOST_MULTIPLIER + BOOST_MODIFIER_LOW;
  } else {
    predictedBoost = newStake / newAverageStake + BOOST_MODIFIER_HIGH;
  }

  return [predictedBoost, newAverageStake];
}

export const getStakeNum = stake => {
  const CURRENCY = ' PEER';

  return +stake.slice(0, stake.indexOf(CURRENCY));
};

export const getPredictedBoost = (userStake, maxStake) => {
  let boost = 1;

  if (userStake && maxStake && userStake <= maxStake) {
    boost =
      (userStake / maxStake) * (MAX_STAKE_PREDICTION - MIN_STAKE_PREDICTION) +
      1;
  } else if (userStake && userStake > 0) {
    boost = MAX_STAKE_PREDICTION;
  }

  return {
    fullText: `x${Math.floor(boost * 1000000) / 1000000}`,
    text: `x${Math.floor(boost * 1000) / 1000}`,
    value: boost,
  };
};

export const setWeekDataByKey = (boostStat, key, nextWeekPeriod) => {
  let currentWeekIndex = -1;
  if (boostStat.length >= 1) {
    currentWeekIndex =
      boostStat[boostStat.length - 1].period === nextWeekPeriod
        ? boostStat.length - 2
        : boostStat.length - 1;
  }
  const currentWeekValue =
    currentWeekIndex < 0 ? null : boostStat[currentWeekIndex][key];
  const nextWeekValue = boostStat[boostStat.length - 1][key];

  return [
    currentWeekValue ? getStakeNum(currentWeekValue) : 0,
    getStakeNum(nextWeekValue),
  ];
};

export const getRewardAmountByBoost = (
  currentPeriod,
  amount,
  globalBoostStat = [],
  userBoostStat = [],
) => {
  if (!amount || !userBoostStat.length) return amount;

  const filtredUserBoostStat = userBoostStat.filter(
    item => item.period < currentPeriod,
  );

  if (!filtredUserBoostStat.length) return amount;

  const currentPeriodUserBoostStat =
    filtredUserBoostStat[filtredUserBoostStat.length - 1];
  const userStake = getStakeNum(currentPeriodUserBoostStat.staked_tokens);

  if (userStake === 0) return amount;

  const currentPeriodGlobalBoostStat = globalBoostStat.find(
    item => item.period === currentPeriodUserBoostStat.period,
  );
  const maxStake = getStakeNum(currentPeriodGlobalBoostStat.max_stake);

  const boost = getPredictedBoost(userStake, maxStake);

  if (boost.value <= 1) return amount;

  return amount * boost.value;
};

const getTokenAwards = eosService =>
  eosService.getTableRows(
    TOKEN_AWARDS_TABLE,
    TOKEN_AWARDS_SCOPE,
    0,
    INF_LIMIT,
    undefined,
    undefined,
    undefined,
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
  );
