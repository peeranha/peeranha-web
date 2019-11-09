/**
 * Tests EOSIO
 */

import Eosjs from 'eosjs';
import ecc from 'eosjs-ecc';
import ScatterJS from 'scatterjs-core';

import EosioService from '../eosio';

import {
  EOS_IS_NOT_INIT,
  SCATTER_IN_NOT_INSTALLED,
  DEFAULT_EOS_PERMISSION,
  BLOCKCHAIN_NAME,
  BEST_NODE_SERVICE,
  LOCAL_STORAGE_BESTNODE,
} from '../constants';

const localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

const fetch = jest.fn().mockImplementation(async () => null);

Object.defineProperty(global, 'localStorage', { value: localStorage });
Object.defineProperty(global, 'fetch', { value: fetch });

jest.mock('eosjs');

jest.mock('eosjs-ecc', () => ({
  privateToPublic: jest.fn(),
}));

jest.mock('scatterjs-plugin-eosjs', () => class ScatterEOS {});

jest.mock('scatterjs-core', () => ({
  plugins: jest.fn(),
  scatter: {
    connect: jest.fn(),
    eos: jest.fn(),
  },
}));

const inst = {
  transaction: jest.fn(),
  getTableRows: jest.fn(),
};

Eosjs.mockImplementation(() => inst);

beforeEach(() => {
  inst.transaction.mockClear();
  inst.getTableRows.mockClear();
  ecc.privateToPublic.mockClear();
  ScatterJS.plugins.mockClear();
  ScatterJS.scatter.connect.mockClear();
  ScatterJS.scatter.eos.mockClear();
  Eosjs.mockClear();
  localStorage.getItem.mockClear();
  localStorage.setItem.mockClear();
});

const node = {
  protocol: 'protocol',
  host: 'host',
  port: 'port',
  endpoint: 'endpoint',
  chainId: 'chainId',
};

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
  describe('initialization with scatter', () => {
    localStorage.getItem.mockImplementation(() =>
      JSON.stringify({ loginWithScatter: true }),
    );

    it('scatter is installed', async () => {
      const service = new EosioService();
      service.getNode = () => node;

      ScatterJS.scatter = {
        eos: jest.fn(),
        connect: jest.fn().mockImplementation(() => true),
      };

      expect(ScatterJS.plugins).toHaveBeenCalledTimes(0);
      expect(Boolean(service.initialized)).toBe(false);

      await service.init();

      expect(ScatterJS.plugins).toHaveBeenCalledTimes(1);
      expect(service.scatterInstance.eos).toHaveBeenCalledTimes(1);
      expect(Boolean(service.initialized)).toBe(true);
    });

    it('scatter is NOT installed', async () => {
      const service = new EosioService();
      service.getNode = () => node;

      service.scatterInstalled = false;
      ScatterJS.scatter = {
        eos: jest.fn(),
        connect: jest.fn().mockImplementation(() => false),
      };

      expect(ScatterJS.plugins).toHaveBeenCalledTimes(0);
      expect(Eosjs).toHaveBeenCalledTimes(0);
      expect(Boolean(service.initialized)).toBe(false);

      await service.init();

      expect(ScatterJS.plugins).toHaveBeenCalledTimes(1);
      expect(Eosjs).toHaveBeenCalledTimes(1);
      expect(Boolean(service.initialized)).toBe(true);
    });
  });

  it('initialization without scatter', async () => {
    const service = new EosioService();

    const privateKey = 'privateKey2';
    const username = 'user1';
    const authToken = 'authToken';
    const email = 'email';

    service.getNode = () => node;
    service.compareSavedAndBestNodes = jest.fn();

    localStorage.getItem.mockImplementation(() =>
      JSON.stringify({ email, authToken }),
    );

    expect(Eosjs).toHaveBeenCalledTimes(0);
    expect(service.compareSavedAndBestNodes).toHaveBeenCalledTimes(0);
    expect(Boolean(service.selectedAccount)).toBe(false);
    expect(Boolean(service.initialized)).toBe(false);
    expect(service.node).toBe(null);

    await service.init(privateKey, false, username);

    expect(Eosjs).toHaveBeenCalledTimes(1);
    expect(service.compareSavedAndBestNodes).toHaveBeenCalledTimes(1);
    expect(service.selectedAccount).toBe(username);
    expect(Boolean(service.initialized)).toBe(true);
    expect(service.node).toEqual(node);
  });
});

