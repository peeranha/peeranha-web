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

import Profile from 'containers/Profile';
import * as selectorsProfile from 'containers/Profile/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';

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

import { getBlob } from 'utils/profileManagement';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

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
      props.history.push('/no-access');
    }
  }

  componentWillUnmount() {
    return this.props.setDefaultReducerDispatch();
  }

  uploadImage = event => {
    try {
      const file = event.target.files[0];
      const reader = new window.FileReader();

      reader.onloadend = () =>
        this.props.uploadImageFileDispatch(reader.result);
      return reader.readAsArrayBuffer(file);
    } catch (err) {
      return err.message;
    }
  };

  getCroppedAvatar = async obj => {
    let value;

    if (obj) {
      const canvas = obj.getImage().toDataURL('image/jpeg', 0.5);
      const blob = await getBlob(canvas);
      value = this.props.saveImageChangesDispatch({
        blob,
        cachedProfileImg: window.URL.createObjectURL(blob),
      });
    }

    return value;
  };

  saveProfile = async val => {
    let value;
    const { match, blob } = this.props;
    const userKey = match.params.id;
    const profile = {
      ...this.props.profile,
      ipfs: {
        ...this.props.profile.ipfs,
        [DISPLAY_NAME_FIELD]: val.get(DISPLAY_NAME_FIELD),
        [POSITION_FIELD]: val.get(POSITION_FIELD),
        [COMPANY_FIELD]: val.get(COMPANY_FIELD),
        [ABOUT_FIELD]: val.get(ABOUT_FIELD),
      },
    };

    if (blob) {
      const reader = new window.FileReader();
      value = null;

      reader.onloadend = async () => {
        await this.props.saveProfileActionDispatch({
          userKey,
          profile,
          reader: reader.result,
        });
      };
      await reader.readAsArrayBuffer(blob);
    } else {
      value = await this.props.saveProfileActionDispatch({
        userKey,
        profile,
      });
    }

    return value;
  };

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
      getProfileInfoDispatch,
      citiesList,
    } = this.props;

    const sendProps = {
      uploadImage: this.uploadImage,
      getCroppedAvatar: this.getCroppedAvatar,
      clearImageChanges: clearImageChangesDispatch,
      chooseLocation: chooseLocationDispatch,
      getCitiesList: getCitiesListDispatch,
      cancelChanges: getProfileInfoDispatch,
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
  uploadImageFileDispatch: PropTypes.func.isRequired,
  saveImageChangesDispatch: PropTypes.func.isRequired,
  clearImageChangesDispatch: PropTypes.func.isRequired,
  getProfileInfoDispatch: PropTypes.func.isRequired,
  getCitiesListDispatch: PropTypes.func.isRequired,
  chooseLocationDispatch: PropTypes.func.isRequired,
  setDefaultReducerDispatch: PropTypes.func.isRequired,
  saveProfileActionDispatch: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  citiesList: PropTypes.array.isRequired,
  locale: PropTypes.string.isRequired,
  editingImgState: PropTypes.bool.isRequired,
  cachedProfileImg: PropTypes.string.isRequired,
  isProfileSaving: PropTypes.bool.isRequired,
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

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    uploadImageFileDispatch: res => dispatch(uploadImageFileAction(res)),
    saveImageChangesDispatch: res => dispatch(saveImageChanges(res)),
    clearImageChangesDispatch: () => dispatch(clearImageChanges()),
    getProfileInfoDispatch: () => dispatch(getProfileInfo()),
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
