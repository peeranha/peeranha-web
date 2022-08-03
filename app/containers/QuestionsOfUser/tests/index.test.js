import { QuestionsOfUser } from '../index';

const cmp = new QuestionsOfUser();

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

describe('QuestionsOfUser', () => {
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
});
