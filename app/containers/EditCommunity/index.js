import React, { useEffect, useMemo, useState } from 'react';
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
import { useModeratorRole } from 'hooks/useModeratorRole';

import Form from './Form';

import { editCommunity, freezeCommunity, getCommunity } from './actions';
import {
  selectCommunity,
  selectEditCommunityLoading,
  selectFreezeCommunityLoading,
  selectGetCommunityLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { GENERAL_TAB, TRANSLATIONS_TAB } from './constants';

const EditCommunity = ({
  community,
  editCommunityDispatch,
  editCommunityLoading,
  freezeCommunityDispatch,
  freezeCommunityLoading,
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

  useEffect(() => {
    getCommunityDispatch(communityId);
  }, [communityId]);

  const [tab, setTab] = useState(GENERAL_TAB);

  const formData = useMemo(
    () => ({
      community,
      editCommunityDispatch,
      communityId,
      communityLoading: editCommunityLoading,
      locale,
      isModerator: hasGlobalModeratorRole(getPermissions(profileInfo)),
      tab,
      setTab,
      freezeCommunityDispatch,
      freezeCommunityLoading,
    }),
    [
      community,
      communityId,
      editCommunityDispatch,
      editCommunityLoading,
      tab,
      freezeCommunityDispatch,
      freezeCommunityLoading,
    ],
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

      <TipsBase>
        {communityLoading && <LoadingIndicator />}

        {!communityLoading && <Form {...formData} />}

        {tab !== TRANSLATIONS_TAB && <Tips faqQuestions={faqQuestions} tab={tab} />}
      </TipsBase>
    </div>
  );
};

EditCommunity.propTypes = {
  editCommunityDispatch: PropTypes.func.isRequired,
  editCommunityLoading: PropTypes.bool.isRequired,
  freezeCommunityDispatch: PropTypes.func.isRequired,
  freezeCommunityLoading: PropTypes.bool.isRequired,
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
    freezeCommunityLoading: selectFreezeCommunityLoading(),
    faqQuestions: selectFaqQuestions([WHAT_IS_COMMUNITY_QUESTION, WHO_MANAGES_COMMUNITY_QUESTION]),
    getCommunityLoading: selectGetCommunityLoading(),
    locale: makeSelectLocale(),
    profileInfo: makeSelectProfileInfo(),
  }),
  (dispatch) => ({
    editCommunityDispatch: bindActionCreators(editCommunity, dispatch),
    freezeCommunityDispatch: bindActionCreators(freezeCommunity, dispatch),
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
