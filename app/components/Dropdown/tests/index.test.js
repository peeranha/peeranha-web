import { Dropdown } from '../index';

const props = {
  button: null,
  menu: null,
  id: 'id',
  isArrowed: false,
  className: 'className',
};

describe('Dropdown', () => {
  it('snapshot test', () => {
    expect(Dropdown(props)).toMatchSnapshot();
  });
});
