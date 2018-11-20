import ViewQuestionContainer from '../ViewQuestionContainer';

describe('ViewQuestionContainer', () => {
  it('test', () => {
    const props = {};
    expect(ViewQuestionContainer(props)).toMatchSnapshot();
  });
});
