import React from 'react';
import { createSelector } from 'reselect';
import * as routes from 'routes-config';

import { getQuestionCode } from 'utils/mdManagement';
import { SECTION_ID } from 'containers/Faq/constants';

import A from 'components/A';

import { initialState } from './reducer';

/**
 * Direct selector to the dataCacheProvider state domain
 */

const selectDataCacheProviderDomain = state =>
  state.get('dataCacheProvider', initialState).toJS();

const selectCommunities = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.communities,
  );

const selectCommunitiesLoading = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.communitiesLoading,
  );

const selectGetCommunitiesWithTagsError = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.getCommunitiesWithTagsError,
  );

const selectUsers = username =>
  createSelector(
    selectDataCacheProviderDomain,
    substate =>
      username !== undefined ? substate.users[username] : substate.users,
  );

const selectUsersLoading = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.usersLoading,
  );

const selectGetUserProfileError = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.getUserProfileError,
  );

const selectStat = () =>
  createSelector(selectDataCacheProviderDomain, substate => substate.stat);

const selectStatLoading = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.statLoading,
  );

const selectStatError = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.getStatError,
  );

const selectFaq = () =>
  createSelector(selectDataCacheProviderDomain, substate => substate.faq);

/**
 *
 * @questionsIndexes - array, ['1.1', '{sectionIndex}.{questionIndex}']
 */

/* eslint array-callback-return: 0, consistent-return: 0 */
const selectFaqQuestions = questionsIndexes =>
  createSelector(selectDataCacheProviderDomain, substate => {
    const { faq } = substate;

    if (faq) {
      return questionsIndexes
        .map(x => {
          const [sectionIndex, questionIndex] = x.split('.');
          const section = faq.blocks[sectionIndex];

          if (section && section.blocks[questionIndex]) {
            return (
              <A
                to={routes.faq(
                  getQuestionCode(SECTION_ID, sectionIndex, questionIndex),
                )}
              >
                {section.blocks[questionIndex].h3}
              </A>
            );
          }
        })
        .filter(x => x);
    }

    return null;
  });

const selectGetFaqError = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.getFaqError,
  );

const selectGetFaqLoading = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.getFaqLoading,
  );

export {
  selectDataCacheProviderDomain,
  selectCommunities,
  selectCommunitiesLoading,
  selectGetCommunitiesWithTagsError,
  selectUsers,
  selectUsersLoading,
  selectGetUserProfileError,
  selectStat,
  selectStatLoading,
  selectStatError,
  selectFaq,
  selectGetFaqError,
  selectFaqQuestions,
  selectGetFaqLoading,
};
