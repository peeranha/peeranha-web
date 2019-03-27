import { ViewQuestionContainer } from '../ViewQuestionContainer';

describe('ViewQuestionContainer', () => {
  it('test', () => {
    const props = {
      translations: {},
    };

    expect(ViewQuestionContainer(props)).toMatchSnapshot();
  });
});
