import { fromJS } from 'immutable';
import { Questions } from '../index';

const cmp = new Questions();
cmp.props = {
  locale: 'en',
  questionsList: fromJS([]),
  questionsLoading: false,
  isLastFetch: false,
  initLoadedItems: 25,
  nextLoadedItems: 10,
  communityIdFilter: 10,
  getInitQuestionsDispatch: jest.fn(),
  getNextQuestionsDispatch: jest.fn(),
  setDefaultReducerDispatch: jest.fn(),
};

describe('Questions', () => {
  describe('componentWillUnmount', () => {
    it('test', () => {
      cmp.componentWillUnmount();
      expect(cmp.props.setDefaultReducerDispatch).toHaveBeenCalled();
    });
  });

  describe('componentDidMount', () => {
    const offset = 0;

    cmp.componentDidMount();

    expect(cmp.props.getInitQuestionsDispatch).toHaveBeenCalledWith(
      cmp.props.initLoadedItems,
      offset,
      cmp.props.communityIdFilter,
    );
  });

  describe('getInitQuestions', () => {
    it('call without params', () => {
      const offset = 0;
      const communityIdFilter = 26;

      cmp.getInitQuestions(communityIdFilter);
      expect(cmp.props.getInitQuestionsDispatch).toHaveBeenCalledWith(
        cmp.props.initLoadedItems,
        offset,
        communityIdFilter,
      );
    });
  });

  describe('getNextQuestions', () => {
    it('test, questionsList NOT null', () => {
      const id = 1;

      cmp.props.questionsList = [
        {
          id,
        },
      ];

      cmp.getNextQuestions();
      expect(cmp.props.getNextQuestionsDispatch).toHaveBeenCalledWith(
        cmp.props.nextLoadedItems,
        id + 1,
        cmp.props.communityIdFilter,
      );
    });

    it('test, questionsList IS null', () => {
      const id = 0;

      cmp.props.questionsList = [];

      cmp.getNextQuestions();
      expect(cmp.props.getNextQuestionsDispatch).toHaveBeenCalledWith(
        cmp.props.nextLoadedItems,
        id,
        cmp.props.communityIdFilter,
      );
    });
  });

  describe('snapshot test', () => {
    it('@questionsLoading is falsy', () => {
      cmp.props.questionsLoading = false;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('@questionsLoading is true', () => {
      cmp.props.questionsLoading = true;
      expect(cmp.render()).toMatchSnapshot();
    });
  });
});
