import { fromJS } from 'immutable';
import { Questions } from '../index';

const cmp = new Questions();
const fetcher = {};

window.BigInt = jest.fn().mockImplementation(x => x);

cmp.fetcher = fetcher;
cmp.props = {
  locale: 'en',
  match: { params: { communityid: 1 } },
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

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Questions', () => {
  describe('componentDidUpdate', () => {
    it('call getInitQuestions if fetcher is null and oth.', () => {
      cmp.props.followedCommunities = null;

      expect(cmp.props.getQuestionsDispatch).toHaveBeenCalledTimes(0);

      cmp.fetcher = null;
      cmp.props.eosService = {};
      cmp.props.parentPage = 'parentPage';

      cmp.componentDidUpdate();
      expect(cmp.props.getQuestionsDispatch).toHaveBeenCalledTimes(1);
    });

    it('DO NOT call getInitQuestions ...', () => {
      cmp.props.followedCommunities = null;

      expect(cmp.props.getQuestionsDispatch).toHaveBeenCalledTimes(0);

      cmp.fetcher = {};

      cmp.componentDidUpdate();
      expect(cmp.props.getQuestionsDispatch).toHaveBeenCalledTimes(0);
    });
  });

  describe('initFetcher', () => {
    cmp.fetcher = null;

    cmp.initFetcher();

    expect(cmp.fetcher).not.toBe(null);
  });

  describe('componentWillUnmount', () => {
    it('test', () => {
      cmp.componentWillUnmount();
      expect(cmp.fetcher).toBe(null);
    });
  });

  describe('getInitQuestions', () => {
    it('call without params', () => {
      const offset = 0;

      cmp.fetcher = null;

      cmp.getInitQuestions();

      expect(cmp.fetcher).not.toBe(null);

      expect(cmp.props.getQuestionsDispatch).toHaveBeenCalledWith(
        cmp.props.initLoadedItems,
        offset,
        cmp.props.match.params.communityid,
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

      cmp.fetcher = null;

      cmp.getNextQuestions();

      expect(cmp.fetcher).not.toBe(null);

      expect(cmp.props.getQuestionsDispatch).toHaveBeenCalledWith(
        cmp.props.nextLoadedItems,
        id + 1,
        cmp.props.match.params.communityid,
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
        cmp.props.match.params.communityid,
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
