import {
  getBalance,
  getNormalizedCurrency,
  pickupReward,
} from '../walletManagement';

import {
  ACCOUNTS_TABLE,
  APP_CURRENCY,
  PICKUP_REWARD_METHOD,
} from '../constants';

const ethereumService = {
  getTableRow: jest.fn(),
  getTableRows: jest.fn(),
  sendTransaction: jest.fn(),
};

describe('getBalance', () => {
  const user = 'user';

  it('test', async () => {
    const balance = '1000 PEER';

    ethereumService.getTableRow.mockImplementation(() => ({
      balance,
    }));

    const res = await getBalance(ethereumService, user);

    expect(res).toBe('1000');
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
