import { getFormattedNum3 } from './numbers';

import {
  ACCOUNTS_TABLE,
  PERIOD_REWARD_TABLE,
  SEND_TOKEN_METHOD,
  APP_CURRENCY,
} from './constants';

/**
 * @balance - string, example - '1000.000000 PEER'
 */

export async function getBalance(eosService, user) {
  const { balance } = await eosService.getTableRow(
    ACCOUNTS_TABLE,
    user,
    undefined,
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
  );

  // remove all chars besides of number
  return balance.replace(/[a-zA-Z]/gim, '').trim();
}

/**
 * @reward - string, example - '1000.000000 PEER'
 */

export async function getWeekStat(eosService, user) {
  const weekStat = await eosService.getTableRows(
    PERIOD_REWARD_TABLE,
    user,
    0,
    undefined,
    undefined,
    undefined,
    undefined,
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
  );

  // remove all chars besides of numeral
  const normalizedWeekStat = weekStat.map(iterableWeek => ({
    ...iterableWeek,
    reward: iterableWeek.reward.replace(/[a-zA-Z]/gim, '').trim(),
  }));

  return normalizedWeekStat.reverse();
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

export function getNormalizedCurrency(value) {
  if (!Number(value)) {
    throw new Error(`Value has to be number`);
  }

  const num = getFormattedNum3(Number(value)).replace(/ /gim, '');

  return `${num} ${APP_CURRENCY}`;
}
