import HomePage from '../index';

const cmp = new HomePage();

describe('<HomePage />', () => {
  it('render, snapshot test', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
