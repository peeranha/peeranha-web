import { scrollToSection } from 'utils/animation';
import { Support } from '../index';

jest.mock('utils/animation', () => ({
  scrollToSection: jest.fn(),
}));

const cmp = new Support();
cmp.props = {
  locale: 'en',
  sendMessageDispatch: jest.fn(),
  faq: null,
  sendMessageLoading: false,
};

describe('Support', () => {
  it('componentDidUpdate', () => {
    expect(scrollToSection).toHaveBeenCalledTimes(0);
    cmp.componentDidUpdate();
    expect(scrollToSection).toHaveBeenCalledTimes(1);
  });

  it('render', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
