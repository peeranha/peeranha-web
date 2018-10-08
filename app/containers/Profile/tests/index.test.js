import { Profile } from '../index';

describe('<Profile />', () => {
  it('Profile - method getUserKey', () => {
    const user = 'user1';
    expect(Profile.getUserKey(`/users/${user}/`)).toEqual(user);
    expect(Profile.getUserKey(`/users/${user}`)).toEqual(user);
  });

  it('Profile - method saveProfile', () => {
    const valMap = new Map();

    Profile.props = {
      blob: new Blob(),
      profile: {
        ipfs: {},
      },
    };
    Profile.saveProfileActionDtch = jest.fn().mockImplementation(() => {});

    expect(typeof Profile.saveProfile(valMap)).toBe('object');
  });
});
