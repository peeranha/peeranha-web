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
} from './constants';

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
  return val ? val.balance.replace(/[a-zA-Z]/gim, '').trim() : 0;
}

/**
 * @reward - string, example - '1000.000000 PEER'
 */

export async function getWeekStat(eosService, user) {
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
      user,
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
      user,
      0,
      INF_LIMIT,
      undefined,
      undefined,
      undefined,
      process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
    );
  }

  const [
    totalReward,
    totalRating,
    periodRating,
    weekRewards,
  ] = await Promise.all([
    getTotalReward(),
    getTotalRating(),
    getPeriodRating(),
    getWeekRewards(),
  ]);

  const normalizedRewards = periodRating.map(x => {
    try {
      const totalRewardForPeriod = Number(
        totalReward
          .find(y => y.period === x.period)
          .total_reward.replace(/[a-zA-Z]/gim, '')
          .trim(),
      );

      const totalRatingForPeriod = totalRating.find(y => y.period === x.period)
        .total_rating_to_reward;

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

  return normalizedRewards.reverse();
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
  );
}

export async function pickupReward(eosService, user, period) {
  await eosService.sendTransaction(
    user,
    PICKUP_REWARD_METHOD,
    {
      user,
      period,
    },
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
  );
}

export function getNormalizedCurrency(value) {
  if (!Number(value)) {
    throw new Error(`Value has to be number`);
  }

  const num = getFormattedNum3(Number(value)).replace(/ /gim, '');

  return `${num} ${APP_CURRENCY}`;
}