describe('initScatter', () => {
  const eos = new EosioService();

  it('@scatterInstalled is true', async () => {
    ScatterJS.scatter.connect.mockImplementation(() => true);

    expect(ScatterJS.plugins).toHaveBeenCalledTimes(0);

    await eos.initScatter();

    expect(ScatterJS.plugins).toHaveBeenCalledTimes(1);
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
  const service = new EosioService();
  service.node = node;

  const key = 'key';
  const eosInstance = 'eosInstance';

  it('test', () => {
    Eosjs.mockImplementation(() => eosInstance);

    expect(Eosjs).toHaveBeenCalledTimes(0);
    expect(Boolean(service.eosInstance)).toBe(false);

    service.initEosioWithoutScatter(key);

    expect(Eosjs).toHaveBeenCalledTimes(1);
    expect(Eosjs).toHaveBeenCalledWith(service.getEosioConfig(key));
    expect(service.eosInstance).toBe(eosInstance);
  });
});

describe('initEosioWithScatter', () => {
  const eos = new EosioService();
  const eosInstance = 'eosInstance';
  const scatterConfig = 'scatterConfig';

  eos.getScatterConfig = jest.fn().mockImplementation(() => scatterConfig);
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
  describe('login without scatter', () => {
    const eos = new EosioService();
    const selectedAccount = 'selectedAccount';
    const email = 'email';
    const authToken = 'authToken';

    it('test', async () => {
      localStorage.getItem.mockImplementation(() =>
        JSON.stringify({ authToken, email }),
      );

      eos.selectedAccount = selectedAccount;

      const res = await eos.getSelectedAccount();
      expect(res).toBe(selectedAccount);
    });
  });

  describe('login with scatter', () => {
    const eos = new EosioService();

    localStorage.getItem.mockImplementation(() =>
      JSON.stringify({ loginWithScatter: true }),
    );

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

      localStorage.getItem.mockImplementation(() =>
        JSON.stringify({ loginWithScatter: true }),
      );

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

      localStorage.getItem.mockImplementation(() =>
        JSON.stringify({ loginWithScatter: true }),
      );

      expect(await eos.getSelectedAccount()).toBe(null);
    });

    describe('got @scatterInstance.identity', () => {
      const accountName = 'accountName';

      eos.initialized = true;
      eos.scatterInstalled = true;

      it('account is true', async () => {
        localStorage.getItem.mockImplementation(() =>
          JSON.stringify({ loginWithScatter: true }),
        );

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
        localStorage.getItem.mockImplementation(() =>
          JSON.stringify({ loginWithScatter: true }),
        );

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
      upper_bound: primaryKey,
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
    const lowerBound = 'lowerBound';
    const upperBound = 'upperBound';
    const limit = 'limit';
    const indexPosition = 'indexPosition';
    const keyType = 'keyType';
    const obj = { id: '1' };

    const response = {
      rows: [obj],
    };

    const request = {
      json: true,
      code: process.env.EOS_CONTRACT_ACCOUNT,
      scope,
      table,
      lower_bound: lowerBound,
      upper_bound: upperBound,
      limit,
      index_position: indexPosition,
      key_type: keyType,
    };

    it('response is true', async () => {
      eos.initialized = true;
      eos.eosInstance = {
        getTableRows: jest.fn().mockImplementation(() => response),
      };
      expect(eos.eosInstance.getTableRows).toHaveBeenCalledTimes(0);

      const value = await eos.getTableRows(
        table,
        scope,
        lowerBound,
        limit,
        upperBound,
        indexPosition,
        keyType,
      );
      expect(eos.eosInstance.getTableRows).toHaveBeenCalledTimes(1);
      expect(eos.eosInstance.getTableRows).toHaveBeenCalledWith(request);
      expect(value).toEqual(response.rows);
    });

    it('response is false', async () => {
      eos.initialized = true;
      eos.eosInstance = {
        getTableRows: jest.fn().mockImplementation(() => null),
      };

      const value = await eos.getTableRows(
        table,
        scope,
        lowerBound,
        limit,
        upperBound,
        indexPosition,
        keyType,
      );
      expect(value).toEqual([]);
    });
  });
});

describe('getEosioConfig', () => {
  it('test', () => {
    const eos = new EosioService();
    const key = 'key';

    eos.node = node;

    expect(eos.getEosioConfig(key)).toEqual({
      httpEndpoint: eos.node.endpoint,
      chainId: eos.node.chainId,
      broadcast: true,
      keyProvider: [key],
      sign: true,
    });
  });
});

describe('getScatterConfig', () => {
  it('test', () => {
    const eos = new EosioService();

    eos.node = node;

    expect(eos.getScatterConfig()).toEqual({
      blockchain: BLOCKCHAIN_NAME,
      protocol: eos.node.protocol,
      host: eos.node.host,
      port: eos.node.port,
      chainId: eos.node.chainId,
    });
  });
});

describe('privateToPublic', () => {
  it('success', () => {
    const privateKey = 'privatekey';
    const publicKey = 'publickey';

    const eos = new EosioService();

    ecc.privateToPublic.mockImplementationOnce(() => publicKey);

    expect(ecc.privateToPublic).toHaveBeenCalledTimes(0);
    expect(eos.privateToPublic(privateKey)).toBe(publicKey);
    expect(ecc.privateToPublic).toHaveBeenCalledWith(privateKey);
    expect(ecc.privateToPublic).toHaveBeenCalledTimes(1);
  });

  it('error', () => {
    const privateKey = null;

    const eos = new EosioService();

    ecc.privateToPublic.mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(eos.privateToPublic(privateKey)).toBe(null);
  });
});

describe('publicToAccounts', () => {
  it('no public key', async () => {
    const eos = new EosioService();

    eos.eosInstance = {
      getKeyAccounts: jest.fn(),
    };

    expect(eos.eosInstance.getKeyAccounts).toHaveBeenCalledTimes(0);
    expect(await eos.publicToAccounts()).toBe(null);
    expect(eos.eosInstance.getKeyAccounts).toHaveBeenCalledTimes(0);
  });

  describe('with public key', () => {
    const publicKey = 'publickey';

    it('there are account names', async () => {
      const eos = new EosioService();
      const accounts = { account_names: ['user1'] };

      eos.eosInstance = {
        getKeyAccounts: jest.fn().mockImplementationOnce(() => accounts),
      };

      expect(eos.eosInstance.getKeyAccounts).toHaveBeenCalledTimes(0);
      expect(await eos.publicToAccounts(publicKey)).toBe(
        accounts.account_names[0],
      );
      expect(eos.eosInstance.getKeyAccounts).toHaveBeenCalledTimes(1);
      expect(eos.eosInstance.getKeyAccounts).toHaveBeenCalledWith(publicKey);
    });

    it('there are no account_names', async () => {
      const eos = new EosioService();
      const accounts = { account_names: [] };

      eos.eosInstance = {
        getKeyAccounts: jest.fn().mockImplementationOnce(() => accounts),
      };

      expect(eos.eosInstance.getKeyAccounts).toHaveBeenCalledTimes(0);
      expect(await eos.publicToAccounts(publicKey)).toBe(null);
      expect(eos.eosInstance.getKeyAccounts).toHaveBeenCalledTimes(1);
      expect(eos.eosInstance.getKeyAccounts).toHaveBeenCalledWith(publicKey);
    });

    it('there are no accounts', async () => {
      const eos = new EosioService();
      const accounts = null;

      eos.eosInstance = {
        getKeyAccounts: jest.fn().mockImplementationOnce(() => accounts),
      };

      expect(eos.eosInstance.getKeyAccounts).toHaveBeenCalledTimes(0);
      expect(await eos.publicToAccounts(publicKey)).toBe(null);
      expect(eos.eosInstance.getKeyAccounts).toHaveBeenCalledTimes(1);
      expect(eos.eosInstance.getKeyAccounts).toHaveBeenCalledWith(publicKey);
    });
  });
});

describe('getAccount', () => {
  const eosName = 'eosname';
  const accountInfo = {};
  const eos = new EosioService();

  eos.eosInstance = {
    getAccount: jest.fn(),
  };

  it('success', async () => {
    eos.eosInstance.getAccount = jest
      .fn()
      .mockImplementationOnce(() => accountInfo);

    expect(await eos.getAccount(eosName)).toEqual(accountInfo);
    expect(eos.eosInstance.getAccount).toHaveBeenCalledWith(eosName);
  });

  it('error', async () => {
    eos.eosInstance.getAccount = null;
    expect(await eos.getAccount(eosName)).toBe(null);
  });
});

describe('getNode', () => {
  it('node from LS is null', () => {
    const nodeLS = null;
    const bestNode = {};
    const eos = new EosioService();

    eos.getBestNode = () => bestNode;
    localStorage.getItem.mockImplementation(() => JSON.stringify(nodeLS));

    expect(eos.getNode()).toEqual(bestNode);
  });

  it('node from LS is not null', () => {
    const nodeLS = {};
    const eos = new EosioService();

    localStorage.getItem.mockImplementation(() => JSON.stringify(nodeLS));

    expect(eos.getNode()).toEqual(nodeLS);
  });
});

describe('getBestNode', () => {
  const eos = new EosioService();

  eos.getBestNode();
  expect(fetch).toHaveBeenCalledWith(
    process.env.WALLET_API_ENDPOINT + BEST_NODE_SERVICE,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ region: 'any' }),
    },
  );
});

describe('compareSavedAndBestNodes', () => {
  it('saved note is different from best node', async () => {
    const eos = new EosioService();

    const savedNode = { endpoint: '1' };
    const bestNode = { endpoint: '122' };

    eos.getBestNode = () => bestNode;
    localStorage.getItem.mockImplementation(() => JSON.stringify(savedNode));

    await eos.compareSavedAndBestNodes();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_BESTNODE,
      JSON.stringify(bestNode),
    );
  });

  it('nothing saved', async () => {
    const eos = new EosioService();

    const savedNode = null;
    const bestNode = { endpoint: '122' };

    eos.getBestNode = () => bestNode;
    localStorage.getItem.mockImplementation(() => JSON.stringify(savedNode));

    await eos.compareSavedAndBestNodes();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_BESTNODE,
      JSON.stringify(bestNode),
    );
  });

  it('saved node is not different from best node', async () => {
    const eos = new EosioService();

    const savedNode = { endpoint: '122' };
    const bestNode = { endpoint: '122' };

    eos.getBestNode = () => bestNode;
    localStorage.getItem.mockImplementation(() => JSON.stringify(savedNode));

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    await eos.compareSavedAndBestNodes();
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
