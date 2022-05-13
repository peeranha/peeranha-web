import {
  saveProfile,
  getProfileInfo,
} from '../profileManagement';

jest.setTimeout(20000);

const user = 'user1';
const profile = { displayName: 'test' };

xit('saveProfile test', async () => {
  const savedText = await saveProfile(user, profile);
  expect(savedText).toBeDefined();
});

xit('getProfileInfo test', async () => {
  const prof = await getProfileInfo(user);
  expect(typeof prof).toBe('object');
});

