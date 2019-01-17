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
import { translationMessages } from 'i18n';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import * as selectorsProfile from 'containers/Profile/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import Profile from 'containers/Profile';

import {
  DISPLAY_NAME_FIELD,
  POSITION_FIELD,
  COMPANY_FIELD,
  ABOUT_FIELD,
} from 'containers/Profile/constants';

import {
  getProfileInfo,
  getCitiesList,
  chooseLocation,
} from 'containers/Profile/actions';

import * as routes from 'routes-config';
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
export class EditProfilePage extends React.Component {
  componentWillUpdate(props) {
    const { account, match } = props;

    if (account !== match.params.id) {
      props.history.push(routes.no_access());
    }
  }

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

  cancelChanges = () =>
    this.props.cancelChangesDispatch(
      this.props.match.params.id,
      this.props.account,
    );

  render() {
    const {
      profile,
      locale,
      match,
      editingImgState,
      isProfileSaving,
      cachedProfileImg,
      clearImageChangesDispatch,
      getCitiesListDispatch,
      chooseLocationDispatch,
      citiesList,
    } = this.props;

    const sendProps = {
      uploadImage: this.uploadImage,
      getCroppedAvatar: this.getCroppedAvatar,
      clearImageChanges: clearImageChangesDispatch,
      chooseLocation: chooseLocationDispatch,
      getCitiesList: getCitiesListDispatch,
      cancelChanges: this.cancelChanges,
      saveProfile: this.saveProfile,
      isProfileSaving,
      citiesList,
      cachedProfileImg,
      editingImgState,
      profile,
      match,
      translations: translationMessages[locale],
    };

    return (
      <Profile userId={match.params.id}>
        <ProfileEditForm sendProps={sendProps} />
      </Profile>
    );
  }
}

EditProfilePage.propTypes = {
  uploadImageFileDispatch: PropTypes.func,
  saveImageChangesDispatch: PropTypes.func,
  clearImageChangesDispatch: PropTypes.func,
  cancelChangesDispatch: PropTypes.func,
  getCitiesListDispatch: PropTypes.func,
  chooseLocationDispatch: PropTypes.func,
  setDefaultReducerDispatch: PropTypes.func,
  saveProfileActionDispatch: PropTypes.func,
  profile: PropTypes.object,
  match: PropTypes.object,
  citiesList: PropTypes.array,
  locale: PropTypes.string,
  editingImgState: PropTypes.bool,
  cachedProfileImg: PropTypes.string,
  account: PropTypes.string,
  isProfileSaving: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  profile: selectorsProfile.selectProfile(),
  citiesList: selectorsProfile.selectCitiesList(),
  locale: makeSelectLocale(),
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
    cancelChangesDispatch: (userKey, account) =>
      dispatch(getProfileInfo(userKey, account)),
    getCitiesListDispatch: res => dispatch(getCitiesList(res)),
    chooseLocationDispatch: (id, city) => dispatch(chooseLocation(id, city)),
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
