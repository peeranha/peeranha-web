import {
  FOLLOW_COMM,
  UNFOLLOW_COMM,
  TAGS_COMMUNITIES_TABLE,
  ALL_COMMUNITIES_SCOPE,
} from '../constants';

import {
  unfollowCommunity,
  followCommunity,
  getAllCommunities,
  getTagScope,
} from '../communityManagement';

let eosService;

beforeEach(() => {
  eosService = {
    sendTransaction: jest.fn(),
    getTableRow: jest.fn(),
    getTableRows: jest.fn(),
  };
});

describe('getAllCommunities', () => {
  const community = {
    id: 1,
    name: 'com1',
  };

  const eos = {
    getTableRows: jest.fn().mockImplementation(() => [community]),
  };

  getAllCommunities(eos);

  it('eos', () => {
    expect(eos.getTableRows).toHaveBeenCalledWith(
      TAGS_COMMUNITIES_TABLE,
      ALL_COMMUNITIES_SCOPE,
      0,
    );

    expect(eos.getTableRows).toHaveBeenCalledWith(
      TAGS_COMMUNITIES_TABLE,
      getTagScope(community.id),
      0,
    );
  });
});

describe('unfollowCommunity', () => {
  const communityIdFilter = 10;
  const selectedAccount = 10;

  it('test', async () => {
    await unfollowCommunity(eosService, communityIdFilter, selectedAccount);

    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      selectedAccount,
      UNFOLLOW_COMM,
      {
        user: selectedAccount,
        community_id: communityIdFilter,
      },
    );
  });
});

describe('followCommunity', () => {
  const communityIdFilter = 10;
  const selectedAccount = 10;

  it('test', async () => {
    await followCommunity(eosService, communityIdFilter, selectedAccount);

    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      selectedAccount,
      FOLLOW_COMM,
      {
        user: selectedAccount,
        community_id: communityIdFilter,
      },
    );
  });
});
