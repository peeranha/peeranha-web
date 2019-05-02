/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import { getSuggestedTags, getExistingTags } from 'utils/communityManagement';

import defaultSaga, {
  getSuggestedTagsWorker,
  getExistingTagsWorker,
} from '../saga';

import {
  GET_SUGGESTED_TAGS,
  GET_SUGGESTED_TAGS_SUCCESS,
  GET_SUGGESTED_TAGS_ERROR,
  GET_EXISTING_TAGS,
  GET_EXISTING_TAGS_SUCCESS,
  GET_EXISTING_TAGS_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/communityManagement', () => ({
  getSuggestedTags: jest.fn(),
  getExistingTags: jest.fn(),
}));

jest.mock('utils/profileManagement', () => ({
  getProfileInfo: jest.fn(),
}));

describe('getSuggestedTagsWorker', () => {
  const eos = {};
  const lowerBound = 0;
  const limit = 10;

  const communityId = 1;

  const tags = [];

  let storedTags = [];
  let loadMore = false;

  describe('loadMore is FALSE', () => {
    loadMore = false;

    const generator = getSuggestedTagsWorker({ communityId, loadMore });

    it('eosService', () => {
      select.mockImplementationOnce(() => eos);
      const service = generator.next();
      expect(service.value).toEqual(eos);
    });

    it('storedTags', () => {
      storedTags = [];

      select.mockImplementationOnce(() => storedTags);
      const step = generator.next(eos);
      expect(step.value).toEqual(storedTags);
    });

    it('limit', () => {
      select.mockImplementationOnce(() => limit);
      const step = generator.next(storedTags);
      expect(step.value).toEqual(limit);
    });

    it('getSuggestedTags', () => {
      getSuggestedTags.mockImplementationOnce(() => tags);
      const step = generator.next(lowerBound);
      expect(step.value).toEqual(tags);
    });

    it('GET_SUGGESTED_TAGS_SUCCESS', () => {
      const step = generator.next();
      expect(step.value.type).toEqual(GET_SUGGESTED_TAGS_SUCCESS);
    });

    it('GET_SUGGESTED_TAGS_ERROR: error handling', () => {
      const err = new Error('Some error');
      const putDescriptor = generator.throw(err).value;
      expect(putDescriptor.type).toEqual(GET_SUGGESTED_TAGS_ERROR);
    });
  });

  describe('loadMore is TRUE', () => {
    loadMore = true;

    it('storedTags is TRUE', () => {
      const generator = getSuggestedTagsWorker({ communityId, loadMore });
      storedTags = [{ id: 123 }, { id: 1234 }];

      generator.next();
      generator.next(eos);
      generator.next(storedTags);

      const step = generator.next(limit);
      expect(step.value).toBe(1234 + 1);
    });

    it('storedTags is FALSE', () => {
      const generator = getSuggestedTagsWorker({ communityId, loadMore });
      storedTags = [];

      generator.next();
      generator.next(eos);
      generator.next(storedTags);

      const step = generator.next(limit);
      expect(step.value).toBe(0);
    });
  });
});

describe('getExistingTagsWorker', () => {
  const communityId = 1;
  const limit = 10;
  const text = 'text';
  const sorting = 'id';

  const communities = [
    {
      id: 1,
      tags: [
        {
          name: text,
          description: `${text}_description`,
        },
      ],
    },
  ];

  let loadMore = false;

  const storedTags = [
    {
      id: 1,
    },
  ];

  describe('loadMore is FALSE', () => {
    loadMore = false;

    const generator = getExistingTagsWorker({ communityId, loadMore });

    it('limit', () => {
      select.mockImplementationOnce(() => limit);
      const step = generator.next();
      expect(step.value).toEqual(limit);
    });

    it('text', () => {
      select.mockImplementationOnce(() => text);
      const step = generator.next(limit);
      expect(step.value).toEqual(text);
    });

    it('storedTags', () => {
      select.mockImplementationOnce(() => storedTags);
      const step = generator.next(text);
      expect(step.value).toEqual(storedTags);
    });

    it('sorting', () => {
      select.mockImplementationOnce(() => sorting);
      const step = generator.next(storedTags);
      expect(step.value).toEqual(sorting);
    });

    it('communities', () => {
      select.mockImplementationOnce(() => communities);
      const step = generator.next(sorting);
      expect(step.value).toEqual(communities);
    });

    it('sliceStart', () => {
      const step = generator.next(communities);
      expect(step.value).toEqual(0);
    });

    it('getExistingTags', () => {
      const existingTags = [];

      getExistingTags.mockImplementationOnce(() => existingTags);
      const step = generator.next(0);
      expect(step.value).toEqual(existingTags);
    });

    it('GET_EXISTING_TAGS_SUCCESS', () => {
      const step = generator.next();
      expect(step.value.type).toEqual(GET_EXISTING_TAGS_SUCCESS);
    });

    it('GET_EXISTING_TAGS_ERROR: error handling', () => {
      const err = new Error('Some error');
      const putDescriptor = generator.throw(err).value;
      expect(putDescriptor.type).toEqual(GET_EXISTING_TAGS_ERROR);
    });
  });

  describe('loadMore is TRUE', () => {
    loadMore = true;

    const generator = getExistingTagsWorker({ communityId, loadMore });

    generator.next();
    generator.next(limit);
    generator.next(text);
    generator.next(storedTags);
    generator.next(sorting);

    it('sliceStart is storedTags.length', () => {
      const step = generator.next(communities);
      expect(step.value).toBe(storedTags.length);
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_SUGGESTED_TAGS', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_SUGGESTED_TAGS);
  });

  it('GET_EXISTING_TAGS', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_EXISTING_TAGS);
  });
});
