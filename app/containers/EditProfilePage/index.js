/**
 *
 * EditProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import * as selectorsProfile from 'containers/Profile/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import Profile from 'containers/Profile';
import UserNavigation from 'components/UserNavigation';
import Base from 'components/Base';

import {
  DISPLAY_NAME_FIELD,
  POSITION_FIELD,
  COMPANY_FIELD,
  ABOUT_FIELD,
  LOCATION_FIELD,
} from 'containers/Profile/constants';

import { uploadImage, getCroppedAvatar } from 'utils/imageManagement';

import * as editProfileSelectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  uploadImageFileAction,
  saveImageChanges,
  clearImageChanges,
  setDefaultReducer,
  saveProfileAction,
} from './actions';

import ProfileEditForm from './ProfileEditForm';

/* eslint-disable react/prefer-stateless-function */
export class EditProfilePage extends React.PureComponent {
  componentWillUnmount() {
    this.props.setDefaultReducerDispatch();
  }

  uploadImage = event => {
    uploadImage(event, this.props.uploadImageFileDispatch);
  };

  getCroppedAvatar = obj => {
    getCroppedAvatar(obj, this.props.saveImageChangesDispatch);
  };

  saveProfile = async val => {
    const { match, blob } = this.props;
    const userKey = match.params.id;

    const profile = {
      ...this.props.profile.profile,
      [DISPLAY_NAME_FIELD]: val.get(DISPLAY_NAME_FIELD),
      [POSITION_FIELD]: val.get(POSITION_FIELD),
      [COMPANY_FIELD]: val.get(COMPANY_FIELD),
      [ABOUT_FIELD]: val.get(ABOUT_FIELD),
      [LOCATION_FIELD]: val.get(LOCATION_FIELD)
        ? val.get(LOCATION_FIELD).value
        : '',
    };

    if (blob) {
      const reader = new window.FileReader();

      reader.onloadend = () => {
        this.props.saveProfileActionDispatch({
          userKey,
          profile,
          reader: reader.result,
        });
      };

      reader.readAsArrayBuffer(blob);
    } else {
      this.props.saveProfileActionDispatch({
        userKey,
        profile,
      });
    }
  };

  render() {
    const {
      profile,
      match,
      account,
      editingImgState,
      isProfileSaving,
      cachedProfileImg,
      clearImageChangesDispatch,
    } = this.props;

    const sendProps = {
      uploadImage: this.uploadImage,
      getCroppedAvatar: this.getCroppedAvatar,
      clearImageChanges: clearImageChangesDispatch,
      saveProfile: this.saveProfile,
      isProfileSaving,
      cachedProfileImg,
      editingImgState,
      profile,
    };

    return (
      <Profile userId={match.params.id}>
        <UserNavigation userId={match.params.id} account={account} />
        <Base position="bottom">
          <ProfileEditForm {...sendProps} />
        </Base>
      </Profile>
    );
  }
}

EditProfilePage.propTypes = {
  uploadImageFileDispatch: PropTypes.func,
  saveImageChangesDispatch: PropTypes.func,
  clearImageChangesDispatch: PropTypes.func,
  setDefaultReducerDispatch: PropTypes.func,
  saveProfileActionDispatch: PropTypes.func,
  profile: PropTypes.object,
  match: PropTypes.object,
  account: PropTypes.string,
  editingImgState: PropTypes.bool,
  cachedProfileImg: PropTypes.string,
  isProfileSaving: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  profile: selectorsProfile.selectProfile(),
  account: makeSelectAccount(),
  editingImgState: editProfileSelectors.selectEditingImgState(),
  cachedProfileImg: editProfileSelectors.selectCachedProfileImg(),
  blob: editProfileSelectors.selectBlob(),
  isProfileSaving: editProfileSelectors.selectIsProfileSaving(),
});

/* istanbul ignore next */
export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    uploadImageFileDispatch: res => dispatch(uploadImageFileAction(res)),
    saveImageChangesDispatch: res => dispatch(saveImageChanges(res)),
    clearImageChangesDispatch: () => dispatch(clearImageChanges()),
    setDefaultReducerDispatch: () => dispatch(setDefaultReducer()),
    saveProfileActionDispatch: res => dispatch(saveProfileAction(res)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'editProfileReducer', reducer });
const withSaga = injectSaga({ key: 'editProfileReducer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EditProfilePage);
