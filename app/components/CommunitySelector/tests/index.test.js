import { CommunitySelector } from '../index';

const cmp = new CommunitySelector();

cmp.props = {
  intl: {
    formatMessage: jest.fn(),
  },
  Button: null,
  options: [],
  optionsNumber: 0,
  selectedValue: 0,
  toggle: jest.fn(),
};

describe('CommunitySelector', () => {
  it('snapshot test', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
