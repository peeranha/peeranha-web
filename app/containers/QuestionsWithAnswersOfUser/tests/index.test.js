import { QuestionsWithAnswersOfUser } from '../index';

const cmp = new QuestionsWithAnswersOfUser();

cmp.props = {
  isLastFetch: false,
  questionsLoading: false,
  userId: 'userId',
  locale: 'en',
  questions: [],
  className: 'className',
  infinityOff: false,
  communities: [],
  getQuestionsDispatch: jest.fn(),
  resetStoreDispatch: jest.fn(),
};

describe('QuestionsWithAnswersOfUser', () => {
  describe('componentDidMount', () => {
    cmp.componentDidMount();
    expect(cmp.props.getQuestionsDispatch).toHaveBeenCalledWith(
      cmp.props.userId,
    );
  });

  describe('componentWillUnmount', () => {
    cmp.componentWillUnmount();
    expect(cmp.props.resetStoreDispatch).toHaveBeenCalled();
  });

  describe('fetchQuestions', () => {
    cmp.fetchQuestions();
    expect(cmp.props.getQuestionsDispatch).toHaveBeenCalledWith(
      cmp.props.userId,
    );
  });

  describe('render', () => {
    it('questionsLoading TRUE', () => {
      cmp.props.questionsLoading = true;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('questions[0] TRUE', () => {
      cmp.props.questions = [
        {
          myPostRating: 100,
          title: 'title',
          myPostTime: 1550837750334,
          answers: [],
          locale: 'en',
          acceptedAnswer: false,
          communities: [],
          id: 'id',
          community_id: 123,
        },
      ];

      expect(cmp.render()).toMatchSnapshot();
    });
  });
});
