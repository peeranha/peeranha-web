import NoAccess from '../index';

describe('<NoAccess />', () => {
  it('should match the snapshot', () => {
    expect(NoAccess()).toMatchSnapshot();
  });
});
