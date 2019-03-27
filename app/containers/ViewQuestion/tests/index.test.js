import { translationMessages } from 'i18n';

import { TEXT_EDITOR_ANSWER_FORM } from 'components/AnswerForm/constants';
import { ViewQuestion } from '../index';

import {
  TEXTAREA_COMMENT_FORM,
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
  deleteQuestionDispatch: jest.fn(),
  deleteAnswerDispatch: jest.fn(),
  deleteCommentDispatch: jest.fn(),
  toggleCommentVisionDispatch: jest.fn(),
  saveCommentDispatch: jest.fn(),
  voteToDeleteDispatch: jest.fn(),
};

const ev = {
  currentTarget: {
    id: 'id',
    dataset: {},
  },
};

describe('<ViewQuestion />', () => {
  describe('voteToDelete', () => {
    it('test', () => {
      const questionid = 1;
      const answerid = 2;
      const commentid = 3;
      const id = 'id';
      const whowasvoted = 'whowasvoted';

      ev.currentTarget.dataset.questionid = questionid;
      ev.currentTarget.dataset.answerid = answerid;
      ev.currentTarget.dataset.commentid = commentid;
      ev.currentTarget.dataset.whowasvoted = whowasvoted;
      ev.currentTarget.dataset.id = id;

      cmp.voteToDelete(ev);
      expect(cmp.props.voteToDeleteDispatch).toHaveBeenCalledWith(
        questionid,
        answerid,
        commentid,
        id,
        whowasvoted,
      );
    });
  });

  describe('saveComment', () => {
    const mapp = new Map();

    const commentId = 'commentid';
    const answerId = 'answerid';
    const toggleView = jest.fn();

    const args = [
      mapp,
      () => {},
      {
        commentId,
        answerId,
        toggleView,
      },
    ];

    it('test', () => {
      cmp.saveComment(...args);
      expect(cmp.props.saveCommentDispatch).toHaveBeenCalledWith(
        cmp.props.account,
        cmp.questionId,
        answerId,
        commentId,
        mapp.get('comment'),
        args[2].toggleView,
      );
    });
  });

  describe('deleteComment', () => {
    const id = 'id';
    const commentid = 'commentid';
    const answerid = 'answerid';

    ev.currentTarget.id = id;
    ev.currentTarget.dataset.answerid = answerid;
    ev.currentTarget.dataset.commentid = commentid;

    cmp.deleteComment(ev);

    it('test', () => {
      expect(cmp.props.deleteCommentDispatch).toHaveBeenCalledWith(
        cmp.props.account,
        cmp.questionId,
        answerid,
        commentid,
        id,
      );
    });
  });

  describe('deleteAnswer', () => {
    const id = 'id';
    const answerid = 'answerid';

    ev.currentTarget.id = id;
    ev.currentTarget.dataset.answerid = answerid;

    cmp.deleteAnswer(ev);

    it('test', () => {
      expect(cmp.props.deleteAnswerDispatch).toHaveBeenCalledWith(
        cmp.props.account,
        cmp.questionId,
        answerid,
        id,
      );
    });
  });

  describe('deleteQuestion', () => {
    const id = 'id';
    ev.currentTarget.id = id;

    cmp.deleteQuestion(ev);

    it('test', () => {
      expect(cmp.props.deleteQuestionDispatch).toHaveBeenCalledWith(
        cmp.props.account,
        cmp.questionId,
        id,
      );
    });
  });

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
      const answerid = 10;
      const questionid = 11;
      const whowasaccepted = 'whowasaccepted';
      const postButtonId = `${MARK_AS_BUTTON}${answerid}`;

      ev.currentTarget.dataset.answerid = answerid;
      ev.currentTarget.dataset.whowasaccepted = whowasaccepted;
      ev.currentTarget.id = postButtonId;

      cmp.questionId = questionid;

      cmp.markAsAccepted(ev);
      expect(cmp.props.markAsAcceptedDispatch).toHaveBeenCalledWith(
        cmp.props.account,
        questionid,
        answerid,
        postButtonId,
        translationMessages[cmp.props.locale],
        whowasaccepted,
      );
    });
  });

  describe('upVote', () => {
    it('test', () => {
      const answerid = 10;
      const questionid = 11;
      const whowasupvoted = 'whowasupvoted';
      const postButtonId = `${UP_VOTE_BUTTON}${answerid}`;

      ev.currentTarget.dataset.answerid = answerid;
      ev.currentTarget.dataset.whowasupvoted = whowasupvoted;
      ev.currentTarget.id = postButtonId;

      cmp.questionId = questionid;

      cmp.upVote(ev);
      expect(cmp.props.upVoteDispatch).toHaveBeenCalledWith(
        cmp.props.account,
        questionid,
        answerid,
        postButtonId,
        translationMessages[cmp.props.locale],
        whowasupvoted,
      );
    });
  });

  describe('downVote', () => {
    it('test', () => {
      const answerid = 10;
      const questionid = 11;
      const whowasdownvoted = 'whowasdownvoted';
      const postButtonId = `${DOWN_VOTE_BUTTON}${answerid}`;

      ev.currentTarget.dataset.answerid = answerid;
      ev.currentTarget.dataset.whowasdownvoted = whowasdownvoted;
      ev.currentTarget.id = postButtonId;

      cmp.questionId = questionid;

      cmp.downVote(ev);
      expect(cmp.props.downVoteDispatch).toHaveBeenCalledWith(
        cmp.props.account,
        questionid,
        answerid,
        postButtonId,
        translationMessages[cmp.props.locale],
        whowasdownvoted,
      );
    });
  });

  describe('postAnswer', () => {
    const answer = 'HI';
    const reset = () => {};
    const sendButtonId = `sendButtonId`;
    const obj = { answerId: 1, reset, sendButtonId };
    const mapp = new Map().set(TEXT_EDITOR_ANSWER_FORM, answer);

    it('test', () => {
      const questionId = 5;
      cmp.questionId = questionId;

      cmp.postAnswer(mapp, reset, obj);
      expect(cmp.props.postAnswerDispatch).toHaveBeenCalledWith(
        cmp.props.account,
        questionId,
        answer,
        obj.reset,
        sendButtonId,
        translationMessages[cmp.props.locale],
      );
    });
  });

  describe('postComment', () => {
    const reset = jest.fn();
    const toggleView = jest.fn();

    const obj = { answerId: 1, reset, toggleView };
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
        obj.toggleView,
      );
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
});
