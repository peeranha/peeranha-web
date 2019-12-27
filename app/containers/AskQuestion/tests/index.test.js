import { AskQuestion } from '../index';

const props = {
  locale: 'en',
  askQuestionLoading: false,
  communities: [],
  askQuestionDispatch: jest.fn(),
};

describe('AskQuestion', () => {
  it('render', () => {
    expect(AskQuestion(props)).toMatchSnapshot();
  });
});
