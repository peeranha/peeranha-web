import React from 'react';
import { fromJS } from 'immutable';

import { CreateCommunityForm, validateTagsTitles } from '../Form';
import { TAG_NAME_FIELD } from '../constants';
import messages from '../messages';

React.useState = jest.fn().mockImplementation(() => [[1, 2, 3], jest.fn()]);

describe('<Form />', () => {
  const props = {
    handleSubmit: () => {},
    submitting: true,
    invalid: true,
    createCommunity: jest.fn(),
    uploadImage: jest.fn(),
    getCroppedAvatar: jest.fn(),
    clearImageChanges: jest.fn(),
    editingImgState: '',
    cachedProfileImg: '',
    createCommunityLoading: false,
    translations: {},
    profile: {},
  };

  it('snapshot test', () => {
    expect(CreateCommunityForm(props)).toMatchSnapshot();
  });
});

describe('validateTagsTitles', () => {
  const sameName = 'tag_111';

  const state = {
    tags: {
      0: {
        [TAG_NAME_FIELD]: sameName,
      },
      1: {
        [TAG_NAME_FIELD]: sameName,
      },
    },
  };

  it('state.tags is null', () => {
    const st = fromJS({ ...state, tags: null });

    expect(validateTagsTitles(st)).toEqual({
      tags: {},
    });
  });

  it('state.tags not null', () => {
    expect(validateTagsTitles(fromJS(state))).toEqual({
      tags: {
        0: {
          [TAG_NAME_FIELD]: { id: messages.onlyTagsWithUniqueTitles.id },
        },
        1: {
          [TAG_NAME_FIELD]: { id: messages.onlyTagsWithUniqueTitles.id },
        },
      },
    });
  });
});
