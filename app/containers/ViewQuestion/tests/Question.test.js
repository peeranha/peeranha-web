import { Question } from '../Question';

describe('Question', () => {
  it('test', () => {
    const props = {
      questionData: {
        userInfo: {},
        content: {
          title: 'Title',
        },
      },
    };

    expect(Question(props)).toMatchSnapshot();
  });
});
