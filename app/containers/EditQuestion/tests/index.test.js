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

  describe('render test', () => {
    it('questionLoading is falsy', () => {
      cmp.props.questionLoading = false;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('questionLoading is true', () => {
      cmp.props.questionLoading = true;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('question is null', () => {
      cmp.props.question = null;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('question is NOT null', () => {
      cmp.props.question = {
        title: 'title',
        content: 'content',
      };
      expect(cmp.render()).toMatchSnapshot();
    });
  });
});
