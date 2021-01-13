import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import styled from 'styled-components';

import * as routes from 'routes-config';

import { TEXT_SECONDARY } from 'style-constants';
import { HASH_CHARS_LIMIT } from 'components/FormFields/AvatarField';
import { DAEMON } from 'utils/constants';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { isUserTopCommunityQuestionsModerator } from 'utils/properties';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { getUserAvatar } from 'utils/profileManagement';

import questionsMessages from 'containers/Questions/messages';
import commonMessages from 'common-messages';

import Seo from 'components/Seo';
import Base from 'components/Base/BaseRounded';
import { InfoLink } from 'components/Button/Outlined/InfoLarge';
import Content from 'containers/Questions/Content/Content';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import LargeImage from 'components/Img/LargeImage';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import reducer from './reducer';
import saga from './saga';
import { getQuestions, getCommunity } from './actions';
import {
  selectQuestions,
  selectCommunity,
  selectCommunityLoading,
} from './selectors';
import messages from './messages';
import { HOME_KEY } from './constants';

const IntroducingContainer = styled.div`
  line-height: 1.3;

  @media only screen and (max-width: 450px) {
    flex-direction: column;
    align-items: center;
  }
`;

const IntroducingMedia = styled.div`
  margin-right: 50px;
  flex-shrink: 0;

  @media only screen and (max-width: 450px) {
    margin-right: 0px;
    margin-bottom: 20px;
  }
`;

const IntroducingImageSubtitle = styled.p`
  text-align: center;
  color: ${TEXT_SECONDARY};
`;

const IntroducingTitle = styled.p`
  font-weight: 600;
  font-size: 28px;
`;

const IntroducingSubTitle = styled.p`
  font-style: italic;
  color: ${TEXT_SECONDARY};
  font-size: 14px;
`;

const IntroducingDescription = styled.div`
  margin-top: 20px;
`;

const QuestionsTitle = styled.p`
  margin: 30px 0 20px;
  font-weight: 600;
  font-size: 30px;
`;

const single = isSingleCommunityWebsite();

export const Home = ({
  locale,
  profile,
  communities,
  questions,
  getQuestionsDispatch,
  community,
  getCommunityDispatch,
  communityLoading,
}) => {
  useEffect(
    () => {
      getCommunityDispatch(+single);
    },
    [single],
  );

  useEffect(
    () => {
      getQuestionsDispatch();
    },
    [],
  );

  const translations = translationMessages[locale];

  const isRenderQuestions = useMemo(() => !!communities && !!questions && questions.length, [communities, questions]);

  const isModerator = useMemo(
    () =>
      isUserTopCommunityQuestionsModerator(profile?.permissions ?? [], single),
    [profile],
  );

  const { name, about, avatar, questions_asked, users_subscribed } = community;

  return (
    <div>
      <Seo
        title={translations[messages.title.id]}
        description={translations[messages.description.id]}
        language={locale}
      />

      {!!communityLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Base className="mb-3">
            <IntroducingContainer className='d-flex'>
              <IntroducingMedia>
                <LargeImage
                  isBordered
                  src={
                    avatar && avatar.length > HASH_CHARS_LIMIT
                      ? avatar
                      : getUserAvatar(avatar, true, true)
                  }
                  alt={name}
                />
                <IntroducingImageSubtitle>
                  {users_subscribed} {translationMessages[locale][commonMessages.users.id]}
                </IntroducingImageSubtitle>
              </IntroducingMedia>
              <div>
                <IntroducingTitle>{name}</IntroducingTitle>
                <IntroducingSubTitle>
                  {questions_asked} {translationMessages[locale][commonMessages.questions.id]}
                </IntroducingSubTitle>
                {about && <IntroducingDescription>{about}</IntroducingDescription>}
              </div>
            </IntroducingContainer>
          </Base>

          {isRenderQuestions ? (
            <>
              <QuestionsTitle>
                {translationMessages[locale][messages.questionsTitle.id]}
              </QuestionsTitle>
              <div className="position-relative">
                <Content
                  locale={locale}
                  questionsList={questions}
                  communities={communities}
                  isModerator={isModerator}
                  profileInfo={profile}
                />
              </div>
              <div className="d-flex justify-content-center mb-3">
                <InfoLink to={routes.questions()}>
                  {translationMessages[locale][questionsMessages.showAllQuestions.id]}
                </InfoLink>
              </div>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

Home.propTypes = {
  locale: PropTypes.string,
  communities: PropTypes.array,
  questions: PropTypes.array,
  profile: PropTypes.object,
  getQuestionsDispatch: PropTypes.func,
  community: PropTypes.object,
  getCommunityDispatch: PropTypes.func,
  communityLoading: PropTypes.bool,
};

const withConnect = connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
    profile: makeSelectProfileInfo(),
    communities: selectCommunities(),
    questions: selectQuestions(),
    community: selectCommunity(),
    communityLoading: selectCommunityLoading(),
  }),
  dispatch => ({
    getQuestionsDispatch: bindActionCreators(getQuestions, dispatch),
    getCommunityDispatch: bindActionCreators(getCommunity, dispatch),
  }),
);

export default compose(
  injectReducer({ key: HOME_KEY, reducer }),
  injectSaga({ key: HOME_KEY, saga, mode: DAEMON }),
  withConnect,
)(Home);
