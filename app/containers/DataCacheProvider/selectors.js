import React from 'react';
import { createSelector } from 'reselect';
import * as routes from 'routes-config';

import { getQuestionCode } from 'utils/mdManagement';
import { singleCommunityStyles } from 'utils/communityManagement';
import { SECTION_ID } from 'containers/Faq/constants';

import A from 'components/A';

import { initialState } from './reducer';

const styles = singleCommunityStyles();

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
            return styles.withoutSubHeader ? (
              <a
                key={x}
                href={`${process.env.APP_LOCATION}${routes.faq(
                  getQuestionCode(SECTION_ID, sectionIndex, questionIndex),
                )}`}
              >
                {section.blocks[questionIndex].h3}
              </a>
            ) : (
              <A
                key={x}
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

const selectTutorial = () =>
  createSelector(selectDataCacheProviderDomain, substate => substate.tutorial);

const selectGetTutorialError = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.getTutorialError,
  );

const selectGetTutorialLoading = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.getTutorialLoading,
  );

const selectUserRatingDCP = user =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate?.users[user].rating,
  );

const selectQuestionsAskedValue = user =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate?.users[user].questions_asked,
  );

const selectAnswersGivenValue = user =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate?.users[user].answers_given,
  );

const selectBestAnswersValue = user =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate?.users[user].correct_answers,
  );

const selectFirstIn15AnswersValue = user =>
  createSelector(selectDataCacheProviderDomain, substate => {
    const answersIn15Data = substate?.users[user].integer_properties.find(
      el => el.key === 12,
    );
    const answersIn15Value = answersIn15Data ? answersIn15Data.value : 0;
    return answersIn15Value;
  });

const selectFirstAnswersValue = user =>
  createSelector(selectDataCacheProviderDomain, substate => {
    const firstAnswersData = substate?.users[user].integer_properties.find(
      el => el.key === 13,
    );
    const firstAnswersValue = firstAnswersData ? firstAnswersData.value : 0;
    return firstAnswersValue;
  });

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
  selectTutorial,
  selectGetTutorialError,
  selectGetTutorialLoading,
  selectUserRatingDCP,
  selectQuestionsAskedValue,
  selectAnswersGivenValue,
  selectBestAnswersValue,
  selectFirstAnswersValue,
  selectFirstIn15AnswersValue,
};
