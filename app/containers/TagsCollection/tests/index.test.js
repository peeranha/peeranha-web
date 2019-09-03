import { TagsCollection } from '../index';

describe('<TagsCollection />', () => {
  const props = {
    locale: 'en',
    profile: {},
    communities: [{ id: 1, tags: [] }],
    communitiesLoading: false,
    showLoginModalDispatch: jest.fn(),
  };

  it('render', () => {
    expect(TagsCollection(props)).toMatchSnapshot();
  });
});
