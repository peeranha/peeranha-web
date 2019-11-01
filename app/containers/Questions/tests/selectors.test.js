/* eslint no-shadow: 0 */
import { fromJS } from 'immutable';

import {
  selectQuestionsDomain,
  selectQuestionsLoading,
  selectQuestionsList,
  selectQuestionsError,
  selectInitLoadedItems,
  selectNextLoadedItems,
  selectIsLastFetch,
  selectFollowedCommunities,
  selectQuestions,
} from '../selectors';

describe('selectQuestionsDomain', () => {
  const questionsLoading = true;
  const questionsList = [];
  const questionsError = 'questionsError';
  const initLoadedItems = 25;
  const nextLoadedItems = 10;
  const communityIdFilter = 10;
  const isLastFetch = false;
  const followedCommunities = fromJS([]);

  const globalState = fromJS({
    questionsLoading,
    questionsList,
    questionsError,
    initLoadedItems,
    nextLoadedItems,
    isLastFetch,
    communityIdFilter,
    followedCommunities,
  });

  const mockedState = fromJS({
    questionsReducer: globalState,
  });
  it('should select the global state', () => {
    expect(selectQuestionsDomain(mockedState)).toEqual(globalState);
  });

  describe('selectQuestions', () => {
    const account = 'user1';
    const followedCommunities = [1, 2, 3];

    const questionsList = [
      {
        id: 1,
        community_id: 1,
      },
      {
        id: 2,
        community_id: 2,
      },
      {
        id: 3,
        community_id: 3,
      },
      {
        id: 4,
        community_id: 4,
      },
      {
        id: 5,
        community_id: 5,
      },
      {
        id: 6,
        community_id: 6,
      },
    ];

    const state = fromJS({
      accountProvider: {
        account,
      },
      dataCacheProvider: {
        users: {
          [account]: {
            followed_communities: followedCommunities,
          },
        },
      },
      questionsReducer: {
        questionsList,
      },
    });

    it('communityId is TRUE', () => {
      const communityId = 2;
      expect(selectQuestions(null, communityId, null)(state)).toEqual([
        questionsList[1],
      ]);
    });

    it('isFeed is TRUE', () => {
      const isFeed = true;
      expect(selectQuestions(isFeed, null, null)(state)).toEqual([
        questionsList[0],
        questionsList[1],
        questionsList[2],
      ]);
    });

    it('questionId is TRUE', () => {
      const questionId = 5;
      expect(selectQuestions(null, null, questionId)(state)).toEqual(
        questionsList[4],
      );
    });
  });

  it('selectQuestionsLoading', () => {
    const isQuestionsLoading = selectQuestionsLoading();
    expect(isQuestionsLoading(mockedState)).toEqual(questionsLoading);
  });

  it('selectQuestionsList', () => {
    const isQuestionsList = selectQuestionsList();
    expect(isQuestionsList(mockedState)).toEqual(questionsList);
  });

  it('selectQuestionsError', () => {
    const isQuestionsError = selectQuestionsError();
    expect(isQuestionsError(mockedState)).toEqual(questionsError);
  });

  it('selectInitLoadedItems', () => {
    const isInitLoadedItems = selectInitLoadedItems();
    expect(isInitLoadedItems(mockedState)).toEqual(initLoadedItems);
  });

  it('selectNextLoadedItems', () => {
    const isNextLoadedItems = selectNextLoadedItems();
    expect(isNextLoadedItems(mockedState)).toEqual(nextLoadedItems);
  });

  it('selectIsLastFetch', () => {
    const isIsLastFetch = selectIsLastFetch();
    expect(isIsLastFetch(mockedState)).toEqual(isLastFetch);
  });

  it('selectFollowedCommunities', () => {
    const isSelectFollowedCommunities = selectFollowedCommunities();
    expect(isSelectFollowedCommunities(mockedState)).toEqual(
      followedCommunities,
    );
  });
});
