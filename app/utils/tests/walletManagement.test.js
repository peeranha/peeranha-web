import {
  getBalance,
  getWeekStat,
  getNormalizedCurrency,
  pickupReward,
} from '../walletManagement';

import {
  ACCOUNTS_TABLE,
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

describe('getWeekStat', () => {
  const user = 'user';

  it('test', async () => {
    const totalReward = [
      {
        period: 1,
        total_reward: '10000.000000 PEER',
      },
      {
        period: 2,
        total_reward: '20000.000000 PEER',
      },
    ];

    const totalRating = [
      {
        period: 1,
        total_rating_to_reward: 4005,
      },
      {
        period: 2,
        total_rating_to_reward: 30,
      },
    ];

    const periodRating = [
      {
        period: 1,
        rating: 15,
        rating_to_award: 0,
      },
      {
        period: 2,
        rating: 40,
        rating_to_award: 10,
      },
    ];

    const weekRewards = [
      {
        period: 1,
      },
      {
        period: 2,
      },
    ];

    Promise.all = jest
      .fn()
      .mockImplementation(() => [
        totalReward,
        totalRating,
        periodRating,
        weekRewards,
      ]);

    const res = await getWeekStat(eosService, user);

    expect(res).toMatchSnapshot();
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
