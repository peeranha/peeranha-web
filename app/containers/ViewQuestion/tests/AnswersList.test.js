import AnswersList from '../AnswersList';

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

describe('AnswersList', () => {
  it('test, correct_answer_id !== item.id', () => {
    props.questionData.correct_answer_id = 0;
    expect(AnswersList(props)).toMatchSnapshot();
  });

  it('test, correct_answer_id === item.id', () => {
    props.questionData.correct_answer_id = 1;
    expect(AnswersList(props)).toMatchSnapshot();
  });
});
