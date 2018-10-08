/**
 *
 * Profile
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { translationMessages } from 'i18n';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import PropTypes from 'prop-types';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountInitializer/selectors';
import { getBlob } from 'utils/profileManagement';

import {
  DISPLAY_NAME_FIELD,
  POSITION_FIELD,
  COMPANY_FIELD,
  ABOUT_FIELD,
} from './constants';

import {
  getProfileInfo,
  uploadImageFileAction,
  editImage,
  clearImageChanges,
  saveImageChanges,
  saveProfileAction,
  getCitiesList,
  chooseLocation,
} from './actions';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import * as profileSelectors from './selectors';

import ProfileForm from './ProfileForm';
import Preloader from './Preloader';
import NoSuchUser from './NoSuchUser';
import Wrapper from './Wrapper';

/* eslint-disable react/prefer-stateless-function */
export class Profile extends React.Component {
  componentWillMount() {
    this.uploadImage = this.uploadImage.bind(this);
    this.getCroppedAvatar = this.getCroppedAvatar.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    Profile.saveProfile = Profile.saveProfile.bind(this);
    Profile.saveProfileActionDtch = this.props.saveProfileActionDtch.bind(this);
  }

  /*
   * @componentDidMount: getting info about user profile
   */

  componentDidMount() {
    const userKey = Profile.getUserKey(window.location.pathname);
    this.props.getProfileInfoDtch(userKey);
  }

  /*
   * @getCroppedAvatar: method works when you save image after file uploading
   * saved image stays outside of your profile while you will not save your profile 
   */

  async getCroppedAvatar(obj) {
    if (obj) {
      const canvas = obj.getImage().toDataURL('image/jpeg', 0.5);
      const blob = await getBlob(canvas);
      this.props.saveImageChangesDtch({
        blob,
        cashedProfileImg: window.URL.createObjectURL(blob),
      });
    }
  }

  /*
   * @saveProfile: method allows to save your profile
   */

  static async saveProfile(val) {
    let value;
    const userKey = Profile.getUserKey(window.location.pathname);
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

    if (this.props.blob) {
      const reader = new window.FileReader();
      reader.onloadend = async () => {
        value = await Profile.saveProfileActionDtch({
          userKey,
          profile,
          reader: reader.result,
        });
      };
      reader.readAsArrayBuffer(this.props.blob);
    } else {
      value = await Profile.saveProfileActionDtch({
        userKey,
        profile,
      });
    }

    return value;
  }

  /*
   * @uploadImage: method allows to upload image from your PC to IPFS
   */

  uploadImage(event) {
    try {
      const file = event.target.files[0];
      const reader = new window.FileReader();

      reader.onloadend = () => this.props.uploadImageFileDtch(reader.result);
      return reader.readAsArrayBuffer(file);
    } catch (err) {
      return err.message;
    }
  }

  /*
   * @getUserKey: method allows to get unique key from URL
   * this key gives us opportunity to know info about user
   * example: /users/user1/ --> got key: user1
   */

  static getUserKey(str) {
    let pathname = str.slice(1);

    if (pathname[pathname.length - 1] === '/') {
      pathname = pathname.slice(0, -1);
    }

    return pathname.split('/')[1];
  }

  render() {
    const {
      account,
      profile,
      loadingProfile,
      userKey,
      cashedProfileImg,
      editingImgState,
      editImageDtch,
      clearImageChangesDtch,
      chooseLocationDtch,
      getCitiesListDtch,
      citiesList,
      loadingSaveProfile,
      locale,
    } = this.props;

    const sendProps = {
      uploadImage: this.uploadImage,
      editImage: editImageDtch,
      clearImageChanges: clearImageChangesDtch,
      chooseLocation: chooseLocationDtch,
      getCitiesList: getCitiesListDtch,
      getCroppedAvatar: this.getCroppedAvatar,
      cancelChanges: this.componentDidMount,
      saveProfile: Profile.saveProfile,
      loadingSaveProfile,
      citiesList,
      cashedProfileImg,
      editingImgState,
      profile,
      translations: translationMessages[locale],
      isOwner: account.eosAccount === userKey,
    };

    const HelmetTitle = `${(profile.eos && profile.eos.display_name) ||
      translationMessages[locale][messages.wrongUser.id]} | ${
      translationMessages[locale][messages.profile.id]
    }`;

    return (
      <div className="container">
        <Helmet>
          <title>{HelmetTitle}</title>
          <meta
            name="description"
            content={
              translationMessages[locale][messages.profileDescription.id]
            }
          />
        </Helmet>
        {!loadingProfile && (
          <Wrapper>
            {profile.eos && <ProfileForm sendProps={sendProps} />}
            {!profile.eos && <NoSuchUser />}
          </Wrapper>
        )}
        {loadingProfile && <Preloader />}
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  userKey: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  cashedProfileImg: PropTypes.string.isRequired,
  blob: PropTypes.string.isRequired,
  citiesList: PropTypes.array.isRequired,
  editingImgState: PropTypes.bool.isRequired,
  loadingSaveProfile: PropTypes.bool.isRequired,
  loadingProfile: PropTypes.bool.isRequired,
  getProfileInfoDtch: PropTypes.func.isRequired,
  uploadImageFileDtch: PropTypes.func.isRequired,
  editImageDtch: PropTypes.func.isRequired,
  clearImageChangesDtch: PropTypes.func.isRequired,
  saveImageChangesDtch: PropTypes.func.isRequired,
  saveProfileActionDtch: PropTypes.func.isRequired,
  chooseLocationDtch: PropTypes.func.isRequired,
  getCitiesListDtch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  account: makeSelectAccount(),
  blob: profileSelectors.selectBlob(),
  userKey: profileSelectors.selectUserKey(),
  profile: profileSelectors.selectProfile(),
  loadingProfile: profileSelectors.selectLoadingProfile(),
  loadingImage: profileSelectors.selectLoadingImage(),
  loadingSaveProfile: profileSelectors.selectLoadingSaveProfile(),
  loadingGetCitiesList: profileSelectors.selectLoadingGetCitiesList(),
  errorLoadProfile: profileSelectors.selectErrorLoadProfile(),
  errorUploadImage: profileSelectors.selectErrorUploadImage(),
  cashedProfileImg: profileSelectors.selectCashedProfileImg(),
  editingImgState: profileSelectors.selectEditingImgState(),
  citiesList: profileSelectors.selectCitiesList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProfileInfoDtch: key => dispatch(getProfileInfo(key)),
    uploadImageFileDtch: file => dispatch(uploadImageFileAction(file)),
    editImageDtch: () => dispatch(editImage()),
    clearImageChangesDtch: () => dispatch(clearImageChanges()),
    saveImageChangesDtch: cvs => dispatch(saveImageChanges(cvs)),
    saveProfileActionDtch: res => dispatch(saveProfileAction(res)),
    getCitiesListDtch: str => dispatch(getCitiesList(str)),
    chooseLocationDtch: (id, city) => dispatch(chooseLocation(id, city)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'profile', reducer });
const withSaga = injectSaga({ key: 'profile', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Profile);
