import { SendTokens } from '../index';

describe('<SendTokens />', () => {
  const props = {
    locale: 'en',
    children: null,
    showModal: true,
    sendTokensProcessing: false,
    hideSendTokensModalDispatch: jest.fn(),
    showSendTokensModalDispatch: jest.fn(),
    sendTokensDispatch: jest.fn(),
  };

  it('render', () => {
    expect(SendTokens(props)).toMatchSnapshot();
  });
});
