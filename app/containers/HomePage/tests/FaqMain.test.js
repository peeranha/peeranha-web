import FaqMain, { Question, Questions } from '../FaqMain';

const props = {
  header: 'whatIsReputation',
  body: 'whatIsReputationCollapsed',
  questionsNumber: 6,
};

describe('FaqMain', () => {
  it('Question', () => {
    expect(Question(props)).toMatchSnapshot();
  });

  it('Questions', () => {
    expect(Questions(props)).toMatchSnapshot();
  });

  it('FaqMain', () => {
    expect(FaqMain(props)).toMatchSnapshot();
  });
});
