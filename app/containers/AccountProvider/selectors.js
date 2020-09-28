import { createSelector } from 'reselect';

import { getCookie } from 'utils/cookie';
import { selectUsers } from 'containers/DataCacheProvider/selectors';
import { AUTOLOGIN_DATA } from 'containers/Login/constants';

import { initialState } from './reducer';

const selectAccountProviderDomain = state =>
  state.get('accountProvider', initialState).toJS();

const makeSelectAccountLoading = () =>
  createSelector(selectAccountProviderDomain, substate => substate.loading);

const makeSelectError = () =>
  createSelector(selectAccountProviderDomain, substate => substate.error);

const makeSelectAccount = () =>
  createSelector(selectAccountProviderDomain, substate => substate.account);

const makeSelectBalance = () =>
  createSelector(selectAccountProviderDomain, substate => substate.balance);

const selectLastUpdate = () =>
  createSelector(selectAccountProviderDomain, substate => substate.lastUpdate);

const makeSelectLoginData = () =>
  createSelector(
    selectAccountProviderDomain,
    account => account || JSON.parse(getCookie(AUTOLOGIN_DATA) || null),
  );

const makeSelectProfileInfo = () =>
  createSelector(
    state => state,
    state => {
      const account = makeSelectAccount()(state);
      const balance = makeSelectBalance()(state);
      const loginData = makeSelectLoginData()(state);
      const profileInfo = selectUsers(account)(state);

      if (typeof profileInfo === 'object') {
        return {
          ...profileInfo,
          balance,
          loginData,
        };
      }

      return profileInfo;
    },
  );

const makeSelectFollowedCommunities = () =>
  createSelector(
    state => state,
    state => {
      const profileInfo = makeSelectProfileInfo()(state);
      return profileInfo ? profileInfo.followed_communities : null;
    },
  );

const selectUserRating = () =>
  createSelector(
    state => state,
    state => {
      const profileInfo = makeSelectProfileInfo()(state);
      return profileInfo ? profileInfo.rating : null;
    },
  );

export {
  selectAccountProviderDomain,
  makeSelectAccountLoading,
  makeSelectError,
  makeSelectAccount,
  makeSelectProfileInfo,
  makeSelectFollowedCommunities,
  makeSelectBalance,
  makeSelectLoginData,
  selectLastUpdate,
  selectUserRating,
};
