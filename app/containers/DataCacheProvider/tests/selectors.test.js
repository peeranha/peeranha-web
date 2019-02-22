import { fromJS } from 'immutable';
import {
  selectDataCacheProviderDomain,
  selectCommunities,
  selectCommunitiesLoading,
  selectGetCommunitiesWithTagsError,
  selectUsers,
  selectUsersLoading,
  selectGetUserProfileError,
} from '../selectors';

describe('selectDataCacheProviderDomain', () => {
  const communities = [];
  const communitiesLoading = false;
  const getCommunitiesWithTagsError = null;
  const users = {};
  const usersLoading = false;
  const getUserProfileError = null;

  const globalState = fromJS({
    communities,
    communitiesLoading,
    getCommunitiesWithTagsError,
    users,
    usersLoading,
    getUserProfileError,
  });

  const mockedState = fromJS({
    askQuestionReducer: globalState,
  });

  it('should select the global state', () => {
    expect(selectDataCacheProviderDomain(mockedState)).toEqual(globalState);
  });

  it('selectCommunities', () => {
    const isCommunities = selectCommunities();
    expect(isCommunities(mockedState)).toEqual(communities);
  });

  it('selectCommunitiesLoading', () => {
    const isSelectCommunitiesLoading = selectCommunitiesLoading();
    expect(isSelectCommunitiesLoading(mockedState)).toEqual(communitiesLoading);
  });

  it('selectCommunitiesLoading', () => {
    const isSelectGetCommunitiesWithTagsError = selectGetCommunitiesWithTagsError();
    expect(isSelectGetCommunitiesWithTagsError(mockedState)).toEqual(
      getCommunitiesWithTagsError,
    );
  });

  it('selectUsers', () => {
    const isSelectUsers = selectUsers();
    expect(isSelectUsers(mockedState)).toEqual(users);
  });

  it('selectUsersLoading', () => {
    const isSelectUsersLoading = selectUsersLoading();
    expect(isSelectUsersLoading(mockedState)).toEqual(usersLoading);
  });

  it('selectGetUserProfileError', () => {
    const isSelectGetUserProfileError = selectGetUserProfileError();
    expect(isSelectGetUserProfileError(mockedState)).toEqual(
      getUserProfileError,
    );
  });
});
