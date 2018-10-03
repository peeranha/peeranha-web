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

import {
  makeSelectProfile,
  makeSelectLoadingProfile,
  makeSelectLoadingImage,
  makeSelectErrorProfile,
  makeSelectUserKey,
  makeSelectImageSrc,
  makeSelectErrorUploadImage,
} from './selectors';

import { getProfileInformation, uploadImageFile } from './actions';

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
  }

  componentDidMount() {
    const userKey = this.getUserKey();
    this.props.getProfileInformationDispatch(userKey);
  }

  getUserKey() {
    const { history } = this.props;
    let pathname = history.location.pathname.slice(1);

    if (pathname[pathname.length - 1] === '/') {
      pathname = pathname.slice(0, -1);
    }

    return pathname.split('/')[1];
  }

  uploadImage(event) {
    event.stopPropagation();
    event.preventDefault();

    const file = event.target.files[0];
    const reader = new window.FileReader();

    reader.onloadend = () => this.props.uploadImageFileDispatch(reader.result);
    reader.readAsArrayBuffer(file);
  }

  render() {
    const {
      account,
      profile,
      errorProfile,
      errorUploadImage,
      loadingProfile,
      loadingImage,
      userKey,
      imageSrc,
    } = this.props;

    console.log(
      account,
      profile,
      errorProfile,
      errorUploadImage,
      loadingProfile,
      loadingImage,
      userKey,
      imageSrc,
    );

    return (
      <div className="container">
        {!loadingProfile && (
          <Wrapper>
            {account.eosAccount === userKey &&
              profile && <EditableProfileForm />}
            {account.eosAccount !== userKey &&
              profile && <NotEditableProfileForm />}
            {!profile && <NoSuchUser />}
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
  loadingImage: PropTypes.bool.isRequired,
  errorProfile: PropTypes.string.isRequired,
  errorUploadImage: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  userKey: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  getProfileInformationDispatch: PropTypes.func.isRequired,
  uploadImageFileDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
  loadingProfile: makeSelectLoadingProfile(),
  loadingImage: makeSelectLoadingImage(),
  errorProfile: makeSelectErrorProfile(),
  errorUploadImage: makeSelectErrorUploadImage(),
  account: makeSelectAccount(),
  userKey: makeSelectUserKey(),
  imageSrc: makeSelectImageSrc(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProfileInformationDispatch: userKey =>
      dispatch(getProfileInformation(userKey)),
    uploadImageFileDispatch: file => dispatch(uploadImageFile(file)),
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
