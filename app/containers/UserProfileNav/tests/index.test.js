import createdHistory from 'createdHistory';
import { UserProfileNav } from '../index';

jest.mock('createdHistory');
createdHistory.push.mockImplementation(res => res);

const cmp = new UserProfileNav();
cmp.props = {
  account: 'user1',
};

describe('<UserProfileNav />', () => {
  it('render test', () => {
    expect(cmp.render()).toMatchSnapshot();
  });

  it('pushToProfile', () => {
    expect(cmp.pushToProfile()).toBe(`/users/${cmp.props.account}`);
  });
});
