import { saveText, getText } from '../ipfs';
import { uploadImg } from '../profileManagement';

import {
  COMMUNITIES_TABLE,
  CREATED_TAGS_TABLE,
  CREATED_COMMUNITIES_TABLE,
  FOLLOW_COMM,
  UNFOLLOW_COMM,
  ALL_COMMUNITIES_SCOPE,
  CREATE_TAG,
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
  getUnfollowedCommunities,
  getExistingTags,
} from '../communityManagement';

jest.mock('../ipfs', () => ({
  saveText: jest.fn(),
  getText: jest.fn(),
}));

jest.mock('../profileManagement', () => ({
  uploadImg: jest.fn(),
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

describe('getExistingTags', () => {
  const tags = [{ id: 1, name: 'name', ipfs_description: 'ipfs_description' }];

  it('test', async () => {
    const result = { description: 'description' };

    getText.mockImplementationOnce(() => JSON.stringify(result));

    const extendedTags = await getExistingTags(tags);

    expect(extendedTags[0]).toEqual({
      ...tags[0],
      description: result.description,
    });
  });
});

describe('getFollowedCommunities', () => {
  it('return []', () => {
    const step = getFollowedCommunities(null, null);
    expect(step).toEqual([]);
  });

  it('test', () => {
    const allcommunities = [{ id: 1 }, { id: 12 }, { id: 13 }];
    const followedcommunities = [1, 12];

    expect(getFollowedCommunities(allcommunities, followedcommunities)).toEqual(
      [{ id: 1 }, { id: 12 }],
    );
  });
});

describe('getUnfollowedCommunities', () => {
  it('return []', () => {
    const step = getUnfollowedCommunities(null, null);
    expect(step).toEqual([]);
  });

  it('test', () => {
    const allcommunities = [{ id: 1 }, { id: 12 }, { id: 13 }];
    const followedcommunities = [1, 12];

    expect(
      getUnfollowedCommunities(allcommunities, followedcommunities),
    ).toEqual([{ id: 13 }]);
  });
});

describe('createCommunity', () => {
  const communityIpfsHash = 'communityIpfsHash';
  const user = 'user';
  const imgHash = 'imgHash1110100101';

  const community = {
    name: 'name',
    tags: [{ name: 'name' }],
    avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCA',
  };

  it('test', async () => {
    saveText.mockImplementation(() => communityIpfsHash);
    uploadImg.mockImplementation(() => ({ imgHash }));
    await createCommunity(eosService, user, community);

    expect(saveText).toHaveBeenCalledWith(
      JSON.stringify({
        ...community,
        avatar: imgHash,
      }),
    );

    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      CREATE_COMMUNITY,
      {
        user,
        name: community.name,
        ipfs_description: communityIpfsHash,
        suggested_tags: [
          {
            name: 'name',
            ipfs_description: communityIpfsHash,
          },
        ],
      },
    );
  });
});

describe('getSuggestedCommunities', () => {
  const communities = [];
  const lowerBound = 10;
  const limit = 10;

  it('test', async () => {
    eosService.getTableRows.mockImplementation(() => communities);
    const fetch = await getSuggestedCommunities(eosService, lowerBound, limit);

    expect(fetch).toEqual(communities);
    expect(eosService.getTableRows).toHaveBeenCalledWith(
      CREATED_COMMUNITIES_TABLE,
      ALL_COMMUNITIES_SCOPE,
      lowerBound,
      limit,
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
  const communityId = '1';
  const lowerBound = 10;
  const limit = 10;

  it('test', async () => {
    eosService.getTableRows.mockImplementation(() => tags);

    const fetch = await getSuggestedTags(
      eosService,
      communityId,
      lowerBound,
      limit,
    );

    expect(fetch).toEqual(tags);
    expect(eosService.getTableRows).toHaveBeenCalledWith(
      CREATED_TAGS_TABLE,
      getTagScope(communityId),
      lowerBound,
      limit,
    );
  });
});

describe('suggestTag', () => {
  const tagIpfsHash = 'tagIpfsHash';
  const user = 'user';
  const tag = {
    communityId: '1',
    name: 'name',
  };

  it('test', async () => {
    saveText.mockImplementation(() => tagIpfsHash);
    await suggestTag(eosService, user, tag);

    expect(saveText).toHaveBeenCalledWith(JSON.stringify(tag));
    expect(eosService.sendTransaction).toHaveBeenCalledWith(user, CREATE_TAG, {
      user,
      community_id: +tag.communityId,
      name: tag.name,
      ipfs_description: tagIpfsHash,
    });
  });
});

describe('getAllCommunities', async () => {
  const community = {
    id: 1,
    name: 'com1',
  };

  const eos = {
    getTableRows: jest.fn().mockImplementation(() => [community]),
  };

  await getAllCommunities(eos);

  it('eos', () => {
    expect(eos.getTableRows).toHaveBeenCalledWith(
      COMMUNITIES_TABLE,
      ALL_COMMUNITIES_SCOPE,
      0,
    );

    expect(eos.getTableRows).toHaveBeenCalledWith(
      COMMUNITIES_TABLE,
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
