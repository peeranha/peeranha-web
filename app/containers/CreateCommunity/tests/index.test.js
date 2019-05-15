import { fromJS } from 'immutable';
import { uploadImage, getCroppedAvatar } from 'utils/imageManagement';

import { CreateCommunity } from '../index';

import {
  COMM_NAME_FIELD,
  COMM_SHORT_DESCRIPTION_FIELD,
  COMM_MAIN_DESCRIPTION_FIELD,
  TAG_NAME_FIELD,
  TAG_DESCRIPTION_FIELD,
  LANGUAGE_FIELD,
} from '../constants';

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
    const values = {
      [LANGUAGE_FIELD]: { value: 'en' },
      [COMM_NAME_FIELD]: COMM_NAME_FIELD,
      [COMM_SHORT_DESCRIPTION_FIELD]: COMM_SHORT_DESCRIPTION_FIELD,
      [COMM_MAIN_DESCRIPTION_FIELD]: COMM_MAIN_DESCRIPTION_FIELD,
      tags: {
        0: {
          [TAG_NAME_FIELD]: TAG_NAME_FIELD,
          [TAG_DESCRIPTION_FIELD]: TAG_DESCRIPTION_FIELD,
        },
      },
    };

    const obj0 = fromJS(values);
    const obj1 = jest.fn();
    const obj2 = {
      reset: jest.fn(),
    };

    const community = {
      avatar: cmp.props.cachedImgHash,
      name: values[COMM_NAME_FIELD],
      language: values[LANGUAGE_FIELD].value,
      description: values[COMM_SHORT_DESCRIPTION_FIELD],
      main_description: values[COMM_MAIN_DESCRIPTION_FIELD],
      tags: [{ name: TAG_NAME_FIELD, description: TAG_DESCRIPTION_FIELD }],
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
