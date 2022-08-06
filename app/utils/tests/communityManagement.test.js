import { saveText, getText } from '../ipfs';
import { uploadImg } from '../profileManagement';

import {
  COMMUNITIES_TABLE,
  FOLLOW_COMM,
  UNFOLLOW_COMM,
  ALL_COMMUNITIES_SCOPE,
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
  upVoteToCreateTag,
  downVoteToCreateTag,
  upVoteToCreateCommunity,
  downVoteToCreateCommunity,
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

let ethereumService;

beforeEach(() => {
  ethereumService = {
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
    await createCommunity(ethereumService, user, community);

    expect(saveText).toHaveBeenCalledWith(
      JSON.stringify({
        ...community,
        avatar: imgHash,
      }),
    );

    expect(ethereumService.sendTransaction).toHaveBeenCalledWith(
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

describe('downVoteToCreateCommunity', () => {
  const selectedAccount = 'selectedAccount';
  const communityId = 'communityId';

  it('test', async () => {
    await downVoteToCreateCommunity(
      ethereumService,
      selectedAccount,
      communityId,
    );
    expect(ethereumService.sendTransaction).toHaveBeenCalledWith(
      selectedAccount,
      VOTE_TO_DELETE_COMMUNITY,
      {
        user: selectedAccount,
        communityId: +communityId,
      },
    );
  });
});

describe('upVoteToCreateCommunity', () => {
  const selectedAccount = 'selectedAccount';
  const communityId = 'communityId';

  it('test', async () => {
    await upVoteToCreateCommunity(
      ethereumService,
      selectedAccount,
      communityId,
    );
    expect(ethereumService.sendTransaction).toHaveBeenCalledWith(
      selectedAccount,
      VOTE_TO_CREATE_COMMUNITY,
      {
        user: selectedAccount,
        communityId: +communityId,
      },
    );
  });
});

describe('downVoteToCreateTag', () => {
  const selectedAccount = 'selectedAccount';
  const communityId = 'communityId';
  const tagid = 'tagid';

  it('test', async () => {
    await downVoteToCreateTag(
      ethereumService,
      selectedAccount,
      communityId,
      tagid,
    );
    expect(ethereumService.sendTransaction).toHaveBeenCalledWith(
      selectedAccount,
      VOTE_TO_DELETE_TAG,
      {
        user: selectedAccount,
        communityId: +communityId,
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
    await upVoteToCreateTag(
      ethereumService,
      selectedAccount,
      communityId,
      tagid,
    );
    expect(ethereumService.sendTransaction).toHaveBeenCalledWith(
      selectedAccount,
      VOTE_TO_CREATE_TAG,
      {
        user: selectedAccount,
        communityId: +communityId,
        tag_id: +tagid,
      },
    );
  });
});

describe('getAllCommunities', async () => {
  const community = {
    id: 1,
    name: 'com1',
  };

  const ethereum = {
    getTableRows: jest.fn().mockImplementation(() => [community]),
  };

  await getAllCommunities(ethereum);

  it('ethereum', () => {
    expect(ethereum.getTableRows).toHaveBeenCalledWith(
      COMMUNITIES_TABLE,
      ALL_COMMUNITIES_SCOPE,
      0,
    );

    expect(ethereum.getTableRows).toHaveBeenCalledWith(
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
    await unfollowCommunity(
      ethereumService,
      communityIdFilter,
      selectedAccount,
    );

    expect(ethereumService.sendTransaction).toHaveBeenCalledWith(
      selectedAccount,
      UNFOLLOW_COMM,
      {
        user: selectedAccount,
        communityId: communityIdFilter,
      },
    );
  });
});

describe('followCommunity', () => {
  const communityIdFilter = 10;
  const selectedAccount = 10;

  it('test', async () => {
    await followCommunity(ethereumService, communityIdFilter, selectedAccount);

    expect(ethereumService.sendTransaction).toHaveBeenCalledWith(
      selectedAccount,
      FOLLOW_COMM,
      {
        user: selectedAccount,
        communityId: communityIdFilter,
      },
    );
  });
});
