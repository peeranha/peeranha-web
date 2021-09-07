import {
  saveProfile,
  uploadImageFile,
  getProfileInfo,
  getCitiesList,
} from '../profileManagement';

jest.setTimeout(20000);

const user = 'user1';
const profile = { displayName: 'test' };

xit('saveProfile test', async () => {
  const savedText = await saveProfile(user, profile);
  expect(savedText).toBeDefined();
});

xit('uploadImageFile test', async () => {
  const hashCode = 'QmdSUUYvWCEuJ1qWFZ4F1arVKDX2CZFhk3gd9G4ovmWChn';
  const savedText = await uploadImageFile(user);
  expect(savedText).toEqual(hashCode);
});

xit('getProfileInfo test', async () => {
  const prof = await getProfileInfo(user);
  expect(typeof prof).toBe('object');
});

xit('getCitiesList test', async () => {
  const search = 'Chicago';
  const citiesList = await getCitiesList(search);
  expect(typeof citiesList[0].name).toBe('string');
});
