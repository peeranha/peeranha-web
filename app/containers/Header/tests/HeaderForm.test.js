import HeaderForm, { isProfileOrLogin } from '../HeaderForm';

it('HeaderForm', () => {
  expect(HeaderForm({})).toMatchSnapshot();
});

describe('isProfileOrLogin', () => {
  it('returns UserAuthNavLinks', () => {
    const props = {
      account: 'user1',
      userIsInSystem: false,
      showSignUpModalDispatch: jest.fn(),
      showLoginModalDispatch: jest.fn(),
    };
    expect(isProfileOrLogin(props)).toMatchSnapshot();
  });

  it('returns UserProfileNav', () => {
    const props = {
      account: 'user1',
      userIsInSystem: true,
      showSignUpModalDispatch: jest.fn(),
      showLoginModalDispatch: jest.fn(),
    };
    expect(isProfileOrLogin(props)).toMatchSnapshot();
  });
});
