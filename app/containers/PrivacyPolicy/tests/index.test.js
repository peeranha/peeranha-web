import { PrivacyPolicy } from '../index';

const cmp = new PrivacyPolicy();
cmp.props = {
  getPrivacyPolicyDispatch: jest.fn(),
  locale: 'en',
  privacyPolicy: null,
};

describe('<PrivacyPolicy />', () => {
  it('componentDidMount', () => {
    expect(cmp.props.getPrivacyPolicyDispatch).toHaveBeenCalledTimes(0);
    cmp.componentDidMount();
    expect(cmp.props.getPrivacyPolicyDispatch).toHaveBeenCalledTimes(1);
  });
});
