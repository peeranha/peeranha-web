import { Header } from '../Header';

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

const cmp = new Header();
cmp.props = {
  sendEmailLoading: false,
  sendEmail: () => {},
  showHeaderPopupDispatch: jest.fn(),
  closeHeaderPopupDispatch: jest.fn(),
  showPopup: true,
  popupPosition: {},
};

describe('Header', () => {
  it('test', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
