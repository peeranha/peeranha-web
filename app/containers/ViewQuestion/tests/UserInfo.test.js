import UserInfo from '../UserInfo';

jest.mock('react-router-dom');

describe('UserInfo', () => {
  it('test', () => {
    const props = {};
    expect(UserInfo(props)).toMatchSnapshot();
  });
});
