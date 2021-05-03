import React, { useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import styled from 'styled-components';

import * as routes from 'routes-config';

import {
  PEER_PRIMARY_COLOR,
  PEER_WARNING_COLOR,
  TEXT_SECONDARY,
} from 'style-constants';
import { HASH_CHARS_LIMIT } from 'components/FormFields/AvatarField';
import { DAEMON } from 'utils/constants';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  getPermissions,
  hasCommunityAdminPermissions,
  isUserTopCommunityQuestionsModerator,
} from 'utils/properties';
import {
  checkIsColorsActual,
  isSingleCommunityWebsite,
} from 'utils/communityManagement';
import { getUserAvatar } from 'utils/profileManagement';
import { followHandler } from 'containers/FollowCommunityButton/actions';

import questionsMessages from 'containers/Questions/messages';
import commonMessages from 'common-messages';

import Seo from 'components/Seo';
import Base from 'components/Base/BaseRounded';
import BorderedLargeButton, {
  InfoLink,
} from 'components/Button/Outlined/InfoLarge';
import LargeButton from 'components/Button/Contained/InfoLarge';
import Content from 'containers/Questions/Content/Content';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import LargeImage from 'components/Img/LargeImage';
import TextBlock from 'components/FormFields/TextBlock';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import {
  makeSelectProfileInfo,
  makeSelectFollowedCommunities,
} from 'containers/AccountProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import { FormattedMessage } from 'react-intl';

import reducer from './reducer';
import saga from './saga';
import {
  getQuestions,
  getCommunity,
  redirectToEditCommunityPage,
} from './actions';
import {
  selectQuestions,
  selectCommunity,
  selectCommunityLoading,
} from './selectors';
import messages from './messages';
import { HOME_KEY } from './constants';
import InfoButton from '../../components/Button/Outlined/InfoMedium';
import { italicFont } from '../../global-styles';

const IntroducingContainer = styled.div`
  position: relative;
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

const IntroducingHeader = styled.div`
  @media (max-width: 700px) {
    flex-direction: column-reverse;
    align-items: baseline;
  }

  @media only screen and (max-width: 450px) {
    button {
      align-self: center;
    }
  }
`;

const IntroducingTitle = styled.p`
  font-weight: 600;
  font-size: 35px;

  @media (max-width: 700px) {
    margin-top: 10px;
  }
`;

const IntroducingSubTitle = styled.p`
  font-style: ${italicFont()};
  color: ${TEXT_SECONDARY};
  font-size: 14px;
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
  followedCommunities,
  followHandlerDispatch,
  redirectToEditCommunityPageDispatch,
}) => {
  checkIsColorsActual(single, PEER_PRIMARY_COLOR, PEER_WARNING_COLOR);

  useEffect(
    () => {
      getCommunityDispatch(single);
    },
    [single],
  );

  useEffect(() => {
    getQuestionsDispatch(single);
  }, []);

  const translations = translationMessages[locale];

  const isRenderQuestions = useMemo(
    () => !!communities && !!questions && questions.length,
    [communities, questions],
  );

  const isModerator = useMemo(
    () =>
      isUserTopCommunityQuestionsModerator(profile?.permissions ?? [], single),
    [profile],
  );

  const isFollowed = followedCommunities
    ? followedCommunities.includes(single)
    : false;

  const followHandlerAction = useCallback(
    () => {
      followHandlerDispatch(
        single,
        isFollowed,
        `${isFollowed ? 'un' : ''}follow_community_${single}`,
      );
    },
    [single, isFollowed],
  );
  /* eslint-disable camelcase */
  const { name, about, avatar, questions_asked, users_subscribed } = community;

  const EditButton = () =>
    hasCommunityAdminPermissions(getPermissions(profile), single) ? (
      <>
        <InfoButton
          onClick={() => redirectToEditCommunityPageDispatch(single)}
          style={{
            marginRight: '10px',
            padding: '10px 18px',
            minWidth: '92px',
            height: '40px',
          }}
        >
          <FormattedMessage {...commonMessages.edit} />
        </InfoButton>
      </>
    ) : null;

  return (
    <div>
      <Seo
        title={
          single
            ? translations[commonMessages.home.id]
            : translations[messages.title.id]
        }
        description={translations[messages.description.id]}
        language={locale}
      />

      {communityLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Base className="mb-3">
            <IntroducingContainer className="d-flex">
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
                  {users_subscribed}{' '}
                  {translationMessages[locale][commonMessages.followers.id]}
                </IntroducingImageSubtitle>
              </IntroducingMedia>
              <div className="flex-grow-1">
                <IntroducingHeader className="d-flex justify-content-between">
                  <IntroducingTitle className="mr-3">{name}</IntroducingTitle>
                  {profile &&
                    (isFollowed ? (
                      <div>
                        <EditButton />
                        <BorderedLargeButton onClick={followHandlerAction}>
                          {
                            translationMessages[locale][
                              commonMessages.unsubscribe.id
                            ]
                          }
                        </BorderedLargeButton>
                      </div>
                    ) : (
                      <div>
                        <EditButton />
                        <LargeButton onClick={followHandlerAction}>
                          {
                            translationMessages[locale][
                              commonMessages.subscribe.id
                            ]
                          }
                        </LargeButton>
                      </div>
                    ))}
                </IntroducingHeader>
                <IntroducingSubTitle>
                  {questions_asked}{' '}
                  {translationMessages[locale][commonMessages.questions.id]}
                </IntroducingSubTitle>
                {about && <TextBlock content={about} className="mt-3" />}
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
                  questionsList={
                    questions.length > 5 ? questions.slice(0, 5) : questions
                  }
                  communities={communities}
                  isModerator={isModerator}
                  profileInfo={profile}
                />
              </div>
              <div className="d-flex justify-content-center mb-3">
                <InfoLink to={routes.questions()}>
                  {
                    translationMessages[locale][
                      questionsMessages.showAllQuestions.id
                    ]
                  }
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
  followedCommunities: PropTypes.array,
  followHandlerDispatch: PropTypes.func,
  redirectToEditCommunityPageDispatch: PropTypes.func,
};

const withConnect = connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
    profile: makeSelectProfileInfo(),
    communities: selectCommunities(),
    questions: selectQuestions(),
    community: selectCommunity(),
    communityLoading: selectCommunityLoading(),
    followedCommunities: makeSelectFollowedCommunities(),
  }),
  dispatch => ({
    getQuestionsDispatch: bindActionCreators(getQuestions, dispatch),
    getCommunityDispatch: bindActionCreators(getCommunity, dispatch),
    followHandlerDispatch: bindActionCreators(followHandler, dispatch),
    redirectToEditCommunityPageDispatch: bindActionCreators(
      redirectToEditCommunityPage,
      dispatch,
    ),
  }),
);

export default compose(
  injectReducer({ key: HOME_KEY, reducer }),
  injectSaga({ key: HOME_KEY, saga, mode: DAEMON }),
  withConnect,
)(Home);
