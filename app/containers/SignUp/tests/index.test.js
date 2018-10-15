import { SignUp } from '../index';
import { EOS_ACC, DISPLAY_NAME } from '../constants';

describe('<SignUp />', () => {
  const testA = 'testAcc';
  const testN = 'testAcc';
  const space = new Map();
  space.set(EOS_ACC, testA);
  space.set(DISPLAY_NAME, testN);

  it('Account Registration test', () => {
    SignUp.props = {
      account: {
        eosAccount: testA,
      },
    };
    SignUp.props.registerUserDispatch = jest
      .fn()
      .mockImplementation(() => true);
    expect(SignUp.registerUser(space)).toEqual({
      [EOS_ACC]: testA,
      [DISPLAY_NAME]: testN,
    });
  });
});
