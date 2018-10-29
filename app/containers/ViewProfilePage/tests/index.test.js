import { ViewProfilePage } from '../index';

const cmp = new ViewProfilePage();
cmp.props = {
  profile: {},
  match: {
    params: {
      id: 'user1',
    },
  },
  account: 'user2',
};

describe('ViewProfilePage tests', () => {
  it('render test', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
