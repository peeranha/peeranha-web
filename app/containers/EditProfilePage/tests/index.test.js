import { getBlob } from 'utils/imageManagement';
import { EditProfilePage, mapDispatchToProps } from '../index';

jest.mock('utils/profileManagement');
getBlob.mockImplementation(() => null);

const page = new EditProfilePage();
page.props = {
  account: 'user',
  locale: 'en',
  editingImgState: false,
  isProfileSaving: false,
  cachedProfileImg: null,
  clearImageChangesDispatch: jest.fn(),
  uploadImageFileDispatch: jest.fn(),
  getCitiesListDispatch: jest.fn(),
  chooseLocationDispatch: jest.fn(),
  getProfileInfoDispatch: jest.fn(),
  setDefaultReducerDispatch: jest.fn(),
  citiesList: [],
  blob: null,
  profile: {},
  history: {
    push: jest.fn(),
  },
  match: {
    params: {
      id: '',
    },
  },
};

describe('<EditProfilePage>', () => {
  describe('componentWillUnmount', () => {
    const status = 'setDefaultReducerDispatch';
    page.props.setDefaultReducerDispatch = jest
      .fn()
      .mockImplementation(() => status);

    it('returns @status', () => {
      expect(page.componentWillUnmount()).toBe(status);
    });
  });

  describe('componentWillUpdate', () => {
    const { push } = page.props.history;

    it('account === match.params.id', async () => {
      page.props.account = 'user2';
      page.props.match.params.id = 'user2';

      expect(push).toHaveBeenCalledTimes(0);
      await page.componentWillUpdate(page.props);
      expect(push).toHaveBeenCalledTimes(0);
    });

    it('account !== match.params.id', async () => {
      page.props.account = 'user2';
      page.props.match.params.id = 'user1';

      expect(push).toHaveBeenCalledTimes(0);
      await page.componentWillUpdate(page.props);
      expect(push).toHaveBeenCalledTimes(1);
    });
  });

  describe('render', () => {
    expect(page.render()).toMatchSnapshot();
  });

  describe('mapDispatchToProps', () => {
    it('mapDispatchToProps test', () => {
      const test = 'test';
      const obj = {};
      const dispatch = () => test;

      expect(typeof mapDispatchToProps(dispatch) === 'object').toBe(true);
      expect(mapDispatchToProps(dispatch).dispatch).toBe(dispatch);
      expect(mapDispatchToProps(dispatch).uploadImageFileDispatch(obj)).toBe(
        test,
      );
      expect(mapDispatchToProps(dispatch).saveImageChangesDispatch(obj)).toBe(
        test,
      );
      expect(mapDispatchToProps(dispatch).clearImageChangesDispatch()).toBe(
        test,
      );
      expect(mapDispatchToProps(dispatch).getCitiesListDispatch(obj)).toBe(
        test,
      );
      expect(mapDispatchToProps(dispatch).chooseLocationDispatch(obj)).toBe(
        test,
      );
      expect(mapDispatchToProps(dispatch).setDefaultReducerDispatch()).toBe(
        test,
      );
      expect(mapDispatchToProps(dispatch).saveProfileActionDispatch(obj)).toBe(
        test,
      );
    });
  });

  describe('saveProfile method', () => {
    const newMap = new Map();
    it('blob true', async () => {
      const reader = new window.FileReader();
      page.props.blob = new Blob();
      page.props.saveProfileActionDispatch = jest.fn();
      reader.readAsArrayBuffer = jest.fn();

      expect(await page.saveProfile(newMap)).toBe(null);
    });
    it('case: @blob is null', async () => {
      const message = 'object is saved';

      page.props.saveProfileActionDispatch = () => message;
      page.props.blob = null;
      expect(await page.saveProfile(newMap)).toEqual(message);
    });
  });

  describe('getCroppedAvatar(@param) method', () => {
    it('@param === false', async () => {
      expect(await page.getCroppedAvatar(false)).toBeFalsy();
    });

    it('@param === true', async () => {
      const saveImageChangesDispatch = jest.fn();
      const obj = {
        getImage: () => ({
          toDataURL: () => ({}),
        }),
      };
      window.URL.createObjectURL = () => null;
      page.props.saveImageChangesDispatch = saveImageChangesDispatch;

      expect(saveImageChangesDispatch).toHaveBeenCalledTimes(0);
      await page.getCroppedAvatar(obj);
      expect(saveImageChangesDispatch).toHaveBeenCalledTimes(1);
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
