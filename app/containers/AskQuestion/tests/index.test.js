import { translationMessages } from 'i18n';

import messages from 'components/RenderFields/messages';
import { AskQuestion, mapDispatchToProps } from '../index';
import { FORM_TITLE } from '../constants';

window.tinyMCE = {
  activeEditor: {
    getContent: jest.fn(),
  },
};

const cmp = new AskQuestion();
cmp.props = {
  locale: 'en',
  account: 'user',
  askQuestionLoading: false,
  askQuestionDispatch: jest.fn(),
  addToastDispatch: jest.fn(),
};

describe('AskQuestion', () => {
  const values = new Map();

  it('postQuestion test, content is true', () => {
    const content = '<div>Content</div>';
    const question = {
      title: values.get(FORM_TITLE),
      content,
    };

    window.tinyMCE.activeEditor.getContent = jest
      .fn()
      .mockImplementation(() => content);

    expect(cmp.props.askQuestionDispatch).toHaveBeenCalledTimes(0);

    cmp.postQuestion(values);
    expect(cmp.props.askQuestionDispatch).toHaveBeenCalledTimes(1);
    expect(cmp.props.askQuestionDispatch).toHaveBeenCalledWith(
      cmp.props.account,
      question,
    );
  });

  it('postQuestion test, content is false', () => {
    const content = '';
    const toast = {
      type: 'error',
      text: translationMessages[cmp.props.locale][messages.wrongLength1000.id],
    };

    window.tinyMCE.activeEditor.getContent = jest
      .fn()
      .mockImplementation(() => content);

    expect(cmp.props.addToastDispatch).toHaveBeenCalledTimes(0);
    cmp.postQuestion(values);
    expect(cmp.props.addToastDispatch).toHaveBeenCalledTimes(1);
    expect(cmp.props.addToastDispatch).toHaveBeenCalledWith(toast);
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
    expect(mapDispatchToProps(dispatch).addToastDispatch('x1')).toBe(test);
  });
});
