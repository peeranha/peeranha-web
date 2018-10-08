import {
  saveProfile,
  uploadImageFile,
  getProfileInfo,
  getCitiesList,
} from '../profileManagement';

jest.setTimeout(20000);

const owner = 'user1';
const profile = { display_name: 'test' };

xit('saveProfile test', async () => {
  const savedText = await saveProfile(owner, profile);
  expect(savedText).toBeDefined();
});

xit('uploadImageFile test', async () => {
  const hashCode = 'QmdSUUYvWCEuJ1qWFZ4F1arVKDX2CZFhk3gd9G4ovmWChn';
  const savedText = await uploadImageFile(owner);
  expect(savedText).toEqual(hashCode);
});

xit('getProfileInfo test', async () => {
  const prof = await getProfileInfo(owner);
  expect(typeof prof.eos).toBe('object');
});

xit('getCitiesList test', async () => {
  const search = 'Chicago';
  const citiesList = await getCitiesList(search);
  expect(typeof citiesList[0].name).toBe('string');
});
