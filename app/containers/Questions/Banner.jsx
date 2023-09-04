import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Wrapper from 'components/Banner';
import FeedBanner from 'components/Feed/Banner';
import Button from 'components/Button/Contained/InfoLarge';
import SuiConnectModals from 'components/SuiConnectModals';

import noQuestionsAllQuestionsPage from 'images/noQuestionsAllQuestionsPage.svg?inline';

import { isSuiBlockchain } from 'utils/sui/sui';

export const AllQuestionsBanner = ({
  redirectToAskQuestionPage,
  profileInfo,
  loginWithSuiDispatch,
}) => {
  const { t } = useTranslation();

  const actionButtonWithLogin = (onClick) => (
    <Button id="banner-ask-question" onClick={onClick}>
      {t('common.askQuestion')}
    </Button>
  );

  return (
    <Wrapper>
      <img src={noQuestionsAllQuestionsPage} alt="posts-banner" />
      <div>
        <p>{t('common.noPostsYet')}</p>

        <p>{t('common.thisIsNewCommunity')}</p>

        {!profileInfo && isSuiBlockchain ? (
          <SuiConnectModals
            loginWithWallet={loginWithSuiDispatch}
            actionButtonWithLogin={actionButtonWithLogin}
          />
        ) : (
          actionButtonWithLogin(redirectToAskQuestionPage)
        )}
      </div>
    </Wrapper>
  );
};

export const Banner = ({
  isFeed,
  followedCommunities,
  redirectToAskQuestionPage,
  isEmpty,
  isSingleCommunityMode,
  profileInfo,
  loginWithSuiDispatch,
}) =>
  (!isSingleCommunityMode && isFeed && followedCommunities && !followedCommunities[0]) ||
  (isSingleCommunityMode && !isEmpty) ? (
    <FeedBanner />
  ) : (
    <AllQuestionsBanner
      redirectToAskQuestionPage={redirectToAskQuestionPage}
      profileInfo={profileInfo}
      loginWithSuiDispatch={loginWithSuiDispatch}
    />
  );

Banner.propTypes = {
  isFeed: PropTypes.bool,
  followedCommunities: PropTypes.array,
  redirectToAskQuestionPage: PropTypes.func,
  isEmpty: PropTypes.bool,
  isSingleCommunityMode: PropTypes.bool,
  profileInfo: PropTypes.object,
  loginWithSuiDispatch: PropTypes.func,
};

AllQuestionsBanner.propTypes = {
  redirectToAskQuestionPage: PropTypes.func,
  profileInfo: PropTypes.object,
  loginWithSuiDispatch: PropTypes.func,
};

export default React.memo(Banner);
