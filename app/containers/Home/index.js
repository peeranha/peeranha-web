import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import styled from 'styled-components';

import * as routes from 'routes-config';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';
import { isUserTopCommunityQuestionsModerator } from 'utils/properties';
import { isSingleCommunityWebsite } from 'utils/communityManagement';

import Seo from 'components/Seo';
import Base from 'components/Base/BaseRounded';
import { InfoLink } from 'components/Button/Outlined/InfoLarge';
import Content from 'containers/Questions/Content/Content';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import * as questionsSelector from 'containers/Questions/selectors';

import reducer from './reducer';
import saga from './saga';
import { getQuestions } from './actions';
import { selectQuestions } from './selectors';
import messages from './messages';
import { HOME_KEY } from './constants';

const IntroducingContainer = styled.div`
  display: flex;
  line-height: 1.3;
`;

const IntroducingMedia = styled.div`
  margin-right: 50px;
  flex-shrink: 0;
`;

const IntroducingImage = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

const IntroducingImageSubtitle = styled.p`
  text-align: center;
  color: #7b7b7b;
`;

const IntroducingTitle = styled.p`
  font-weight: 600;
  font-size: 28px;
`;

const IntroducingSubTitle = styled.p`
  font-style: italic;
  color: #7b7b7b;
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
}) => {
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

  return (
    <div>
      <Seo
        title={translations[messages.title.id]}
        description={translations[messages.description.id]}
        language={locale}
      />

      <Base className="mb-3">
        <IntroducingContainer>
          <IntroducingMedia>
            <IntroducingImage>
              <img alt="" src="https://netboardme.s3.amazonaws.com/published/12112/files/43cbe5898c58025490885008175f0383_-c0xffffffff-rj-k-no.jpeg" />
            </IntroducingImage>
            <IntroducingImageSubtitle>16k followers</IntroducingImageSubtitle>
          </IntroducingMedia>
          <div>
            <IntroducingTitle>Create and Go</IntroducingTitle>
            <IntroducingSubTitle>342 questions</IntroducingSubTitle>
            <IntroducingDescription>
              <p>Be positive & helpful to other viewers.<br />Be respectful to moderators.<br />Do not self promote!<br />Do not ask to play with Ninja.<br />Do not ask Ninja to play with other streamers.<br />Do not disrespect other streamers or create drama between streamers.<br />Do not ask Ninja to play a clip, song, or game.<br />Jokes about mental disorders will result in a ban.<br />Racism or discrimination will result in a ban.<br />English only.<br />Avoid religious & political discussions.<br />No trading or selling of online accounts or currency.</p>
            </IntroducingDescription>
          </div>
        </IntroducingContainer>
      </Base>

      {isRenderQuestions ? (
        <>
          <QuestionsTitle>Top/Last questions</QuestionsTitle>
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
            <InfoLink to={routes.questions()}>Show all questions</InfoLink>
          </div>
        </>
      ) : null}
    </div>
  );
};

Home.propTypes = {
  locale: PropTypes.string,
  communities: PropTypes.array,
  questions: PropTypes.array,
  profile: PropTypes.object,
};

const withConnect = connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
    profile: makeSelectProfileInfo(),
    communities: selectCommunities(),
    questions: selectQuestions(),
  }),
  dispatch => ({
    getQuestionsDispatch: bindActionCreators(getQuestions, dispatch),
  }),
);

export default compose(
  injectReducer({ key: HOME_KEY, reducer }),
  injectSaga({ key: HOME_KEY, saga, mode: DAEMON }),
  withConnect,
)(Home);
