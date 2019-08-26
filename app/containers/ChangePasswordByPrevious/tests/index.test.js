import { ChangePasswordByPrevious } from '../index';

const cmp = new ChangePasswordByPrevious();
cmp.props = {
  hideChangePasswordModalDispatch: jest.fn(),
  showChangePasswordModalDispatch: jest.fn(),
  children: null,
  showModal: false,
  locale: 'en',
  content: null,
  sendEmailProcessing: false,
  sendEmailDispatch: jest.fn(),
  submitEmailDispatch: jest.fn(),
  submitEmailProcessing: false,
  changePasswordDispatch: jest.fn(),
  changePasswordProcessing: false,
};

describe('<ChangePasswordByPrevious />', () => {
  it('render', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
