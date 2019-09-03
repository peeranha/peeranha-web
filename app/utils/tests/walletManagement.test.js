import {
  getBalance,
  getWeekStat,
  sendTokens,
  getNormalizedCurrency,
} from '../walletManagement';

import {
  ACCOUNTS_TABLE,
  PERIOD_REWARD_TABLE,
  SEND_TOKEN_METHOD,
  APP_CURRENCY,
} from '../constants';

const eosService = {
  getTableRow: jest.fn(),
  getTableRows: jest.fn(),
  sendTransaction: jest.fn(),
};

describe('getBalance', () => {
  const user = 'user';

  it('test', async () => {
    const balance = '1000 PEER';

    eosService.getTableRow.mockImplementation(() => ({
      balance,
    }));

    const res = await getBalance(eosService, user);

    expect(eosService.getTableRow).toHaveBeenCalledWith(
      ACCOUNTS_TABLE,
      user,
      undefined,
      process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
    );

    expect(res).toBe('1000');
  });
});

describe('getWeekStat', () => {
  const user = 'user';

  it('test', async () => {
    const weekStat = [
      {
        period: 1,
        reward: '1000 PEER',
      },
      {
        period: 2,
        reward: '1400 PEER',
      },
    ];

    eosService.getTableRows.mockImplementation(() => weekStat);

    const res = await getWeekStat(eosService, user);

    expect(eosService.getTableRows).toHaveBeenCalledWith(
      PERIOD_REWARD_TABLE,
      user,
      0,
      undefined,
      undefined,
      undefined,
      undefined,
      process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
    );

    expect(res).toEqual([
      {
        period: 2,
        reward: '1400',
      },
      {
        period: 1,
        reward: '1000',
      },
    ]);
  });
});

describe('sendTokens', () => {
  const info = {
    from: 'from',
    to: 'to',
    quantity: '1000',
  };

  it('test', async () => {
    await sendTokens(eosService, info);

    expect(eosService.sendTransaction).toHaveBeenCalledWith(
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
  });
});

describe('getNormalizedCurrency', () => {
  it('@value is NUMBER', () => {
    const value = '1000';
    const normalizedCurrency = getNormalizedCurrency(value);

    expect(normalizedCurrency).toBe(`1000.000000 ${APP_CURRENCY}`);
  });

  it('@value IS NOT NUMBER', () => {
    try {
      const value = '10ssssss00';
      getNormalizedCurrency(value);
    } catch (err) {
      expect(err.message).toBe('Value has to be number');
    }
  });
});
