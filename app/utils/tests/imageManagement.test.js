import { uploadImage, getCroppedAvatar } from '../imageManagement';

window.fetch = jest.fn().mockImplementation(() => ({
  blob: jest.fn(),
}));

window.URL = {
  createObjectURL: jest.fn(),
};

const ev = {
  target: {
    files: [],
  },
};

const callback = jest.fn();

describe('uploadImage', () => {
  it('test', async () => {
    const step = await uploadImage(ev, callback);
    expect(step).toBe(undefined);
  });
});

describe('getCroppedAvatar', () => {
  const obj = {
    getImage: () => ({
      toDataURL: jest.fn(),
    }),
  };

  it('test', async () => {
    const step = await getCroppedAvatar(obj, callback);
    expect(step).toBe(undefined);
  });
});
