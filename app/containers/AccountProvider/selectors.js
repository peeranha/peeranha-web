import { createSelector } from 'reselect';

import { getCookie } from 'utils/cookie';
import { selectUsers } from 'containers/DataCacheProvider/selectors';
import { AUTOLOGIN_DATA } from 'containers/Login/constants';
import {
  MODERATOR_KEY,
  PROPERTY_INVITED_BLOGGER,
  PROPERTY_INVITED_BLOGGER_ACTIVE,
} from 'utils/constants';

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

const makeSelectStakedInCurrentPeriod = () =>
  createSelector(
    selectAccountProviderDomain,
    substate => substate.stakedInCurrentPeriod,
  );

const makeSelectStakedInNextPeriod = () =>
  createSelector(
    selectAccountProviderDomain,
    substate => substate.stakedInNextPeriod,
  );

const makeSelectBoost = () =>
  createSelector(selectAccountProviderDomain, substate => substate.boost);

const selectLastUpdate = () =>
  createSelector(selectAccountProviderDomain, substate => substate.lastUpdate);

const makeSelectLoginData = () =>
  createSelector(
    selectAccountProviderDomain,
    state => state || JSON.parse(getCookie(AUTOLOGIN_DATA) || null),
  );

const makeSelectProfileInfo = () =>
  createSelector(
    state => state,
    state => {
      const account = makeSelectAccount()(state);
      const balance = makeSelectBalance()(state);
      const stakedInCurrentPeriod = makeSelectStakedInCurrentPeriod()(state);
      const stakedInNextPeriod = makeSelectStakedInNextPeriod()(state);
      const boost = makeSelectBoost()(state);
      const loginData = makeSelectLoginData()(state);
      const profileInfo = selectUsers(account)(state);

      if (typeof profileInfo === 'object') {
        return {
          ...profileInfo,
          balance,
          stakedInCurrentPeriod,
          stakedInNextPeriod,
          boost,
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

const selectIsGlobalModerator = () =>
  createSelector(
    state => state,
    state => {
      const profileInfo = makeSelectProfileInfo()(state);
      return !!profileInfo?.['integer_properties'].find(
        x => x.key === MODERATOR_KEY,
      );
    },
  );

const selectIsInvitedBlogger = () =>
  createSelector(
    state => state,
    state => {
      const profileInfo = makeSelectProfileInfo()(state);
      return !!profileInfo?.['integer_properties'].find(
        x =>
          x.key === PROPERTY_INVITED_BLOGGER &&
          x.value === PROPERTY_INVITED_BLOGGER_ACTIVE,
      );
    },
  );

const selectPermissions = () =>
  createSelector(
    state => state,
    state => {
      const profileInfo = makeSelectProfileInfo()(state);
      return profileInfo && profileInfo.hasOwnProperty('permissions')
        ? profileInfo.permissions
        : [];
    },
  );

const selectUserEnergy = () =>
  createSelector(
    state => state,
    state => {
      const profileInfo = makeSelectProfileInfo()(state);
      return profileInfo ? profileInfo.energy : null;
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
  makeSelectStakedInCurrentPeriod,
  makeSelectStakedInNextPeriod,
  makeSelectBoost,
  makeSelectLoginData,
  selectLastUpdate,
  selectUserRating,
  selectUserEnergy,
  selectIsGlobalModerator,
  selectIsInvitedBlogger,
  selectPermissions,
};
