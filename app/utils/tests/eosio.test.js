/**
 * Tests EOSIO
 */

import Eosjs from 'eosjs';
import ScatterJS from 'scatter-js/dist/scatter.cjs';
import EosioService from '../eosio';
import {
  EOS_IS_NOT_INIT,
  SCATTER_IN_NOT_INSTALLED,
  DEFAULT_EOS_PERMISSION,
  BLOCKCHAIN_NAME,
} from '../constants';

jest.mock('eosjs');
jest.mock('scatter-js/dist/scatter.cjs', () => ({
  scatter: {
    connect: jest.fn().mockImplementation(res => res),
  },
}));

const inst = {
  transaction: jest.fn(),
  getTableRows: jest.fn(),
};

Eosjs.mockImplementation(() => inst);

describe('constructor', async () => {
  const eos = new EosioService();
  await eos.constructor();

  it('test', () => {
    expect(eos.initialized).toBe(false);
    expect(eos.eosInstance).toBe(null);
    expect(eos.scatterInstance).toBe(null);
    expect(eos.scatterInstalled).toBe(null);
  });
});

describe('init', () => {
  it('@connected === false', async () => {
    const eos = new EosioService();

    eos.initScatter = jest.fn();
    eos.initEosioWithScatter = jest.fn();
    eos.initEosioWithoutScatter = jest.fn();
    eos.scatterInstalled = true;

    expect(eos.initScatter).toHaveBeenCalledTimes(0);
    expect(eos.initEosioWithScatter).toHaveBeenCalledTimes(0);
    expect(eos.initEosioWithoutScatter).toHaveBeenCalledTimes(0);

    await eos.init();

    expect(eos.initialized).toBe(true);
    expect(eos.initScatter).toHaveBeenCalledTimes(1);
    expect(eos.initEosioWithScatter).toHaveBeenCalledTimes(1);
    expect(eos.initEosioWithoutScatter).toHaveBeenCalledTimes(0);
  });

  it('@connected === true', async () => {
    const eos = new EosioService();

    eos.initScatter = jest.fn();
    eos.initEosioWithScatter = jest.fn();
    eos.initEosioWithoutScatter = jest.fn();
    eos.scatterInstalled = false;

    expect(eos.initScatter).toHaveBeenCalledTimes(0);
    expect(eos.initEosioWithScatter).toHaveBeenCalledTimes(0);
    expect(eos.initEosioWithoutScatter).toHaveBeenCalledTimes(0);

    await eos.init();

    expect(eos.initialized).toBe(true);
    expect(eos.initScatter).toHaveBeenCalledTimes(1);
    expect(eos.initEosioWithScatter).toHaveBeenCalledTimes(0);
    expect(eos.initEosioWithoutScatter).toHaveBeenCalledTimes(1);
  });
});

describe('initScatter', () => {
  const eos = new EosioService();

  it('@scatterInstalled is true', async () => {
    ScatterJS.scatter.connect.mockImplementation(() => true);

    await eos.initScatter();
    expect(eos.scatterInstalled).toBe(true);
    expect(window.scatter).toBe(null);
    expect(eos.scatterInstance).toEqual(ScatterJS.scatter);
  });

  it('@scatterInstalled is false', async () => {
    ScatterJS.scatter.connect.mockImplementation(() => false);

    await eos.initScatter();
    expect(eos.scatterInstalled).toBe(false);
    expect(eos.scatterInstance).toBe(null);
  });
});

describe('initEosioWithoutScatter', () => {
  const eos = new EosioService();
  const config = 'config';

  eos.getEosioConfig = jest.fn().mockImplementationOnce(() => config);
  Eosjs.mockImplementationOnce(res => res);

  it('eosInstance === config', async () => {
    expect(eos.getEosioConfig).toHaveBeenCalledTimes(0);

    await eos.initEosioWithoutScatter();

    expect(eos.eosInstance).toBe(config);
    expect(eos.getEosioConfig).toHaveBeenCalledTimes(1);
    expect(Eosjs).toHaveBeenCalledWith(config);
  });
});

describe('initEosioWithScatter', () => {
  const eos = new EosioService();
  const eosInstance = 'eosInstance';
  const scatterConfig = 'scatterConfig';

  eos.getScatterConfig = jest.fn().mockImplementationOnce(() => scatterConfig);
  eos.scatterInstance = {
    eos: jest.fn().mockImplementation(() => eosInstance),
  };

  it('test', async () => {
    expect(eos.getScatterConfig).toHaveBeenCalledTimes(0);
    expect(eos.scatterInstance.eos).toHaveBeenCalledTimes(0);

    await eos.initEosioWithScatter();
    expect(eos.eosInstance).toBe(eosInstance);
    expect(eos.getScatterConfig).toHaveBeenCalledTimes(1);
    expect(eos.scatterInstance.eos).toHaveBeenCalledTimes(1);
    expect(eos.scatterInstance.eos).toHaveBeenCalledWith(
      scatterConfig,
      Eosjs,
      {},
    );
  });
});

