import { EditAnswer } from '../index';

const cmp = new EditAnswer();
cmp.props = {
  match: {
    params: {
      questionid: 1,
      answerid: 1,
    },
  },
  locale: 'en',
  answerLoading: false,
  editAnswerDispatch: jest.fn(),
  getAnswerDispatch: jest.fn(),
};

describe('EditAnswer', () => {
  describe('componentDidMount', () => {
    cmp.componentDidMount();

    expect(cmp.props.getAnswerDispatch).toHaveBeenCalledWith(
      cmp.props.match.params.questionid,
      cmp.props.match.params.answerid,
    );
  });

  describe('editAnswer', () => {
    const values = new Map();
    cmp.editAnswer(values);

    expect(cmp.props.editAnswerDispatch).toHaveBeenCalledWith(
      values.get('TEXT_EDITOR_ANSWER_FORM'),
      cmp.props.match.params.questionid,
      cmp.props.match.params.answerid,
    );
  });

  describe('render test', () => {
    it('answerLoading is falsy', () => {
      cmp.props.answerLoading = false;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('answerLoading is true', () => {
      cmp.props.answerLoading = true;
      expect(cmp.render()).toMatchSnapshot();
    });
  });
});
