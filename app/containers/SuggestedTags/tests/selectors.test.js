import { fromJS } from 'immutable';
import {
  selectSuggestedTagsDomain,
  selectTags,
  selectTagsError,
  selectTagsLoading,
  selectUpVoteLoading,
  selectUpVoteError,
  selectDownVoteLoading,
  selectDownVoteError,
} from '../selectors';

describe('selectSuggestedTagsDomain', () => {
  const tags = [];
  const tagsLoading = false;
  const getSuggestedTagsError = null;
  const upVoteLoading = false;
  const upVoteError = null;
  const downVoteLoading = false;
  const downVoteError = null;

  const globalState = fromJS({
    tags,
    tagsLoading,
    getSuggestedTagsError,
    upVoteLoading,
    upVoteError,
    downVoteLoading,
    downVoteError,
  });

  const mockedState = fromJS({
    suggestedTags: globalState,
  });

  it('should select the global state', () => {
    expect(selectSuggestedTagsDomain(mockedState)).toEqual(globalState);
  });

  it('selectTags', () => {
    const isSelectTags = selectTags();
    expect(isSelectTags(mockedState)).toEqual(tags);
  });

  it('selectTagsLoading', () => {
    const isSelectTagsLoading = selectTagsLoading();
    expect(isSelectTagsLoading(mockedState)).toEqual(tagsLoading);
  });

  it('selectTagsError', () => {
    const isSelectTagsError = selectTagsError();
    expect(isSelectTagsError(mockedState)).toEqual(getSuggestedTagsError);
  });

  it('selectUpVoteLoading', () => {
    const isSelectUpVoteLoading = selectUpVoteLoading();
    expect(isSelectUpVoteLoading(mockedState)).toEqual(upVoteLoading);
  });

  it('selectUpVoteError', () => {
    const isSelectUpVoteError = selectUpVoteError();
    expect(isSelectUpVoteError(mockedState)).toEqual(upVoteError);
  });

  it('selectDownVoteLoading', () => {
    const isSelectDownVoteLoading = selectDownVoteLoading();
    expect(isSelectDownVoteLoading(mockedState)).toEqual(downVoteLoading);
  });

  it('selectDownVoteError', () => {
    const isSelectDownVoteError = selectDownVoteError();
    expect(isSelectDownVoteError(mockedState)).toEqual(downVoteError);
  });
});
