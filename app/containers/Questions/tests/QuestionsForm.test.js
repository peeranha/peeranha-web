import QuestionsForm from '../QuestionsForm';

const props = {
  translations: {},
  questionsList: new Map(),
  questionsLoading: false,
  locale: 'en',
};

describe('QuestionsForm', () => {
  it('snapshot test 1', () => {
    expect(QuestionsForm(props)).toMatchSnapshot();
  });

  it('snapshot test 2', () => {
    props.questionsList.set('cheburek', 'cheburek');
    expect(QuestionsForm(props)).toMatchSnapshot();
  });

  it('snapshot test 3', () => {
    props.questionsLoading = true;
    expect(QuestionsForm(props)).toMatchSnapshot();
  });
});
