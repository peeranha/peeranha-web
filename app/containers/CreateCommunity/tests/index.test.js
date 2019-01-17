import { uploadImage, getCroppedAvatar } from 'utils/imageManagement';

import { CreateCommunity } from '../index';
import { NAME_FIELD, DESCRIPTION_FIELD } from '../constants';

const cmp = new CreateCommunity();

jest.mock('utils/imageManagement', () => ({
  uploadImage: jest.fn(),
  getCroppedAvatar: jest.fn(),
}));

cmp.props = {
  setDefaultStoreDispatch: jest.fn(),
  createCommunityDispatch: jest.fn(),
  clearImageChangesDispatch: jest.fn(),
  saveImageChangesDispatch: jest.fn(),
  uploadImageFileDispatch: jest.fn(),
  locale: 'en',
  editingImgState: false,
  createCommunityLoading: false,
  cachedProfileImg: '',
  cachedImgHash: '',
};

const ev = {};

describe('<CreateCommunity />', () => {
  it('componentWillUnmount', () => {
    expect(cmp.props.setDefaultStoreDispatch).toHaveBeenCalledTimes(0);
    cmp.componentWillUnmount();
    expect(cmp.props.setDefaultStoreDispatch).toHaveBeenCalledTimes(1);
  });

  it('createCommunity', () => {
    const obj0 = new Map();
    const obj1 = jest.fn();
    const obj2 = {
      reset: jest.fn(),
    };

    const community = {
      avatar: cmp.props.cachedImgHash,
      name: obj0.get(NAME_FIELD),
      description: obj0.get(DESCRIPTION_FIELD),
    };

    cmp.createCommunity(obj0, obj1, obj2);
    expect(cmp.props.createCommunityDispatch).toHaveBeenCalledWith(
      community,
      obj2.reset,
    );
  });

  it('uploadImage', () => {
    cmp.uploadImage(ev);
    expect(uploadImage).toHaveBeenCalledWith(
      ev,
      cmp.props.uploadImageFileDispatch,
    );
  });

  it('getCroppedAvatar', () => {
    cmp.getCroppedAvatar(ev);
    expect(getCroppedAvatar).toHaveBeenCalledWith(
      ev,
      cmp.props.saveImageChangesDispatch,
    );
  });

  it('render', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
