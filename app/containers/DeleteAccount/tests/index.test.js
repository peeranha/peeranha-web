import { DeleteAccount } from '../index';

const cmp = new DeleteAccount();
cmp.props = {
  deleteAccountDispatch: jest.fn(),
  hideDeleteAccountModalDispatch: jest.fn(),
  deleteAccountProcessing: false,
  showModal: false,
  locale: 'en',
  showDeleteAccountModalDispatch: jest.fn(),
  content: null,
  sendEmailProcessing: false,
  sendEmailDispatch: jest.fn(),
  render: jest.fn(),
};

describe('<DeleteAccount />', () => {
  it('render', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
