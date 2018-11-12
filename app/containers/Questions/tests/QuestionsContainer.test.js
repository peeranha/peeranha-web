import QuestionsContainer from '../QuestionsContainer';

const props = {
  translations: {},
  questionsList: new Map(),
  questionsLoading: false,
  locale: 'en',
};

describe('QuestionsContainer', () => {
  it('snapshot test 1', () => {
    expect(QuestionsContainer(props)).toMatchSnapshot();
  });

  it('snapshot test 2', () => {
    props.questionsList.set('cheburek', 'cheburek');
    expect(QuestionsContainer(props)).toMatchSnapshot();
  });

  it('snapshot test 3', () => {
    props.questionsLoading = true;
    expect(QuestionsContainer(props)).toMatchSnapshot();
  });
});
