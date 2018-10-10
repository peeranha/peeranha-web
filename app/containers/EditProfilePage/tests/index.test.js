import React from 'react';
import { shallow } from 'enzyme';

import { EditProfilePage } from '../index';

describe('<EditProfilePage>', () => {
  describe('saveProfile method', () => {
    it('case: @blob is null', async () => {
      const wrapper = shallow(<EditProfilePage />);
      const newMap = new Map();
      const message = 'object is saved';

      wrapper.instance().props = {
        saveProfileActionDispatch: () => message,
        blob: null,
        match: {
          params: { id: '' },
        },
        profile: {
          ipfs: {},
        },
      };

      expect(await wrapper.instance().saveProfile(newMap)).toEqual(message);
    });
  });

  describe('getCroppedAvatar(@param) method', () => {
    const wrapper = shallow(<EditProfilePage />);
    it('@param === false', async () => {
      expect(await wrapper.instance().getCroppedAvatar(false)).toBeFalsy();
    });
  });

  describe('uploadImage(@param) method', () => {
    const wrapper = shallow(<EditProfilePage />);

    it('case 1: no @param', async () => {
      const errorMsg = `Cannot read property 'target' of undefined`;
      expect(await wrapper.instance().uploadImage()).toBe(errorMsg);
    });

    it('case 2: no files', async () => {
      const errorMsg = `Failed to execute 'readAsArrayBuffer' on 'FileReader': parameter 1 is not of type 'Blob'.`;
      const ev = {
        target: {
          files: [],
        },
      };
      expect(await wrapper.instance().uploadImage(ev)).toBe(errorMsg);
    });

    it('case 3: new Blob', async () => {
      const ev = {
        target: {
          files: [new Blob()],
        },
      };
      expect(await wrapper.instance().uploadImage(ev)).toBe(undefined);
    });
  });
});
