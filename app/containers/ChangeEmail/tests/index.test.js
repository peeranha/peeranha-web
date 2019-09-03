import { ChangeEmail } from '../index';

const cmp = new ChangeEmail();
cmp.props = {
  changeEmailDispatch: jest.fn(),
  hideChangeEmailModalDispatch: jest.fn(),
  showChangeEmailModalDispatch: jest.fn(),
  sendOldEmailDispatch: jest.fn(),
  confirmOldEmailDispatch: jest.fn(),
  children: null,
  changeEmailProcessing: false,
  showModal: false,
  sendOldEmailProcessing: false,
  confirmOldEmailProcessing: false,
  locale: 'en',
  content: null,
};

describe('<ChangeEmail />', () => {
  it('render', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
