/* eslint camelcase: 0 */
import { getFormattedNum3 } from './numbers';

import {
  ACCOUNTS_TABLE,
  PERIOD_REWARD_TABLE,
  PERIOD_RATING_TABLE,
  SEND_TOKEN_METHOD,
  PICKUP_REWARD_METHOD,
  APP_CURRENCY,
  TOTAL_REWARD_TABLE,
  TOTAL_RATING_TABLE,
  ALL_PERIODS_SCOPE,
  INF_LIMIT,
  USER_SUPPLY_TABLE,
  USER_SUPPLY_SCOPE,
} from './constants';

import { ApplicationError } from './errors';

/**
 * @balance - string, example - '1000.000000 PEER'
 */

export async function getBalance(eosService, user) {
  const val = await eosService.getTableRow(
    ACCOUNTS_TABLE,
    user,
    undefined,
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
  );

  // remove all chars besides of number
  return val ? convertPeerValueToNumberValue(val.balance) : 0;
}

/**
 * @reward - string, example - '1000.000000 PEER'
 */

export async function getWeekStat(eosService, profile) {
  function getUserSupplyValues() {
    return eosService.getTableRow(
      USER_SUPPLY_TABLE,
      USER_SUPPLY_SCOPE,
      undefined,
      process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
    );
  }

  function getTotalReward() {
    return eosService.getTableRows(
      TOTAL_REWARD_TABLE,
      ALL_PERIODS_SCOPE,
      0,
      INF_LIMIT,
      undefined,
      undefined,
      undefined,
      process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
    );
  }

  function getTotalRating() {
    return eosService.getTableRows(
      TOTAL_RATING_TABLE,
      ALL_PERIODS_SCOPE,
      0,
      INF_LIMIT,
      undefined,
      undefined,
      undefined,
      process.env.EOS_CONTRACT_ACCOUNT,
    );
  }

  function getPeriodRating() {
    return eosService.getTableRows(
      PERIOD_RATING_TABLE,
      profile.user,
      0,
      INF_LIMIT,
      undefined,
      undefined,
      undefined,
      process.env.EOS_CONTRACT_ACCOUNT,
    );
  }

  function getWeekRewards() {
    return eosService.getTableRows(
      PERIOD_REWARD_TABLE,
      profile.user,
      0,
      INF_LIMIT,
      undefined,
      undefined,
      undefined,
      process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
    );
  }

  const [
    { rows: totalReward },
    { rows: totalRating },
    { rows: periodRating },
    { rows: weekRewards },
    userSupplyValues,
  ] = await Promise.all([
    getTotalReward(),
    getTotalRating(),
    getPeriodRating(),
    getWeekRewards(),
    getUserSupplyValues(),
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

      return {
        ...x,
        reward: periodReward,
        hasTaken,
      };
    } catch (err) {
      return {
        ...x,
        reward: 0,
      };
    }
  });

  const numberOfPeriods =
    Math.ceil(
      (Date.now() / 1000 - +process.env.RELEASE_DATE) /
        +process.env.WEEK_DURATION,
    ) - 1;

  // Fill by periods with 0 reward - they not stored in blockchain
  return new Array(numberOfPeriods)
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
}

export async function sendTokens(eosService, info) {
  await eosService.sendTransaction(
    info.from,
    SEND_TOKEN_METHOD,
    {
      from: info.from,
      to: info.to,
      quantity: getNormalizedCurrency(info.quantity),
      memo: '',
    },
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
    true,
  );
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

export function getNormalizedCurrency(value) {
  if (!Number(value)) {
    throw new ApplicationError(`Value has to be number`);
  }

  const num = getFormattedNum3(Number(value)).replace(/ /gim, '');

  return `${num} ${APP_CURRENCY}`;
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
