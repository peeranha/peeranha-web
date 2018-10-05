/**
 *
 * Profile
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import PropTypes from 'prop-types';

import { makeSelectAccount } from 'containers/AccountInitializer/selectors';
import { getBlob } from 'utils/profileManagement';

import {
  makeSelectProfile,
  makeSelectLoadingProfile,
  makeSelectLoadingImage,
  makeSelectErrorProfile,
  makeSelectErrorUploadImage,
  makeSelectUserKey,
  makeSelectCashedProfileImg,
  makeSelectEditImageStatus,
  makeSelectBlob,
  makeSelectLoadingSaveProfile,
  makeSelectLocationList,
  makeSelectLoadingGetLocationList,
} from './selectors';

import {
  DISPLAY_NAME_FIELD,
  POSITION_FIELD,
  COMPANY_FIELD,
  ABOUT_FIELD,
} from './constants';

import {
  getProfileInformation,
  uploadImageFileAction,
  editImage,
  clearImageChanges,
  saveImageChanges,
  saveProfileAction,
  getLocationListAction,
  cityChoiceAction,
} from './actions';

import reducer from './reducer';
import saga from './saga';

import EditableProfileForm from './EditableProfileForm';
import NotEditableProfileForm from './NotEditableProfileForm';
import Preloader from './Preloader';
import NoSuchUser from './NoSuchUser';
import Wrapper from './Wrapper';

/* eslint-disable react/prefer-stateless-function */
export class Profile extends React.Component {
  componentWillMount() {
    this.uploadImage = this.uploadImage.bind(this);
    this.getCroppedAvatar = this.getCroppedAvatar.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const userKey = this.getUserKey();
    this.props.getProfileInformationDispatch(userKey);
  }

  async getCroppedAvatar(obj) {
    if (obj) {
      const canvas = obj.getImage().toDataURL('image/jpeg', 0.5);
      const blob = await getBlob(canvas);
      this.props.saveImageChangesDispatch({
        blob,
        cashedProfileImg: window.URL.createObjectURL(blob),
      });
    }
  }

  saveProfile(val) {
    const userKey = this.getUserKey();
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
      reader.onloadend = () => {
        this.props.saveProfileActionDispatch({
          userKey,
          profile,
          reader: reader.result,
        });
      };
      reader.readAsArrayBuffer(this.props.blob);
    } else {
      this.props.saveProfileActionDispatch({
        userKey,
        profile,
      });
    }
  }

  uploadImage(event) {
    try {
      const file = event.target.files[0];
      const reader = new window.FileReader();

      reader.onloadend = () =>
        this.props.uploadImageFileDispatch(reader.result);
      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.log(err);
    }
  }

  getUserKey() {
    const { history } = this.props;
    let pathname = history.location.pathname.slice(1);

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
      editImageStatus,
      editImageDispatch,
      clearImageChangesDispatch,
      cityChoiceActionDispatch,
      getLocationListDispatch,
      locationList,
      loadingSaveProfile,
    } = this.props;

    const sendProps = {
      uploadImage: this.uploadImage,
      editImage: editImageDispatch,
      clearImageChanges: clearImageChangesDispatch,
      cityChoiceAction: cityChoiceActionDispatch,
      getLocation: getLocationListDispatch,
      getCroppedAvatar: this.getCroppedAvatar,
      cancelChanges: this.componentDidMount,
      saveProfile: this.saveProfile,
      loadingSaveProfile,
      locationList,
      cashedProfileImg,
      editImageStatus,
      profile,
    };
    console.log(profile);
    return (
      <div className="container">
        {!loadingProfile && (
          <Wrapper>
            {account.eosAccount === userKey &&
              profile.eos && <EditableProfileForm sendProps={sendProps} />}
            {account.eosAccount !== userKey &&
              profile.eos && <NotEditableProfileForm />}
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
  history: PropTypes.object.isRequired,
  loadingProfile: PropTypes.bool.isRequired,
  account: PropTypes.object.isRequired,
  userKey: PropTypes.string.isRequired,
  cashedProfileImg: PropTypes.string.isRequired,
  blob: PropTypes.string.isRequired,
  getProfileInformationDispatch: PropTypes.func.isRequired,
  uploadImageFileDispatch: PropTypes.func.isRequired,
  editImageDispatch: PropTypes.func.isRequired,
  clearImageChangesDispatch: PropTypes.func.isRequired,
  saveImageChangesDispatch: PropTypes.func.isRequired,
  saveProfileActionDispatch: PropTypes.func.isRequired,
  cityChoiceActionDispatch: PropTypes.func.isRequired,
  getLocationListDispatch: PropTypes.func.isRequired,
  editImageStatus: PropTypes.func.isRequired,
  locationList: PropTypes.array.isRequired,
  loadingSaveProfile: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
  loadingProfile: makeSelectLoadingProfile(),
  loadingImage: makeSelectLoadingImage(),
  errorProfile: makeSelectErrorProfile(),
  errorUploadImage: makeSelectErrorUploadImage(),
  account: makeSelectAccount(),
  userKey: makeSelectUserKey(),
  cashedProfileImg: makeSelectCashedProfileImg(),
  editImageStatus: makeSelectEditImageStatus(),
  blob: makeSelectBlob(),
  loadingSaveProfile: makeSelectLoadingSaveProfile(),
  locationList: makeSelectLocationList(),
  loadingGetLocationList: makeSelectLoadingGetLocationList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProfileInformationDispatch: userKey =>
      dispatch(getProfileInformation(userKey)),
    uploadImageFileDispatch: file => dispatch(uploadImageFileAction(file)),
    editImageDispatch: () => dispatch(editImage()),
    clearImageChangesDispatch: () => dispatch(clearImageChanges()),
    saveImageChangesDispatch: cvs => dispatch(saveImageChanges(cvs)),
    saveProfileActionDispatch: res => dispatch(saveProfileAction(res)),
    getLocationListDispatch: str => dispatch(getLocationListAction(str)),
    cityChoiceActionDispatch: (id, city) =>
      dispatch(cityChoiceAction(id, city)),
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
