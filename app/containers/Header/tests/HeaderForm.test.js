import HeaderForm, { isProfileOrLogin } from '../HeaderForm';

const props = {
  account: 'user1',
  userIsInSystem: false,
  showSignUpModalDispatch: jest.fn(),
  showLoginModalDispatch: jest.fn(),
};

it('HeaderForm', () => {
  expect(HeaderForm(props)).toMatchSnapshot();
});

describe('isProfileOrLogin', () => {
  it('returns UserAuthNavLinks', () => {
    props.userIsInSystem = false;
    expect(isProfileOrLogin(props)).toMatchSnapshot();
  });

  it('returns UserProfileNav', () => {
    props.userIsInSystem = true;
    expect(isProfileOrLogin(props)).toMatchSnapshot();
  });
});
