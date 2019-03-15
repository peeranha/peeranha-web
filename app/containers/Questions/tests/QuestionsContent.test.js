import { QuestionsContent, QuestionItem } from '../QuestionsContent';

jest.mock('utils/datetime', () => ({
  getFormattedDate: jest.fn(),
}));

jest.mock('utils/numbers', () => ({
  getFormattedNum: jest.fn(),
  getFormattedNum2: jest.fn(),
}));

const props = {
  questionsList: [
    {
      answers: [],
      id: 1,
      userInfo: {},
    },
  ],
  locale: 'en',
  communities: [],
};

describe('QuestionsContent', () => {
  it('QuestionsContent, snapshot test', () => {
    expect(QuestionsContent(props)).toMatchSnapshot();
  });

  it('QuestionItem, snapshot test', () => {
    const obj = {
      answers: [],
      userInfo: {},
    };

    expect(QuestionItem(obj)).toMatchSnapshot();
  });
});
