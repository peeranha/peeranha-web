/**
 *
 * CreateCommunity
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getBlob } from 'utils/profileManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import Wrapper from 'containers/Profile/Wrapper';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  uploadImageFileAction,
  saveImageChanges,
  clearImageChanges,
  createCommunity,
  setDafaultStore,
} from './actions';

import { NAME_FIELD, DESCRIPTION_FIELD } from './constants';

import CreateCommunityForm from './CreateCommunityForm';

/* eslint-disable react/prefer-stateless-function */
export class CreateCommunity extends React.Component {
  componentWillUnmount() {
    this.props.setDafaultStoreDispatch();
  }

  createCommunity = (...args) => {
    const { reset } = args[2];
    const community = {
      avatar: this.props.cachedImgHash,
      name: args[0].get(NAME_FIELD),
      description: args[0].get(DESCRIPTION_FIELD),
    };

    this.props.createCommunityDispatch(community, reset);
  };

  /* eslint no-empty: 0 */
  uploadImage = event => {
    try {
      const file = event.target.files[0];
      const reader = new window.FileReader();

      reader.onloadend = () =>
        this.props.uploadImageFileDispatch(reader.result);

      reader.readAsArrayBuffer(file);
    } catch (err) {}
  };

  getCroppedAvatar = async obj => {
    if (obj) {
      const canvas = obj.getImage().toDataURL('image/jpeg', 0.5);
      const blob = await getBlob(canvas);

      this.props.saveImageChangesDispatch({
        blob,
        cachedProfileImg: window.URL.createObjectURL(blob),
      });
    }
  };

  render() {
    const sendProps = {
      createCommunity: this.createCommunity,
      uploadImage: this.uploadImage,
      getCroppedAvatar: this.getCroppedAvatar,
      clearImageChanges: this.props.clearImageChangesDispatch,
      editingImgState: this.props.editingImgState,
      cachedProfileImg: this.props.cachedProfileImg,
      createCommunityLoading: this.props.createCommunityLoading,
      translations: translationMessages[this.props.locale],
      profile: {},
    };

    return (
      <div className="container">
        <Helmet>
          <title>{sendProps.translations[messages.title.id]}</title>
          <meta
            name="description"
            content={sendProps.translations[messages.description.id]}
          />
        </Helmet>

        <Wrapper>
          <CreateCommunityForm {...sendProps} />
        </Wrapper>
      </div>
    );
  }
}

CreateCommunity.propTypes = {
  setDafaultStoreDispatch: PropTypes.func.isRequired,
  createCommunityDispatch: PropTypes.func.isRequired,
  clearImageChangesDispatch: PropTypes.func.isRequired,
  saveImageChangesDispatch: PropTypes.func.isRequired,
  uploadImageFileDispatch: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  editingImgState: PropTypes.bool.isRequired,
  createCommunityLoading: PropTypes.bool.isRequired,
  cachedProfileImg: PropTypes.string.isRequired,
  cachedImgHash: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  editingImgState: selectors.selectEditingImgState(),
  cachedProfileImg: selectors.selectCachedProfileImg(),
  createCommunityLoading: selectors.selectCreateCommunityLoading(),
  cachedImgHash: selectors.selectCachedImgHash(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    uploadImageFileDispatch: res => dispatch(uploadImageFileAction(res)),
    saveImageChangesDispatch: res => dispatch(saveImageChanges(res)),
    clearImageChangesDispatch: () => dispatch(clearImageChanges()),
    createCommunityDispatch: (comm, reset) =>
      dispatch(createCommunity(comm, reset)),
    setDafaultStoreDispatch: () => dispatch(setDafaultStore()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'createCommunity', reducer });
const withSaga = injectSaga({ key: 'createCommunity', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CreateCommunity);
