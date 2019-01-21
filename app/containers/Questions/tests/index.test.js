import { fromJS } from 'immutable';
import { Questions } from '../index';

const cmp = new Questions();
const fetcher = {};

cmp.fetcher = fetcher;
cmp.props = {
  locale: 'en',
  followedCommunities: [1, 2],
  questionsList: fromJS([]),
  questionsLoading: false,
  isLastFetch: false,
  initLoadedItems: 25,
  nextLoadedItems: 10,
  communityIdFilter: 10,
  eosService: {},
  getQuestionsDispatch: jest.fn(),
  setDefaultReducerDispatch: jest.fn(),
  followHandlerDispatch: jest.fn(),
  parentPage: 'parentPage',
};

describe('Questions', () => {
  describe('componentDidUpdate', () => {
    cmp.fetcher = null;

    it('!this.fetcher && followedCommunities && eosService === FALSE', () => {
      cmp.props.followedCommunities = null;

      cmp.componentDidUpdate();
      expect(cmp.fetcher).toEqual(null);
    });

    it('!this.fetcher && followedCommunities && eosService === TRUE', () => {
      cmp.fetcher = null;
      cmp.props.followedCommunities = [1];
      cmp.props.eosService = {};

      cmp.componentDidUpdate();
      expect(!!cmp.fetcher.getNextItems).toBe(true);
    });
  });

  describe('componentWillUnmount', () => {
    it('test', () => {
      cmp.componentWillUnmount();
      expect(cmp.props.setDefaultReducerDispatch).toHaveBeenCalled();
      expect(cmp.fetcher).toBe(null);
    });
  });

  describe('getInitQuestions', () => {
    it('call without params', () => {
      const offset = 0;
      const communityIdFilter = 26;

      cmp.getInitQuestions(communityIdFilter);
      expect(cmp.props.getQuestionsDispatch).toHaveBeenCalledWith(
        cmp.props.initLoadedItems,
        offset,
        communityIdFilter,
        cmp.props.parentPage,
        cmp.fetcher,
      );
    });
  });

  describe('getNextQuestions', () => {
    it('test, questionsList NOT null', () => {
      const id = 1;
      const next = true;

      cmp.props.questionsList = [
        {
          id,
        },
      ];

      cmp.getNextQuestions();
      expect(cmp.props.getQuestionsDispatch).toHaveBeenCalledWith(
        cmp.props.nextLoadedItems,
        id + 1,
        cmp.props.communityIdFilter,
        cmp.props.parentPage,
        cmp.fetcher,
        next,
      );
    });

    it('test, questionsList IS null', () => {
      const id = 0;
      const next = true;

      cmp.props.questionsList = [];

      cmp.getNextQuestions();
      expect(cmp.props.getQuestionsDispatch).toHaveBeenCalledWith(
        cmp.props.nextLoadedItems,
        id,
        cmp.props.communityIdFilter,
        cmp.props.parentPage,
        cmp.fetcher,
        next,
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
