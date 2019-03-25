import { translationMessages } from 'i18n';

import { AskQuestion, mapDispatchToProps } from '../index';
import { FORM_TITLE, FORM_CONTENT, POST_QUESTION_BUTTON } from '../constants';

const cmp = new AskQuestion();

beforeEach(() => {
  cmp.props = {
    locale: 'en',
    account: 'user',
    askQuestionLoading: false,
    askQuestionDispatch: jest.fn(),
    addToastDispatch: jest.fn(),
  };
});

describe('AskQuestion', () => {
  const values = new Map();

  it('postQuestion test', () => {
    const question = {
      title: values.get(FORM_TITLE),
      content: values.get(FORM_CONTENT),
    };

    cmp.props.locale = 'zz';

    expect(cmp.props.askQuestionDispatch).toHaveBeenCalledTimes(0);

    cmp.postQuestion(values);
    expect(cmp.props.askQuestionDispatch).toHaveBeenCalledTimes(1);
    expect(cmp.props.askQuestionDispatch).toHaveBeenCalledWith(
      cmp.props.account,
      question,
      POST_QUESTION_BUTTON,
      translationMessages[cmp.props.locale],
    );
  });
});

describe('AskQuestion', () => {
  it('snapshot test', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  it('mapDispatchToProps test', () => {
    const test = 'test';
    const dispatch = () => test;

    expect(typeof mapDispatchToProps(dispatch) === 'object').toBe(true);
    expect(mapDispatchToProps(dispatch).dispatch).toBe(dispatch);
    expect(mapDispatchToProps(dispatch).askQuestionDispatch('x1', 'x2')).toBe(
      test,
    );
  });
});
