import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
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

import { getPermissions, hasGlobalModeratorRole } from 'utils/properties';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { useModeratorRole } from '../../hooks/useModeratorRole';

import Form from './Form';

import { editCommunity, getCommunity } from './actions';
import {
  selectCommunity,
  selectEditCommunityLoading,
  selectGetCommunityLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getSingleCommunityDetails } from '../../utils/communityManagement';

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
  const { t } = useTranslation();
  useModeratorRole(noAccessRoute, communityId);

  const isBloggerMode = getSingleCommunityDetails()?.isBlogger || false;

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
      isModerator: hasGlobalModeratorRole(getPermissions(profileInfo)),
      isBloggerMode,
    }),
    [community, communityId, editCommunityDispatch, editCommunityLoading],
  );

  return (
    <div>
      <Seo
        title={t('common.editCommunityDesc.pageTitle')}
        description={t('common.editCommunityDesc.description')}
        index={false}
        language={locale}
      />

      <Header headerDescriptor="common.editCommunityDesc.header" />

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
  injectSaga({
    key: 'editcommunity',
    saga,
    disableEject: true,
  }),
  withConnect,
)(EditCommunity);
