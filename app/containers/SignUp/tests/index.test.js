import { SignUp } from '../index';
import { EOS_ACC, DISPLAY_NAME } from '../constants';

describe('<SignUp />', () => {
  const space = new Map();
  space.set(EOS_ACC, 'testAcc');
  space.set(DISPLAY_NAME, 'testName');
  it('Account Registration test', () => {
    SignUp.props = jest.fn().mockImplementation(() => {});
    SignUp.props.registrUserDispatch = jest.fn().mockImplementation(() => true);
    expect(SignUp.registrUser(space)).toEqual({
      [EOS_ACC]: 'testAcc',
      [DISPLAY_NAME]: 'testName',
    });
  });
});
