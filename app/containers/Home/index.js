import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';

import * as routes from 'routes-config';

import Seo from 'components/Seo';
import Base from 'components/Base/BaseRounded';
import LargeOutlinedButton from 'components/Button/Outlined/InfoLarge';
import { InfoLink } from 'components/Button/Outlined/InfoLarge';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import * as questionsSelector from 'containers/Questions/selectors';

import messages from './messages';

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

export const Home = ({
  locale,
  account,
  questions,
}) => {
  const translations = translationMessages[locale];
console.log('questions', questions)
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
              <img alt="Ninja" src="https://static-cdn.jtvnw.net/jtv_user_pictures/cef31105-8a6e-4211-a74b-2f0bbd9791fb-profile_image-300x300.png" />
            </IntroducingImage>
            <IntroducingImageSubtitle>16k followers</IntroducingImageSubtitle>
          </IntroducingMedia>
          <div>
            <IntroducingTitle>Ninja</IntroducingTitle>
            <IntroducingSubTitle>342 questions</IntroducingSubTitle>
            <IntroducingDescription>
              <p>Be positive & helpful to other viewers.<br />Be respectful to moderators.<br />Do not self promote!<br />Do not ask to play with Ninja.<br />Do not ask Ninja to play with other streamers.<br />Do not disrespect other streamers or create drama between streamers.<br />Do not ask Ninja to play a clip, song, or game.<br />Jokes about mental disorders will result in a ban.<br />Racism or discrimination will result in a ban.<br />English only.<br />Avoid religious & political discussions.<br />No trading or selling of online accounts or currency.</p>
            </IntroducingDescription>
          </div>
        </IntroducingContainer>
      </Base>

      <QuestionsTitle>Top/Last questions</QuestionsTitle>
      <div className="d-flex justify-content-center mb-3">
        <InfoLink to={routes.questions()}>Show all questions</InfoLink>
      </div>
    </div>
  );
};

Home.propTypes = {
  locale: PropTypes.string,
  account: PropTypes.string,
};

const withConnect = connect(
  createStructuredSelector({
    account: makeSelectAccount(),
    locale: makeSelectLocale(),
    questions: (state, props) =>
      questionsSelector.selectQuestions(
        props.parentPage,
        Number(props.match.params.communityid),
      )(state),
  }),
);

export default compose(
  withConnect,
)(Home);
