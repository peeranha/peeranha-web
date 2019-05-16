import { CommunitySelector } from '../index';

const cmp = new CommunitySelector();

cmp.props = {
  Button: null,
  isArrowed: true,
  locale: 'en',
  communities: [{ id: 1, label: 'com_1' }, { id: 2, label: 'com_2' }],
  followedCommunities: [{ id: 1, label: 'com_1' }],
  showOnlyFollowed: false,
  selectedCommunityId: 1,
  disabled: false,
};

describe('CommunitySelector', () => {
  it('snapshot test', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