describe('getSelectedAccount', () => {
  const eos = new EosioService();

  it('@initialized is false', async () => {
    eos.initialized = false;

    try {
      await eos.getSelectedAccount();
    } catch (error) {
      expect(error.message).toBe(EOS_IS_NOT_INIT);
    }
  });

  it('@scatterInstalled is false', async () => {
    eos.initialized = true;
    eos.scatterInstalled = false;

    try {
      await eos.getSelectedAccount();
    } catch (error) {
      expect(error.message).toBe(SCATTER_IN_NOT_INSTALLED);
    }
  });

  it('@scatterInstance.identity is falsy', async () => {
    eos.initialized = true;
    eos.scatterInstalled = true;
    eos.scatterInstance = { identity: null };

    expect(await eos.getSelectedAccount()).toBe(null);
  });

  describe('got @scatterInstance.identity', () => {
    const accountName = 'accountName';

    eos.initialized = true;
    eos.scatterInstalled = true;

    it('account is true', async () => {
      eos.scatterInstance = {
        identity: {
          accounts: {
            find: jest.fn().mockImplementation(() => ({
              name: accountName,
            })),
          },
        },
      };

      const { find } = eos.scatterInstance.identity.accounts;

      expect(find).toHaveBeenCalledTimes(0);
      expect(await eos.getSelectedAccount()).toBe(accountName);
      expect(find).toHaveBeenCalledTimes(1);

      eos.scatterInstance.identity.accounts.find.mockRestore();
    });

    it('account is false', async () => {
      eos.scatterInstance = {
        identity: {
          accounts: {
            find: jest.fn().mockImplementation(() => null),
          },
        },
      };

      const { find } = eos.scatterInstance.identity.accounts;

      expect(find).toHaveBeenCalledTimes(0);
      expect(await eos.getSelectedAccount()).toBe(null);
      expect(find).toHaveBeenCalledTimes(1);

      eos.scatterInstance.identity.accounts.find.mockRestore();
    });
  });
});

describe('forgetIdentity', () => {
  const eos = new EosioService();

  it('scatterInstance.identity is true', async () => {
    eos.scatterInstance = {
      identity: {},
      forgetIdentity: jest.fn(),
    };

    expect(eos.scatterInstance.forgetIdentity).toHaveBeenCalledTimes(0);

    const value = await eos.forgetIdentity();
    expect(value).not.toBe(null);
    expect(eos.scatterInstance.forgetIdentity).toHaveBeenCalledTimes(1);
  });

  it('scatterInstance.identity is false', async () => {
    eos.scatterInstance.identity = null;

    const value = await eos.forgetIdentity();
    expect(value).toBe(null);
  });
});

describe('selectAccount', () => {
  const eos = new EosioService();

  it('@initialized is false', async () => {
    eos.initialized = false;

    try {
      await eos.getSelectedAccount();
    } catch (error) {
      expect(error.message).toBe(EOS_IS_NOT_INIT);
    }
  });

  it('@scatterInstalled is false', async () => {
    eos.initialized = true;
    eos.scatterInstalled = false;

    try {
      await eos.getSelectedAccount();
    } catch (error) {
      expect(error.message).toBe(SCATTER_IN_NOT_INSTALLED);
    }
  });

  it('@scatterInstance.getIdentity is falsy', async () => {
    eos.getScatterConfig = jest.fn().mockImplementation(() => ({}));

    eos.initialized = true;
    eos.scatterInstalled = true;
    eos.scatterInstance = {
      getIdentity: jest.fn().mockImplementation(() => {
        throw new Error('err');
      }),
    };

    expect(await eos.selectAccount()).toBe(null);
  });

  describe('got @scatterInstance.getIdentity', () => {
    const accountName = 'accountName';

    eos.initialized = true;
    eos.scatterInstalled = true;

    it('account is true', async () => {
      eos.scatterInstance = {
        getIdentity: jest.fn().mockImplementation(() => ({
          accounts: {
            find: jest.fn().mockImplementation(() => ({
              name: accountName,
            })),
          },
        })),
      };

      const { getIdentity } = eos.scatterInstance;

      expect(getIdentity).toHaveBeenCalledTimes(0);
      expect(await eos.selectAccount()).toBe(accountName);
      expect(getIdentity).toHaveBeenCalledTimes(1);

      eos.scatterInstance.getIdentity.mockRestore();
    });

    it('account is false', async () => {
      eos.scatterInstance = {
        getIdentity: jest.fn().mockImplementation(() => ({
          accounts: {
            find: jest.fn().mockImplementation(() => null),
          },
        })),
      };

      const { getIdentity } = eos.scatterInstance;

      expect(getIdentity).toHaveBeenCalledTimes(0);
      expect(await eos.selectAccount()).toBe(null);
      expect(getIdentity).toHaveBeenCalledTimes(1);

      eos.scatterInstance.getIdentity.mockRestore();
    });
  });
});

