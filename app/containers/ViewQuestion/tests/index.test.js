import { ViewQuestion, mapDispatchToProps } from '../index';

const cmp = new ViewQuestion();
cmp.props = {
  account: 'PropTypes.string',
  locale: 'PropTypes.string',
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
  describe('render', () => {
    expect(cmp.render()).toMatchSnapshot();
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
