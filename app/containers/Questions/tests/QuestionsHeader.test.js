import * as routes from 'routes-config';
import { Header } from '../Header';

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

describe('Header', () => {
  it('snapshot test', () => {
    expect(Header(props)).toMatchSnapshot();
  });

  it('parentPage === feed', () => {
    props.parentPage = routes.feed();
    props.followedCommunities = [];
    expect(Header(props)).toMatchSnapshot();
  });
});
