import { translationMessages } from 'i18n';

import { AskQuestion } from '../index';
import { FORM_TITLE, FORM_CONTENT } from '../constants';

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
  const addParams = {
    postButtonId: 'postButtonId',
  };

  it('postQuestion test', () => {
    const question = {
      title: values.get(FORM_TITLE),
      content: values.get(FORM_CONTENT),
    };

    expect(cmp.props.askQuestionDispatch).toHaveBeenCalledTimes(0);

    cmp.postQuestion(values, null, addParams);

    expect(cmp.props.askQuestionDispatch).toHaveBeenCalledTimes(1);
    expect(cmp.props.askQuestionDispatch).toHaveBeenCalledWith(
      cmp.props.account,
      question,
      addParams.postButtonId,
      translationMessages[cmp.props.locale],
    );
  });
});

describe('AskQuestion', () => {
  it('snapshot test', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
