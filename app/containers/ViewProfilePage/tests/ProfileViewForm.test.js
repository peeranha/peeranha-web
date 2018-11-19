import { LOCATION_FIELD } from 'containers/Profile/constants';
import ProfileViewForm from '../ProfileViewForm';

describe('ProfileViewForm test', () => {
  const props = {
    account: '',
    match: {
      params: {
        id: 'user1',
      },
    },
    profile: {
      profile: {
        [LOCATION_FIELD]: {},
      },
    },
  };

  it('case 1: @profile.ipfs_avatar is true', () => {
    props.profile.ipfs_avatar = true;
    expect(ProfileViewForm(props)).toMatchSnapshot();
  });

  it('case 2: @profile.ipfs_avatar is false', () => {
    props.profile.ipfs_avatar = false;
    expect(ProfileViewForm(props)).toMatchSnapshot();
  });

  it('case 3: isOwner is true', () => {
    props.account = 'user';
    expect(ProfileViewForm(props)).toMatchSnapshot();
  });

  it('case 4: isOwner is false', () => {
    props.account = 'user2';
    expect(ProfileViewForm(props)).toMatchSnapshot();
  });
});
