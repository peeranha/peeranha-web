import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import QuestionsHeader, { askQuestion } from '../QuestionsHeader';

createdHistory.push = jest.fn();

const props = {
  translations: {},
  getInitQuestions: jest.fn(),
  communities: [],
  questionsList: [],
  parentPage: '99',
};

describe('QuestionsHeader', () => {
  it('snapshot test', () => {
    expect(QuestionsHeader(props)).toMatchSnapshot();
  });

  it('askQuestion', () => {
    askQuestion();
    expect(createdHistory.push).toHaveBeenCalledWith('/questions/ask');
  });

  it('parentPage === feed', () => {
    props.parentPage = routes.feed();
    props.followedCommunities = [];
    expect(QuestionsHeader(props)).toMatchSnapshot();
  });
});
