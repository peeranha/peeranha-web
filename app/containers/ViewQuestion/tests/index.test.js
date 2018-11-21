import TextEditor from 'components/TextEditor';
import { translationMessages } from 'i18n';

import { ViewQuestion, mapDispatchToProps } from '../index';

import {
  TEXTAREA_COMMENT_FORM,
  POST_ANSWER_BUTTON,
  POST_COMMENT_BUTTON,
  MARK_AS_BUTTON,
  UP_VOTE_BUTTON,
  DOWN_VOTE_BUTTON,
} from '../constants';

jest.mock('components/TextEditor');

const cmp = new ViewQuestion();
cmp.props = {
  translations: {},
  account: 'user1',
  locale: 'en',
  questionDataLoading: true,
  postAnswerLoading: true,
  postCommentLoading: true,
  questionData: {
    content: {
      title: 'title',
      content: 'content',
    },
  },
  match: {
    params: {
      id: 'id',
    },
  },
  getQuestionDataDispatch: jest.fn(),
  postAnswerDispatch: jest.fn(),
  postCommentDispatch: jest.fn(),
  upVoteDispatch: jest.fn(),
  downVoteDispatch: jest.fn(),
  markAsAcceptedDispatch: jest.fn(),
};

describe('<ViewQuestion />', () => {
  describe('componentDidMount', () => {
    it('componentDidMount', () => {
      cmp.componentDidMount();
      expect(cmp.questionId).toBe(cmp.props.match.params.id);
      expect(cmp.props.getQuestionDataDispatch).toHaveBeenCalledWith(
        cmp.questionId,
      );
    });
  });

  describe('markAsAccepted', () => {
    it('test', () => {
      const id = 10;
      const questionId = 110;
      const postButtonId = `${MARK_AS_BUTTON}${id}`;

      cmp.questionId = questionId;

      cmp.markAsAccepted(id);
      expect(cmp.props.markAsAcceptedDispatch).toHaveBeenCalledWith(
        cmp.props.account,
        questionId,
        id,
        postButtonId,
        translationMessages[cmp.props.locale],
      );
    });
  });

  describe('upVote', () => {
    it('test', () => {
      const answerId = 10;
      const questionId = 110;
      const postButtonId = `${UP_VOTE_BUTTON}${answerId}`;

      cmp.questionId = questionId;

      cmp.upVote(answerId);
      expect(cmp.props.upVoteDispatch).toHaveBeenCalledWith(
        cmp.props.account,
        questionId,
        answerId,
        postButtonId,
        translationMessages[cmp.props.locale],
      );
    });
  });

  describe('downVote', () => {
    it('test', () => {
      const answerId = 10;
      const questionId = 110;
      const postButtonId = `${DOWN_VOTE_BUTTON}${answerId}`;

      cmp.questionId = questionId;

      cmp.downVote(answerId);
      expect(cmp.props.downVoteDispatch).toHaveBeenCalledWith(
        cmp.props.account,
        questionId,
        answerId,
        postButtonId,
        translationMessages[cmp.props.locale],
      );
    });
  });

  describe('postAnswer', () => {
    const reset = () => {};
    const obj = { answerId: 1, reset, postButtonId: 1 };
    const mapp = new Map().set(TEXTAREA_COMMENT_FORM, 'TEXTAREA_COMMENT_FORM');
    const postButtonId = `${POST_ANSWER_BUTTON}${obj.postButtonId}`;

    it('test', () => {
      const answer = 'HI';
      const questionId = 5;
      cmp.questionId = questionId;

      TextEditor.getHtmlText = jest.fn().mockImplementation(() => answer);

      cmp.postAnswer(mapp, reset, obj);
      expect(cmp.props.postAnswerDispatch).toHaveBeenCalledWith(
        cmp.props.account,
        questionId,
        answer,
        obj.reset,
        postButtonId,
        translationMessages[cmp.props.locale],
      );
    });
  });

  describe('postComment', () => {
    const reset = () => {};
    const obj = { answerId: 1, reset };
    const mapp = new Map().set(TEXTAREA_COMMENT_FORM, 'TEXTAREA_COMMENT_FORM');
    const postButtonId = `${POST_COMMENT_BUTTON}${obj.answerId}`;

    it('test', () => {
      const questionId = 5;
      cmp.questionId = questionId;

      cmp.postComment(mapp, reset, obj);
      expect(cmp.props.postCommentDispatch).toHaveBeenCalledWith(
        cmp.props.account,
        questionId,
        obj.answerId,
        mapp.get(TEXTAREA_COMMENT_FORM),
        obj.reset,
        postButtonId,
        translationMessages[cmp.props.locale],
      );
    });
  });

  describe('editContent', () => {
    it('test', () => {
      expect(cmp.editContent()).toBe(null);
    });
  });

  describe('render', () => {
    it('!@questionDataLoading && @questionData', () => {
      cmp.props.questionDataLoading = false;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('!@questionDataLoading && !@questionData', () => {
      cmp.props.questionDataLoading = false;
      cmp.props.questionData = null;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('@questionDataLoading is true', () => {
      cmp.props.questionDataLoading = true;
      expect(cmp.render()).toMatchSnapshot();
    });
  });

  describe('mapDispatchToProps', () => {
    it('mapDispatchToProps test', () => {
      const test = 'test';
      const dispatch = () => test;

      expect(typeof mapDispatchToProps(dispatch) === 'object').toBe(true);
      expect(mapDispatchToProps(dispatch).dispatch).toBe(dispatch);
      expect(mapDispatchToProps(dispatch).getQuestionDataDispatch()).toBe(test);
      expect(mapDispatchToProps(dispatch).postAnswerDispatch()).toBe(test);
      expect(mapDispatchToProps(dispatch).postCommentDispatch()).toBe(test);
      expect(mapDispatchToProps(dispatch).upVoteDispatch()).toBe(test);
      expect(mapDispatchToProps(dispatch).downVoteDispatch()).toBe(test);
      expect(mapDispatchToProps(dispatch).markAsAcceptedDispatch()).toBe(test);
    });
  });
});
