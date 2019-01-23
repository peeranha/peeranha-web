import TagsHeader from '../TagsHeader';

const props = {
  goToCreateCommunityScreen: jest.fn(),
  communityid: '1',
};

describe('TagsHeader', () => {
  it('test', () => {
    expect(TagsHeader(props)).toMatchSnapshot();
  });
});
