import Activity from '../Activity';

window._ = {
  orderBy: jest.fn().mockImplementation(() => []),
};

const props = {
  userId: 'userId',
  questions: [],
  questionsWithUserAnswers: [],
  questionsWithAnswersLoading: false,
  questionsLoading: false,
  locale: 'en',
};

describe('test', () => {
  it('t1', () => {
    expect(Activity(props)).toMatchSnapshot();
  });
});
