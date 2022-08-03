import {
  getBalance,
  getWeekStat,
  sendTokens,
  getNormalizedCurrency,
  pickupReward,
} from '../walletManagement';

import {
  ACCOUNTS_TABLE,
  SEND_TOKEN_METHOD,
  APP_CURRENCY,
  PICKUP_REWARD_METHOD,
} from '../constants';

const eosService = {
  getTableRow: jest.fn(),
  getTableRows: jest.fn(),
  sendTransaction: jest.fn(),
};

describe('pickupReward', () => {
  it('test', async () => {
    const user = 'user';
    const period = 1;

    await pickupReward(eosService, user, period);

    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      PICKUP_REWARD_METHOD,
      {
        user,
        period,
      },
      process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
    );
  });
});

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
