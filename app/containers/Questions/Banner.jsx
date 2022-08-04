import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Wrapper from 'components/Banner';
import FeedBanner from 'components/Feed/Banner';
import Button from 'components/Button/Contained/InfoLarge';

import noQuestionsAllQuestionsPage from 'images/noQuestionsAllQuestionsPage.svg?inline';

export const AllQuestionsBanner = ({ redirectToAskQuestionPage }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <img src={noQuestionsAllQuestionsPage} alt="posts-banner" />
      <div>
        <p>{t('common.noPostsYet')}</p>

        <p>{t('common.thisIsNewCommunity')}</p>

        <Button id="banner-ask-question" onClick={redirectToAskQuestionPage}>
          {t('common.askQuestion')}
        </Button>
      </div>
    </Wrapper>
  );
};

export const Banner = ({
  isFeed,
  followedCommunities,
  redirectToAskQuestionPage,
}) =>
  isFeed && followedCommunities && !followedCommunities[0] ? (
    <FeedBanner />
  ) : (
    <AllQuestionsBanner redirectToAskQuestionPage={redirectToAskQuestionPage} />
  );

Banner.propTypes = {
  isFeed: PropTypes.bool,
  followedCommunities: PropTypes.array,
  redirectToAskQuestionPage: PropTypes.func,
};

AllQuestionsBanner.propTypes = {
  redirectToAskQuestionPage: PropTypes.func,
};

export default React.memo(Banner);
