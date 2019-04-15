import { SubHeader } from '../SubHeader';

const props = {
  changeSorting: jest.fn(),
  sorting: {},
  communitiesNumber: 10,
};

describe('SubHeader', () => {
  it('test', () => {
    expect(SubHeader(props)).toMatchSnapshot();
  });
});
