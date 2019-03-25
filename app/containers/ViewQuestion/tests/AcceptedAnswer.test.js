import AcceptedAnswer from '../AcceptedAnswer';

let props;

beforeEach(() => {
  props = {
    questionData: {
      answers: [
        {
          id: 1,
          userInfo: {},
        },
        {
          id: 2,
          userInfo: {},
        },
        {
          id: 3,
          userInfo: {},
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
