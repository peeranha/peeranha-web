import { EditQuestion } from '../index';

const cmp = new EditQuestion();
cmp.props = {
  match: {
    params: {
      questionid: 1,
      answerid: 1,
    },
  },
  locale: 'en',
  questionLoading: false,
  question: {
    title: 'title',
    content: 'content',
  },
  getAskedQuestionDispatch: jest.fn(),
  editQuestionDispatch: jest.fn(),
};

describe('EditQuestion', () => {
  describe('componentDidMount', () => {
    cmp.componentDidMount();

    expect(cmp.props.getAskedQuestionDispatch).toHaveBeenCalledWith(
      cmp.props.match.params.questionid,
    );
  });

  describe('editQuestion', () => {
    const values = new Map();
    cmp.editQuestion(values);

    expect(cmp.props.editQuestionDispatch).toHaveBeenCalledWith(
      {
        title: values.get('FORM_TITLE'),
        content: values.get('FORM_CONTENT'),
      },
      cmp.props.match.params.questionid,
    );
  });
});
