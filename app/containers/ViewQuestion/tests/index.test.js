import { ViewQuestion } from '../index';

jest.mock('components/TextEditor');

const cmp = new ViewQuestion();

cmp.props = {
  translations: {},
  account: 'user1',
  locale: 'en',
  questionDataLoading: true,
  postAnswerLoading: true,
  postCommentLoading: true,
  communities: [{ id: 0, tags: [{ name: 'tag1', id: 0 }] }],
  questionData: {
    community_id: 0,
    tags: [0],
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
