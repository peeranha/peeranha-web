/**
 * Test sagas
 */

import { runSaga } from 'redux-saga';

import { editCommunity, getCommunityById } from 'utils/communityManagement';

import { editCommunitySuccess, getCommunitySuccess } from '../actions';
import { editCommunityWorker, getCommunityWorker } from '../saga';

jest.mock('containers/DataCacheProvider/selectors', () => ({
  selectCommunities: jest.fn(() => () => [
    {
      id: 1,
      avatar: 'Avatar',
      name: 'Name',
      description: 'Description',
      website: 'Official site',
    },
  ]),
  selectStat: jest.fn(() => () => ({})),
}));
jest.mock('containers/EthereumProvider/selectors', () => ({
  selectEthereum: jest.fn(() => ({
    getSelectedAccount: jest.fn(() => ({})),
  })),
}));

jest.mock('utils/communityManagement', () => ({
  editCommunity: jest.fn(() => {}),
  getCommunityById: jest.fn(() => ({
    id: 2,
    avatar: 'Avatar',
    name: 'Name',
    description: 'Description',
    website: 'Official site',
  })),
  isSingleCommunityWebsite: jest.fn(() => false),
  singleCommunityColors: jest.fn(() => ({})),
  singleCommunityFonts: jest.fn(() => ({})),
  singleCommunityStyles: jest.fn(() => ({})),
}));
jest.mock('utils/reduxUtils', () => ({
  delay: jest.fn(() => {}),
}));

jest.mock('../selectors', () => ({
  selectCommunity: jest.fn(() => () => ({
    avatar: 'Avatar',
    name: 'Name',
    description: 'Description',
    website: 'Official site',
  })),
}));

describe('Edit community sagas tests', () => {
  const fakeCommunityData = {
    avatar: 'Avatar',
    name: 'Name',
    description: 'Description',
    website: 'Official site',
  };

  describe('Edit community worker saga', () => {
    it('Expect community not to be updated', async () => {
      const communityId = 1;
      const communityData = { ...fakeCommunityData };

      const dispatched = [];

      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        editCommunityWorker,
        { communityId, communityData },
      );

      expect(dispatched).toEqual([editCommunitySuccess()]);
      expect(editCommunity).not.toHaveBeenCalled();
    });

    it('Expect community to be updated', async () => {
      const communityId = 2;
      const communityData = { ...fakeCommunityData, name: 'New name' };

      const dispatched = [];

      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        editCommunityWorker,
        { communityId, communityData },
      );

      expect(dispatched).toEqual([editCommunitySuccess()]);
      expect(editCommunity).toHaveBeenCalled();
    });
  });

  describe('Get community worker saga tests', () => {
    it('Expect community to be returned from cache', async () => {
      const communityId = 1;
      const community = { ...fakeCommunityData, id: communityId };

      const dispatched = [];

      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        getCommunityWorker,
        { communityId },
      );

      expect(dispatched).toEqual([getCommunitySuccess(community)]);
      expect(getCommunityById).not.toHaveBeenCalled();
    });

    it('Expect community to be returned by API', async () => {
      const communityId = 2;
      const community = { ...fakeCommunityData, id: communityId };

      const dispatched = [];

      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        getCommunityWorker,
        { communityId },
      );

      expect(dispatched).toEqual([getCommunitySuccess(community)]);
      expect(getCommunityById).toHaveBeenCalled();
    });
  });
});
