import { EditProfilePage } from '../index';

const page = new EditProfilePage();
page.props = {
  blob: null,
  profile: {},
  match: {
    params: {
      id: '',
    },
  },
};

describe('<EditProfilePage>', () => {
  describe('saveProfile method', () => {
    it('case: @blob is null', async () => {
      const newMap = new Map();
      const message = 'object is saved';

      page.props.saveProfileActionDispatch = () => message;
      expect(await page.saveProfile(newMap)).toEqual(message);
    });
  });

  describe('getCroppedAvatar(@param) method', () => {
    it('@param === false', async () => {
      expect(await page.getCroppedAvatar(false)).toBeFalsy();
    });
  });

  describe('uploadImage(@param) method', () => {
    it('case 1: no @param', async () => {
      const errorMsg = `Cannot read property 'target' of undefined`;
      expect(await page.uploadImage()).toBe(errorMsg);
    });

    it('case 2: no files', async () => {
      const errorMsg = `Failed to execute 'readAsArrayBuffer' on 'FileReader': parameter 1 is not of type 'Blob'.`;
      const ev = {
        target: {
          files: [],
        },
      };
      expect(await page.uploadImage(ev)).toBe(errorMsg);
    });

    it('case 3: new Blob', async () => {
      const ev = {
        target: {
          files: [new Blob()],
        },
      };
      page.props.blob = new Blob();
      expect(await page.uploadImage(ev)).toBe(undefined);
    });
  });
});
