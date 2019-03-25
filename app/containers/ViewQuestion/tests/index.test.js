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
  target: {
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

      ev.target.dataset.questionid = questionid;
      ev.target.dataset.answerid = answerid;
      ev.target.dataset.commentid = commentid;
      ev.target.dataset.whowasvoted = whowasvoted;
      ev.target.dataset.id = id;

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

    const args = [
      mapp,
      () => {},
      {
        commentId,
        answerId,
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
      );
    });
  });

  describe('editComment', () => {
    const commentid = 'commentid';
    const answerid = 'answerid';

    it('test', () => {
      cmp.editComment({
        ...ev,
        target: {
          dataset: {
            answerid,
            commentid,
          },
        },
      });

      expect(cmp.props.toggleCommentVisionDispatch).toHaveBeenCalledWith({
        commentid,
        answerid,
      });
    });
  });

  describe('deleteComment', () => {
    const id = 'id';
    const commentid = 'commentid';
    const answerid = 'answerid';

    ev.target.id = id;
    ev.target.dataset.answerid = answerid;
    ev.target.dataset.commentid = commentid;

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

    ev.target.id = id;
    ev.target.dataset.answerid = answerid;

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
    ev.target.id = id;

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
      const id = 10;
      const questionId = 110;
      const whoWasAccepted = 'whoWasAccepted';
      const postButtonId = `${MARK_AS_BUTTON}${id}`;

      cmp.questionId = questionId;

      cmp.markAsAccepted(id, whoWasAccepted);
      expect(cmp.props.markAsAcceptedDispatch).toHaveBeenCalledWith(
        cmp.props.account,
        questionId,
        id,
        postButtonId,
        translationMessages[cmp.props.locale],
        whoWasAccepted,
      );
    });
  });

  describe('upVote', () => {
    it('test', () => {
      const answerId = 10;
      const questionId = 110;
      const whoWasUpvoted = 'whoWasUpvoted';
      const postButtonId = `${UP_VOTE_BUTTON}${answerId}`;

      cmp.questionId = questionId;

      cmp.upVote(answerId, whoWasUpvoted);
      expect(cmp.props.upVoteDispatch).toHaveBeenCalledWith(
        cmp.props.account,
        questionId,
        answerId,
        postButtonId,
        translationMessages[cmp.props.locale],
        whoWasUpvoted,
      );
    });
  });

  describe('downVote', () => {
    it('test', () => {
      const answerId = 10;
      const questionId = 110;
      const whoWasDownvoted = 'whoWasDownvoted';
      const postButtonId = `${DOWN_VOTE_BUTTON}${answerId}`;

      cmp.questionId = questionId;

      cmp.downVote(answerId, whoWasDownvoted);
      expect(cmp.props.downVoteDispatch).toHaveBeenCalledWith(
        cmp.props.account,
        questionId,
        answerId,
        postButtonId,
        translationMessages[cmp.props.locale],
        whoWasDownvoted,
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
