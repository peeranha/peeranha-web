import { fromJS } from 'immutable';
import {
  selectQuestionsDomain,
  selectQuestionsLoading,
  selectQuestionsList,
  selectQuestionsError,
  selectInitLoadedItems,
  selectNextLoadedItems,
  selectIsLastFetch,
  selectCommunityIdFilter,
  selectFollowedCommunities,
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

  it('selectCommunityIdFilter', () => {
    const isSelectCommunityIdFilter = selectCommunityIdFilter();
    expect(isSelectCommunityIdFilter(mockedState)).toEqual(communityIdFilter);
  });

  it('selectFollowedCommunities', () => {
    const isSelectFollowedCommunities = selectFollowedCommunities();
    expect(isSelectFollowedCommunities(mockedState)).toEqual(
      followedCommunities,
    );
  });
});
