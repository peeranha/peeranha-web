/**
 *
 * EditCommunity
 *
 */

import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { translationMessages } from 'i18n';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import Seo from 'components/Seo';
import TipsBase from 'components/Base/TipsBase';

import {
  WHAT_IS_COMMUNITY_QUESTION,
  WHO_MANAGES_COMMUNITY_QUESTION,
} from 'containers/Faq/constants';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { selectFaqQuestions } from 'containers/DataCacheProvider/selectors';

import Header from 'containers/CreateCommunity/Header';
import Tips from 'containers/CreateCommunity/Tips';

import { noAccess as noAccessRoute } from 'routes-config';

import { communityModeratorCreatePermission } from 'utils/properties';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Form from './Form';

import { editCommunity, getCommunity } from './actions';
import {
  selectCommunity,
  selectEditCommunityLoading,
  selectGetCommunityLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const EditCommunity = ({
  community,
  editCommunityDispatch,
  editCommunityLoading,
  faqQuestions,
  getCommunityDispatch,
  locale,
  profileInfo,
  getCommunityLoading: communityLoading,
  match: {
    params: { communityId },
  },
}) => {
  const editingAllowed = useMemo(
    () =>
      communityModeratorCreatePermission(
        profileInfo?.['integer_properties'] || [],
      ),
    [profileInfo],
  );

  if (!editingAllowed) {
    return <Redirect to={noAccessRoute()} />;
  }

  useEffect(
    () => {
      getCommunityDispatch(communityId);
    },
    [communityId],
  );

  const formData = useMemo(
    () => ({
      community,
      editCommunityDispatch,
      communityId: +communityId,
      communityLoading: editCommunityLoading,
      locale,
    }),
    [community, communityId, editCommunityDispatch, editCommunityLoading],
  );

  const translations = useMemo(() => translationMessages[locale], [locale]);

  return (
    <div>
      <Seo
        title={translations[messages.pageTitle.id]}
        description={translations[messages.description.id]}
        index={false}
        language={locale}
      />

      <Header headerDescriptor={messages.header} />

      <TipsBase className="overflow-hidden">
        {communityLoading && <LoadingIndicator />}

        {!communityLoading && <Form {...formData} />}

        <Tips faqQuestions={faqQuestions} />
      </TipsBase>
    </div>
  );
};

EditCommunity.propTypes = {
  editCommunityDispatch: PropTypes.func.isRequired,
  editCommunityLoading: PropTypes.bool.isRequired,
  getCommunityDispatch: PropTypes.func.isRequired,
  getCommunityLoading: PropTypes.bool.isRequired,
  locale: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  profileInfo: PropTypes.object.isRequired,
  community: PropTypes.object,
  faqQuestions: PropTypes.array,
};

const withConnect = connect(
  createStructuredSelector({
    community: selectCommunity(),
    editCommunityLoading: selectEditCommunityLoading(),
    faqQuestions: selectFaqQuestions([
      WHAT_IS_COMMUNITY_QUESTION,
      WHO_MANAGES_COMMUNITY_QUESTION,
    ]),
    getCommunityLoading: selectGetCommunityLoading(),
    locale: makeSelectLocale(),
    profileInfo: makeSelectProfileInfo(),
  }),
  dispatch => ({
    editCommunityDispatch: bindActionCreators(editCommunity, dispatch),
    getCommunityDispatch: bindActionCreators(getCommunity, dispatch),
  }),
);

export default compose(
  injectReducer({ key: 'editcommunity', reducer }),
  injectSaga({ key: 'editcommunity', saga }),
  withConnect,
)(EditCommunity);
