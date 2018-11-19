import Question from '../Question';

describe('Question', () => {
  it('test', () => {
    const props = {
      questionData: {
        content: {
          title: 'Title',
        },
      },
    };
    expect(Question(props)).toMatchSnapshot();
  });
});
