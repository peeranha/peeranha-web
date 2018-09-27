import { SignUp } from '../index';

describe('<SignUp />', () => {
  it('Account Registration test', () => {
    const mass = [{ acc: 'testAcc' }, { name: 'testName' }];
    expect(SignUp.registrUser(mass)).toEqual({
      acc: 'testAcc',
      name: 'testName',
    });
  });
});
