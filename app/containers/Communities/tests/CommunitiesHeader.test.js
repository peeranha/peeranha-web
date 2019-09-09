import Header from '../Header';

const props = {
  goToCreateCommunityScreen: jest.fn(),
};

describe('Header', () => {
  it('test', () => {
    expect(Header(props)).toMatchSnapshot();
  });
});
