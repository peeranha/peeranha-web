import { AvatarField } from '../AvatarField';

const props = {
  input: {},
  size: 16,
  disabled: false,
  meta: {},
  editingImgState: false,
  cachedProfileImg: 'cached',
  ipfsAvatar: 'avatar',
  getCroppedAvatar: jest.fn(),
  uploadImage: jest.fn(),
  clearImageChanges: jest.fn(),
};

describe('AvatarField', () => {
  it('test', () => {
    expect(AvatarField(props)).toMatchSnapshot();
  });
});
