import HeaderForm, { isProfileOrLogin } from '../HeaderForm';

const props = {
  account: 'user1',
  profileInfo: false,
  showSignUpModalDispatch: jest.fn(),
  showLoginModalDispatch: jest.fn(),
};

it('HeaderForm', () => {
  expect(HeaderForm(props)).toMatchSnapshot();
});

describe('isProfileOrLogin', () => {
  it('returns UserAuthNavLinks', () => {
    props.profileInfo = false;
    expect(isProfileOrLogin(props)).toMatchSnapshot();
  });

  it('returns UserProfileNav', () => {
    props.profileInfo = true;
    expect(isProfileOrLogin(props)).toMatchSnapshot();
  });
});
