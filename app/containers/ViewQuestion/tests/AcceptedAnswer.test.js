import AcceptedAnswer from '../AcceptedAnswer';

let props;

beforeEach(() => {
  props = {
    questionData: {
      answers: [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
      ],
      correct_answer_id: 1,
    },
  };
});

describe('AcceptedAnswer', () => {
  it('test, correct_answer_id !== item.id', () => {
    props.questionData.correct_answer_id = 0;
    expect(AcceptedAnswer(props)).toMatchSnapshot();
  });

  it('test, correct_answer_id === item.id', () => {
    props.questionData.correct_answer_id = 1;
    expect(AcceptedAnswer(props)).toMatchSnapshot();
  });
});
