/* eslint camelcase: 0 */
import {
  MAX_STAKE_PREDICTION,
  MIN_STAKE_PREDICTION,
} from 'containers/Boost/constants';
import { getFormattedNum3 } from './numbers';

import {
  BOOST_MODIFIER_HIGH,
  BOOST_MODIFIER_LOW,
  BOOST_MULTIPLIER,
  WEI_IN_ETH,
} from './constants';

import { ApplicationError } from './errors';
import { getRewardStat } from './theGraph';
import {
  CLAIM_REWARD,
  CONTRACT_TOKEN,
  GET_AVAILABLE_BALANCE,
  GET_AVERAGE_STAKE,
  GET_BOOST,
  GET_STAKE,
  GET_USER_BALANCE,
  GET_USER_STAKE,
  SET_STAKE,
} from './ethConstants';

export const getBalance = async (ethereumService, user) => {
  if (user) {
    const balance = await ethereumService.getTokenDataWithArgs(
      GET_USER_BALANCE,
      [user],
    );
    return Number(balance.toString() / WEI_IN_ETH);
  }
  return 0;
};

export const getAvailableBalance = async (ethereumService, user) => {
  if (user) {
    const balance = await ethereumService.getTokenDataWithArgs(
      GET_AVAILABLE_BALANCE,
      [user],
    );
    return Number(balance.toString() / WEI_IN_ETH);
  }
  return 0;
};

export async function getWeekStat(ethereumService, userId) {
  const [rewards, periods, user] = await getRewardStat(userId, ethereumService);
  const inactiveFirstPeriods = [];

  periods.forEach(period => {
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

  const activePeriods = rewards.map(periodReward => ({
    period: periodReward.period.id,
    reward: periodReward.tokenToReward,
    hasTaken: periodReward.isPaid,
    periodStarted: periodReward.period.startPeriodTime,
    periodFinished: periodReward.period.endPeriodTime,
  }));

  const weekStat = inactiveFirstPeriods
    .concat(activePeriods)
    .sort((first, second) => second.periodStarted - first.periodStarted);

  if (user?.creationTime) {
    return weekStat.filter(
      period => Number(user.creationTime) < Number(period.periodFinished),
    );
  }
  return weekStat;
}

export async function sendTokens(
  eosService,
  { from, to, quantity, precision, symbol, contractAccount },
) {}

export async function pickupReward(ethereumService, user, periodIndex) {
  return await ethereumService.sendTransaction(
    CONTRACT_TOKEN,
    user,
    CLAIM_REWARD,
    [periodIndex],
  );
}

export async function payBounty(user, questionId, isDeleted, eosService) {}

export async function getQuestionBounty(questionId, eosService) {}

export function getNormalizedCurrency(quantity, precision, symbol) {
  if (!Number(quantity)) {
    throw new ApplicationError(`Value has to be number`);
  }

  const num = getFormattedNum3(Number(quantity), precision).replace(/ /gim, '');

  return `${num} ${symbol}`;
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
  return await ethereumService.sendTransaction(
    CONTRACT_TOKEN,
    user,
    SET_STAKE,
    [user, tokens],
  );
}

export function calculateNewBoost(userBoostStat, newStake) {
  if (!userBoostStat || !newStake) {
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
