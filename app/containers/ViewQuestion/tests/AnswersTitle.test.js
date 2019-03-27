import { AnswersTitle } from '../AnswersTitle';

describe('AnswersTitle', () => {
  it('test', () => {
    const props = {
      answersNum: 0,
    };

    expect(AnswersTitle(props)).toMatchSnapshot();
  });
});
