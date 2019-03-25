import * as routes from 'routes-config';
import { QuestionsHeader } from '../QuestionsHeader';

const props = {
  translations: {},
  getInitQuestions: jest.fn(),
  communities: [],
  questionsList: [],
  parentPage: '99',
  intl: {
    formatMessage: jest.fn(),
  },
};

describe('QuestionsHeader', () => {
  it('snapshot test', () => {
    expect(QuestionsHeader(props)).toMatchSnapshot();
  });

  it('parentPage === feed', () => {
    props.parentPage = routes.feed();
    props.followedCommunities = [];
    expect(QuestionsHeader(props)).toMatchSnapshot();
  });
});
