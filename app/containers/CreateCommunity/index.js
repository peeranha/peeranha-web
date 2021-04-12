/**
 *
 * CreateCommunity
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { translationMessages, DEFAULT_LOCALE } from 'i18n';
import { compose, bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import * as routes from 'routes-config';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';

import Seo from 'components/Seo';
import TipsBase from 'components/Base/TipsBase';
import Loader from 'components/LoadingIndicator/WidthCentered';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectFaqQuestions } from 'containers/DataCacheProvider/selectors';
import {
  makeSelectProfileInfo,
  selectIsInvitedBlogger,
} from 'containers/AccountProvider/selectors';

import {
  WHAT_IS_COMMUNITY_QUESTION,
  WHO_MANAGES_COMMUNITY_QUESTION,
} from 'containers/Faq/constants';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { createCommunity, setDefaultStore, getForm } from './actions';

import {
  COMM_NAME_FIELD,
  COMM_SHORT_DESCRIPTION_FIELD,
  ABOUT_FIELD,
  COMM_MAIN_DESCRIPTION_FIELD,
  COMM_OFFICIAL_SITE_FIELD,
  TAG_NAME_FIELD,
  LANGUAGE_FIELD,
  TAG_DESCRIPTION_FIELD,
  COMM_AVATAR_FIELD,
  FORM_TYPE,
  STATE_KEY,
  ANY_TYPE,
  COMM_BANNER_FIELD,
  FACEBOOK_LINK_FIELD,
  INSTAGRAM_LINK_FIELD,
  YOUTUBE_LINK_FIELD,
  VK_LINK_FIELD,
  MAIN_COLOR_FIELD,
  HIGHLIGHT_COLOR_FIELD,
  COMMUNITY_TYPE,
} from './constants';

import Form from './Form';
import Header from './Header';
import Tips from './Tips';
import Banner from './Banner';

const createCommunityRoute = routes.communitiesCreate();

export const CreateCommunity = ({
  locale,
  faqQuestions,
  createCommunityLoading,
  createCommunityDispatch,
  setDefaultStoreDispatch,
  isFormLoading,
  getFormDispatch,
  isFormAvailable,
  profile,
  isInvitedBlogger,
}) => {
  useEffect(() => {
    setDefaultStoreDispatch();

    getFormDispatch();
  }, []);

  const createCommunityMethod = (...args) => {
    const { reset } = args[2];
    const values = args[0].toJS();

    const tags = Object.keys(values.tags)
      .filter(x => values.tags[x])
      .map(x => ({
        name: values.tags[x][TAG_NAME_FIELD],
        description: values.tags[x][TAG_DESCRIPTION_FIELD],
      }));

    const community = {
      avatar: values[COMM_AVATAR_FIELD],
      name: values[COMM_NAME_FIELD],
      language: values[LANGUAGE_FIELD]
        ? values[LANGUAGE_FIELD].value
        : DEFAULT_LOCALE,
      description: values[COMM_SHORT_DESCRIPTION_FIELD],
      about: values[ABOUT_FIELD],
      main_description: values[COMM_MAIN_DESCRIPTION_FIELD],
      officialSite: values[COMM_OFFICIAL_SITE_FIELD],
      questionsType: parseInt(values[FORM_TYPE] ?? ANY_TYPE),
      isBlogger: !!parseInt(values[COMMUNITY_TYPE]),
      banner: values[COMM_BANNER_FIELD],
      facebook: values[FACEBOOK_LINK_FIELD],
      instagram: values[INSTAGRAM_LINK_FIELD],
      youtube: values[YOUTUBE_LINK_FIELD],
      vk: values[VK_LINK_FIELD],
      main_color: values[MAIN_COLOR_FIELD],
      highlight_color: values[HIGHLIGHT_COLOR_FIELD],
      tags,
    };
    createCommunityDispatch(community, reset);
  };

  const sendProps = {
    createCommunity: createCommunityMethod,
    createCommunityLoading,
    translations: translationMessages[locale],
    locale,
    profile,
    isInvitedBlogger,
  };

  const path = window.location.pathname + window.location.hash;

  if (isFormLoading) return <Loader />;

  if (!isFormAvailable) return <Redirect to={routes.communities()} />;

  return (
    <div>
      <Seo
        title={sendProps.translations[messages.title.id]}
        description={sendProps.translations[messages.description.id]}
        language={locale}
        index={false}
      />

      <Header headerDescriptor={messages.newCommunity} />

      {path === createCommunityRoute && (
        <TipsBase className="overflow-hidden">
          <Form {...sendProps} />
          <Tips faqQuestions={faqQuestions} />
        </TipsBase>
      )}

      {path !== createCommunityRoute && <Banner />}
    </div>
  );
};

CreateCommunity.propTypes = {
  setDefaultStoreDispatch: PropTypes.func.isRequired,
  createCommunityDispatch: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  createCommunityLoading: PropTypes.bool.isRequired,
  faqQuestions: PropTypes.array,
  isFormLoading: PropTypes.bool,
  getFormDispatch: PropTypes.func.isRequired,
  isFromAvailable: PropTypes.bool,
  profile: PropTypes.object,
};

const withConnect = connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
    faqQuestions: selectFaqQuestions([
      WHAT_IS_COMMUNITY_QUESTION,
      WHO_MANAGES_COMMUNITY_QUESTION,
    ]),
    createCommunityLoading: selectors.selectCreateCommunityLoading(),
    isFormLoading: selectors.selectIsFormLoading(),
    isFormAvailable: selectors.selectIsFormAvailable(),
    profile: makeSelectProfileInfo(),
    isInvitedBlogger: selectIsInvitedBlogger(),
  }),
  dispatch => ({
    createCommunityDispatch: bindActionCreators(createCommunity, dispatch),
    setDefaultStoreDispatch: bindActionCreators(setDefaultStore, dispatch),
    getFormDispatch: bindActionCreators(getForm, dispatch),
  }),
);

export default compose(
  injectReducer({ key: STATE_KEY, reducer }),
  injectSaga({ key: STATE_KEY, saga, mode: DAEMON }),
  withConnect,
)(CreateCommunity);
