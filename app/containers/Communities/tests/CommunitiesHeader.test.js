import CommunitiesHeader from '../CommunitiesHeader';

const props = {
  goToCreateCommunityScreen: jest.fn(),
};

describe('CommunitiesHeader', () => {
  it('test', () => {
    expect(CommunitiesHeader(props)).toMatchSnapshot();
  });
});
