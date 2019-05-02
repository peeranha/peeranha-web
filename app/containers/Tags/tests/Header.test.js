import { Header } from '../Header';

describe('Header', () => {
  const props = {
    goToCreateTagScreen: jest.fn(),
    sortTags: jest.fn(),
    sorting: 'id',
    currentCommunity: {},
    tagsNumber: 1,
  };

  it('test', () => {
    expect(Header(props)).toMatchSnapshot();
  });
});
