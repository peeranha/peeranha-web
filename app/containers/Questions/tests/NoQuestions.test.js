import NoQuestions from '../NoQuestions';

describe('NoQuestions', () => {
  it('snapshot test', () => {
    expect(NoQuestions()).toMatchSnapshot();
  });
});
