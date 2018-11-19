import AnswersTitle from '../AnswersTitle';

describe('AnswersTitle', () => {
  it('test', () => {
    const props = {
      answersNum: 0,
      translations: {},
    };
    expect(AnswersTitle(props)).toMatchSnapshot();
  });
});
