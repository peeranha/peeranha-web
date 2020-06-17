/* eslint camelcase: 0 */
import { getFormattedNum3 } from './numbers';

import {
  ACCOUNTS_TABLE,
  ALL_PERIODS_SCOPE,
  INF_LIMIT,
  PERIOD_RATING_TABLE,
  PERIOD_REWARD_TABLE,
  PICKUP_REWARD_METHOD,
  SEND_TOKEN_METHOD,
  TOTAL_RATING_TABLE,
  TOTAL_REWARD_TABLE,
  USER_SUPPLY_SCOPE,
  USER_SUPPLY_TABLE,
} from './constants';

import { ApplicationError } from './errors';

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

export async function getWeekStat(eosService, profile) {
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
  const result = new Array(numberOfPeriods)
    .fill()
    .map((_, index) => {
      const existingPeriod = normalizedRewards.find(
        y => y.period === index + 1,
      );

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

  // registration week
  const last = result[result.length - 1];
  result.push({
    reward: 0,
    period: last.period - 1,
    rating: 0,
    rating_to_award: 0,
    hasTaken: true,
    periodStarted: last.periodStarted - +process.env.WEEK_DURATION,
    periodFinished: last.periodStarted,
  });

  return result;
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