describe('sendTransaction', () => {
  const eos = new EosioService();

  it('@initialized is false', async () => {
    eos.initialized = false;

    try {
      await eos.getSelectedAccount();
    } catch (error) {
      expect(error.message).toBe(EOS_IS_NOT_INIT);
    }
  });

  it('sendTransaction test', () => {
    const mockedValue = 'mockedValue';
    const actor = 'actor';
    const action = 'action';
    const data = {};

    eos.initialized = true;
    eos.eosInstance = {
      transaction: jest.fn().mockImplementation(() => mockedValue),
    };

    expect(eos.sendTransaction(actor, action, data)).toBe(mockedValue);
    expect(eos.eosInstance.transaction).toHaveBeenCalledWith({
      actions: [
        {
          account: process.env.EOS_CONTRACT_ACCOUNT,
          name: action,
          authorization: [
            {
              actor,
              permission: DEFAULT_EOS_PERMISSION,
            },
          ],
          data: {
            ...data,
          },
        },
      ],
    });
  });
});

describe('getTableRow', () => {
  const eos = new EosioService();

  it('@initialized is false', async () => {
    eos.initialized = false;

    try {
      await eos.getSelectedAccount();
    } catch (error) {
      expect(error.message).toBe(EOS_IS_NOT_INIT);
    }
  });

  describe('test', () => {
    const table = 'table';
    const scope = 'scope';
    const primaryKey = 'primaryKey';
    const obj = { id: '1' };
    const response = {
      rows: [obj],
    };
    const request = {
      json: true,
      code: process.env.EOS_CONTRACT_ACCOUNT,
      scope,
      table,
      lower_bound: primaryKey,
      limit: 1,
    };

    it('response is true', async () => {
      eos.initialized = true;
      eos.eosInstance = {
        getTableRows: jest.fn().mockImplementation(() => response),
      };
      expect(eos.eosInstance.getTableRows).toHaveBeenCalledTimes(0);

      const value = await eos.getTableRow(table, scope, primaryKey);
      expect(eos.eosInstance.getTableRows).toHaveBeenCalledTimes(1);
      expect(eos.eosInstance.getTableRows).toHaveBeenCalledWith(request);
      expect(value).toEqual(obj);
    });

    it('response is false', async () => {
      eos.initialized = true;
      eos.eosInstance = {
        getTableRows: jest.fn().mockImplementation(() => null),
      };

      const value = await eos.getTableRow(table, scope, primaryKey);
      expect(value).toBe(null);
    });
  });
});

describe('getTableRows', () => {
  const eos = new EosioService();

  it('@initialized is false', async () => {
    eos.initialized = false;

    try {
      await eos.getSelectedAccount();
    } catch (error) {
      expect(error.message).toBe(EOS_IS_NOT_INIT);
    }
  });

  describe('test', () => {
    const table = 'table';
    const scope = 'scope';
    const obj = { id: '1' };
    const response = {
      rows: [obj],
    };
    const request = {
      json: true,
      code: process.env.EOS_CONTRACT_ACCOUNT,
      scope,
      table,
    };

    it('response is true', async () => {
      eos.initialized = true;
      eos.eosInstance = {
        getTableRows: jest.fn().mockImplementation(() => response),
      };
      expect(eos.eosInstance.getTableRows).toHaveBeenCalledTimes(0);

      const value = await eos.getTableRows(table, scope);
      expect(eos.eosInstance.getTableRows).toHaveBeenCalledTimes(1);
      expect(eos.eosInstance.getTableRows).toHaveBeenCalledWith(request);
      expect(value).toEqual(response.rows);
    });

    it('response is false', async () => {
      eos.initialized = true;
      eos.eosInstance = {
        getTableRows: jest.fn().mockImplementation(() => null),
      };

      const value = await eos.getTableRows(table, scope);
      expect(value).toEqual([]);
    });
  });
});

describe('getEosioConfig', () => {
  it('test', () => {
    const eos = new EosioService();
    const value = eos.getEosioConfig();

    expect(value).toEqual({
      httpEndpoint: process.env.EOS_DEFAULT_HTTP_ENDPOINT,
      chainId: process.env.EOS_CHAIN_ID,
      broadcast: true,
      sign: true,
    });
  });
});

describe('getScatterConfig', () => {
  it('test', () => {
    const eos = new EosioService();
    const value = eos.getScatterConfig();

    expect(value).toEqual({
      blockchain: BLOCKCHAIN_NAME,
      protocol: process.env.EOS_SCATTER_PROTOCOL,
      host: process.env.EOS_SCATTER_HOST,
      port: process.env.EOS_SCATTER_PORT,
      chainId: process.env.EOS_CHAIN_ID,
    });
  });
});
