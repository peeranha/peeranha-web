/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';
import {
  getQuestions,
  getQuestionsFilteredByCommunities,
} from 'utils/questionsManagement';

import defaultSaga, {
  getInitQuestionsWorker,
  getNextQuestionsWorker,
} from '../saga';
import {
  GET_INIT_QUESTIONS,
  GET_INIT_QUESTIONS_SUCCESS,
  GET_INIT_QUESTIONS_ERROR,
  GET_NEXT_QUESTIONS,
  GET_NEXT_QUESTIONS_SUCCESS,
  GET_NEXT_QUESTIONS_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/questionsManagement', () => ({
  getQuestions: jest.fn(),
  getQuestionsFilteredByCommunities: jest.fn(),
}));

describe('getInitQuestionsWorker', () => {
  const res = {
    limit: 10,
    offset: 10,
    communityIdFilter: 0,
  };
  const eos = { id: 1 };

  describe('communityIdFilter === 0', () => {
    res.communityIdFilter = 0;
    const generator = getInitQuestionsWorker(res);

    it('eosService', () => {
      select.mockImplementation(() => eos);
      const step = generator.next();
      expect(step.value).toEqual(eos);
    });

    it('getQuestions', () => {
      const questions = [];
      getQuestions.mockImplementation(() => questions);
      const step = generator.next(eos);

      expect(step.value).toEqual(questions);
    });

    it('GET_INIT_QUESTIONS_SUCCESS', () => {
      const step = generator.next();
      expect(step.value.type).toBe(GET_INIT_QUESTIONS_SUCCESS);
    });

    it('error handling', () => {
      const err = 'error';
      const putDescriptor = generator.throw(err);
      expect(putDescriptor.value.type).toBe(GET_INIT_QUESTIONS_ERROR);
    });
  });

  describe('communityIdFilter > 0', () => {
    res.communityIdFilter = 10;
    const generator = getInitQuestionsWorker(res);

    generator.next();

    it('getQuestionsFilteredByCommunities', () => {
      generator.next(eos);
      expect(getQuestionsFilteredByCommunities).toHaveBeenCalledWith(
        eos,
        res.limit,
        res.offset,
        res.communityIdFilter,
      );
    });
  });
});

describe('getNextQuestionsWorker', () => {
  const res = {
    limit: 10,
    offset: 10,
    communityIdFilter: 0,
  };
  const eos = { id: 1 };

  describe('communityIdFilter === 0', () => {
    res.communityIdFilter = 0;
    const generator = getNextQuestionsWorker(res);

    it('eosService', () => {
      select.mockImplementation(() => eos);
      const step = generator.next();
      expect(step.value).toEqual(eos);
    });

    it('getQuestions', () => {
      const questions = [];
      getQuestions.mockImplementation(() => questions);
      const step = generator.next(eos);

      expect(step.value).toEqual(questions);
    });

    it('GET_INIT_QUESTIONS_SUCCESS', () => {
      const step = generator.next();
      expect(step.value.type).toBe(GET_NEXT_QUESTIONS_SUCCESS);
    });

    it('error handling', () => {
      const err = 'error';
      const putDescriptor = generator.throw(err);
      expect(putDescriptor.value.type).toBe(GET_NEXT_QUESTIONS_ERROR);
    });
  });

  describe('communityIdFilter > 0', () => {
    res.communityIdFilter = 10;
    const generator = getNextQuestionsWorker(res);

    generator.next();

    it('getQuestionsFilteredByCommunities', () => {
      generator.next(eos);
      expect(getQuestionsFilteredByCommunities).toHaveBeenCalledWith(
        eos,
        res.limit,
        res.offset,
        res.communityIdFilter,
      );
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_INIT_QUESTIONS', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_INIT_QUESTIONS);
  });

  it('GET_NEXT_QUESTIONS', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_NEXT_QUESTIONS);
  });
});
