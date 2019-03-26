import { Answers } from '../Answers';

describe('Answers', () => {
  it('test', () => {
    const props = {
      questionData: {
        answers: [],
      },
    };
    expect(Answers(props)).toMatchSnapshot();
  });
});
