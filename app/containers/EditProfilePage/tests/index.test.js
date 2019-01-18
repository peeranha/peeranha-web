import { uploadImage, getCroppedAvatar } from 'utils/imageManagement';
import { EditProfilePage } from '../index';

jest.mock('utils/profileManagement');

jest.mock('utils/imageManagement', () => ({
  uploadImage: jest.fn(),
  getCroppedAvatar: jest.fn(),
}));

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
  saveProfileActionDispatch: jest.fn(),
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

jest.setTimeout(10000);

const ev = {};

describe('<EditProfilePage>', () => {
  describe('componentWillUnmount', () => {
    it('test', () => {
      page.componentWillUnmount();
      expect(page.props.setDefaultReducerDispatch).toHaveBeenCalled();
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

  it('uploadImage', () => {
    page.uploadImage(ev);
    expect(uploadImage).toHaveBeenCalledWith(
      ev,
      page.props.uploadImageFileDispatch,
    );
  });

  it('getCroppedAvatar', () => {
    page.getCroppedAvatar(ev);
    expect(getCroppedAvatar).toHaveBeenCalledWith(
      ev,
      page.props.saveImageChangesDispatch,
    );
  });

  describe('render', () => {
    expect(page.render()).toMatchSnapshot();
  });

  describe('saveProfile method', () => {
    const newMap = new Map();

    it('case: @blob is null', async () => {
      page.props.blob = null;
      await page.saveProfile(newMap);
      expect(page.props.saveProfileActionDispatch).toHaveBeenCalled();
    });
  });
});
