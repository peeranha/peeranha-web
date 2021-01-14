import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import styled from 'styled-components';

import * as routes from 'routes-config';

import { TEXT_SECONDARY } from 'style-constants';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';
import { isUserTopCommunityQuestionsModerator } from 'utils/properties';
import { isSingleCommunityWebsite, singleCommunityStyles } from 'utils/communityManagement';

import questionsMessages from 'containers/Questions/messages';
import commonMessages from 'common-messages';

import Seo from 'components/Seo';
import Base from 'components/Base/BaseRounded';
import { InfoLink } from 'components/Button/Outlined/InfoLarge';
import Content from 'containers/Questions/Content/Content';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import reducer from './reducer';
import saga from './saga';
import { getQuestions } from './actions';
import { selectQuestions } from './selectors';
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

const IntroducingImage = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
  background-image: url('${({ img }) => img}');
  background-size: contain;
  background-position: center;
  border-radius: 50%;
  overflow: hidden;
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

  const { logo, name, description, questionsAmount, followersAmount } = singleCommunityStyles().customSubHeaderConfig;

  return (
    <div>
      <Seo
        title={translations[messages.title.id]}
        description={translations[messages.description.id]}
        language={locale}
      />

      <Base className="mb-3">
        <IntroducingContainer className='d-flex'>
          <IntroducingMedia>
            <IntroducingImage img={logo} />
            <IntroducingImageSubtitle>
              {followersAmount} {translationMessages[locale][commonMessages.users.id]}
            </IntroducingImageSubtitle>
          </IntroducingMedia>
          <div>
            <IntroducingTitle>{name}</IntroducingTitle>
            <IntroducingSubTitle>
              {questionsAmount} {translationMessages[locale][commonMessages.questions.id]}
            </IntroducingSubTitle>
            <IntroducingDescription>{description}</IntroducingDescription>
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
    </div>
  );
};

Home.propTypes = {
  locale: PropTypes.string,
  communities: PropTypes.array,
  questions: PropTypes.array,
  profile: PropTypes.object,
  getQuestionsDispatch: PropTypes.func,
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
