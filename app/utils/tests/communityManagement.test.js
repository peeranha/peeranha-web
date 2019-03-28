import { saveText } from '../ipfs';

import {
  FOLLOW_COMM,
  UNFOLLOW_COMM,
  TAGS_COMMUNITIES_TABLE,
  ALL_COMMUNITIES_SCOPE,
  CREATE_TAG,
  CREATED_TAGS_COMMUNITIES_TABLE,
  VOTE_TO_CREATE_TAG,
  VOTE_TO_DELETE_TAG,
  VOTE_TO_CREATE_COMMUNITY,
  VOTE_TO_DELETE_COMMUNITY,
  CREATE_COMMUNITY,
} from '../constants';

import {
  unfollowCommunity,
  followCommunity,
  getAllCommunities,
  getTagScope,
  suggestTag,
  getSuggestedTags,
  upVoteToCreateTag,
  downVoteToCreateTag,
  upVoteToCreateCommunity,
  downVoteToCreateCommunity,
  getSuggestedCommunities,
  createCommunity,
  getFollowedCommunities,
} from '../communityManagement';

jest.mock('../ipfs', () => ({
  saveText: jest.fn(),
}));

window.BigInt = jest.fn().mockImplementation(x => x);

let eosService;

beforeEach(() => {
  eosService = {
    sendTransaction: jest.fn(),
    getTableRow: jest.fn(),
    getTableRows: jest.fn(),
  };
});

describe('getFollowedCommunities', () => {
  it('test', () => {
    const allcommunities = [{ id: 1 }];
    const followedcommunities = [1];

    expect(getFollowedCommunities(allcommunities, followedcommunities)).toEqual(
      allcommunities.filter(x => followedcommunities.includes(x.id)),
    );
  });
});

describe('createCommunity', () => {
  const communityIpfsHash = 'communityIpfsHash';
  const user = 'user';
  const community = {
    name: 'name',
  };

  it('test', async () => {
    saveText.mockImplementation(() => communityIpfsHash);
    await createCommunity(eosService, user, community);

    expect(saveText).toHaveBeenCalledWith(JSON.stringify(community));
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      CREATE_COMMUNITY,
      {
        user,
        name: community.name,
        ipfs_description: communityIpfsHash,
      },
    );
  });
});

describe('getSuggestedCommunities', () => {
  const communities = [];

  it('test', async () => {
    eosService.getTableRows.mockImplementation(() => communities);
    const fetch = await getSuggestedCommunities(eosService);

    expect(fetch).toEqual(communities);
    expect(eosService.getTableRows).toHaveBeenCalledWith(
      CREATED_TAGS_COMMUNITIES_TABLE,
      ALL_COMMUNITIES_SCOPE,
      0,
    );
  });
});

describe('downVoteToCreateCommunity', () => {
  const selectedAccount = 'selectedAccount';
  const communityId = 'communityId';

  it('test', async () => {
    await downVoteToCreateCommunity(eosService, selectedAccount, communityId);
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      selectedAccount,
      VOTE_TO_DELETE_COMMUNITY,
      {
        user: selectedAccount,
        community_id: +communityId,
      },
    );
  });
});

describe('upVoteToCreateCommunity', () => {
  const selectedAccount = 'selectedAccount';
  const communityId = 'communityId';

  it('test', async () => {
    await upVoteToCreateCommunity(eosService, selectedAccount, communityId);
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      selectedAccount,
      VOTE_TO_CREATE_COMMUNITY,
      {
        user: selectedAccount,
        community_id: +communityId,
      },
    );
  });
});

describe('downVoteToCreateTag', () => {
  const selectedAccount = 'selectedAccount';
  const communityId = 'communityId';
  const tagid = 'tagid';

  it('test', async () => {
    await downVoteToCreateTag(eosService, selectedAccount, communityId, tagid);
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      selectedAccount,
      VOTE_TO_DELETE_TAG,
      {
        user: selectedAccount,
        community_id: +communityId,
        tag_id: +tagid,
      },
    );
  });
});

describe('upVoteToCreateTag', () => {
  const selectedAccount = 'selectedAccount';
  const communityId = 'communityId';
  const tagid = 'tagid';

  it('test', async () => {
    await upVoteToCreateTag(eosService, selectedAccount, communityId, tagid);
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      selectedAccount,
      VOTE_TO_CREATE_TAG,
      {
        user: selectedAccount,
        community_id: +communityId,
        tag_id: +tagid,
      },
    );
  });
});

describe('getSuggestedTags', () => {
  const tags = [];
  const communityid = '1';

  it('test', async () => {
    eosService.getTableRows.mockImplementation(() => tags);
    const fetch = await getSuggestedTags(eosService, communityid);

    expect(fetch).toEqual(tags);
    expect(eosService.getTableRows).toHaveBeenCalledWith(
      CREATED_TAGS_COMMUNITIES_TABLE,
      getTagScope(communityid),
      0,
    );
  });
});

describe('suggestTag', () => {
  const tagIpfsHash = 'tagIpfsHash';
  const user = 'user';
  const tag = {
    communityid: '1',
    name: 'name',
  };

  it('test', async () => {
    saveText.mockImplementation(() => tagIpfsHash);
    await suggestTag(eosService, user, tag);

    expect(saveText).toHaveBeenCalledWith(JSON.stringify(tag));
    expect(eosService.sendTransaction).toHaveBeenCalledWith(user, CREATE_TAG, {
      user,
      community_id: +tag.communityid,
      name: tag.name,
      ipfs_description: tagIpfsHash,
    });
  });
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
