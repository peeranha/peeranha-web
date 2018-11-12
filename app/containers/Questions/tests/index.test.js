import { fromJS } from 'immutable';
import { Questions, mapDispatchToProps } from '../index';

const cmp = new Questions();
cmp.props = {
  locale: 'en',
  questionsList: fromJS([]),
  questionsLoading: false,
  isLastFetch: false,
  initLoadedItems: 25,
  nextLoadedItems: 10,
  getQuestionsListDispatch: jest.fn(),
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
    const init = 35;
    cmp.props.initLoadedItems = init;
    cmp.componentDidMount();

    expect(cmp.props.getQuestionsListDispatch).toHaveBeenCalledWith(init, 0);
  });

  describe('getQuestionsList', () => {
    it('call without params', () => {
      const limit = 20;
      const offset = cmp.props.questionsList.size;
      cmp.props.nextLoadedItems = limit;

      cmp.getQuestionsList();
      expect(cmp.props.getQuestionsListDispatch).toHaveBeenCalledWith(
        limit,
        offset,
      );
    });

    it('call with params', () => {
      const limit = 10;
      const offset = 10;

      cmp.getQuestionsList(limit, offset);
      expect(cmp.props.getQuestionsListDispatch).toHaveBeenCalledWith(
        limit,
        offset,
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

  describe('mapDispatchToProps', () => {
    it('mapDispatchToProps test', () => {
      const test = 'test';
      const dispatch = () => test;

      expect(typeof mapDispatchToProps(dispatch) === 'object').toBe(true);
      expect(mapDispatchToProps(dispatch).dispatch).toBe(dispatch);
      expect(
        mapDispatchToProps(dispatch).getQuestionsListDispatch('x1', 'x2'),
      ).toBe(test);
      expect(mapDispatchToProps(dispatch).setDefaultReducerDispatch()).toBe(
        test,
      );
    });
  });
});
