import { AskQuestion, mapDispatchToProps } from '../index';
import { FORM_TITLE, FORM_CONTENT } from '../constants';

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

  it('postQuestion test', () => {
    const question = {
      title: values.get(FORM_TITLE),
      content: values.get(FORM_CONTENT),
    };

    expect(cmp.props.askQuestionDispatch).toHaveBeenCalledTimes(0);

    cmp.postQuestion(values);
    expect(cmp.props.askQuestionDispatch).toHaveBeenCalledTimes(1);
    expect(cmp.props.askQuestionDispatch).toHaveBeenCalledWith(
      cmp.props.account,
      question,
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
