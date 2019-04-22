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

import { uploadImage, getCroppedAvatar } from 'utils/imageManagement';

import Base from 'components/Base/BaseRounded';
import BaseTransparent from 'components/Base/BaseTransparent';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  uploadImageFileAction,
  saveImageChanges,
  clearImageChanges,
  createCommunity,
  setDefaultStore,
} from './actions';

import {
  COMM_NAME_FIELD,
  COMM_SHORT_DESCRIPTION_FIELD,
  COMM_MAIN_DESCRIPTION_FIELD,
} from './constants';

import Form from './Form';
import Header from './Header';
import Tips from './Tips';

/* eslint-disable react/prefer-stateless-function */
export class CreateCommunity extends React.PureComponent {
  componentWillUnmount() {
    this.props.setDefaultStoreDispatch();
  }

  createCommunity = (...args) => {
    const { reset } = args[2];
    const values = args[0].toJS();

    const community = {
      avatar: this.props.cachedImgHash,
      name: values[COMM_NAME_FIELD],
      description: values[COMM_SHORT_DESCRIPTION_FIELD],
      main_description: values[COMM_MAIN_DESCRIPTION_FIELD],
      tags: values.tags,
    };

    this.props.createCommunityDispatch(community, reset);
  };

  uploadImage = event => {
    uploadImage(event, this.props.uploadImageFileDispatch);
  };

  getCroppedAvatar = obj => {
    getCroppedAvatar(obj, this.props.saveImageChangesDispatch);
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
    };

    return (
      <div>
        <Helmet>
          <title>{sendProps.translations[messages.title.id]}</title>
          <meta
            name="description"
            content={sendProps.translations[messages.description.id]}
          />
        </Helmet>

        <Header />

        <Base className="p-0">
          <div className="d-flex">
            <div className="col-12 col-xl-9 p-0">
              <BaseTransparent>
                <Form {...sendProps} />
              </BaseTransparent>
            </div>

            <div className="col-12 col-xl-3 p-0">
              <Tips />
            </div>
          </div>
        </Base>
      </div>
    );
  }
}

CreateCommunity.propTypes = {
  setDefaultStoreDispatch: PropTypes.func.isRequired,
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

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    uploadImageFileDispatch: res => dispatch(uploadImageFileAction(res)),
    saveImageChangesDispatch: res => dispatch(saveImageChanges(res)),
    clearImageChangesDispatch: () => dispatch(clearImageChanges()),
    createCommunityDispatch: (comm, reset) =>
      dispatch(createCommunity(comm, reset)),
    setDefaultStoreDispatch: () => dispatch(setDefaultStore()),
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
