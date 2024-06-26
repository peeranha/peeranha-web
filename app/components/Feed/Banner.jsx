import React from 'react';
import { useTranslation } from 'react-i18next';
import * as routes from 'routes-config';
import Wrapper from 'components/Banner';
import Button from 'components/Button/Contained/InfoLarge';
import A from 'components/A';

import noQuestionsFeedPage from 'images/noQuestionsFeedPage.svg?inline';
import { graphCommunityColors } from 'utils/communityManagement';

const graphCommunity = graphCommunityColors();

export const Banner = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <img src={noQuestionsFeedPage} alt="feed-banner" />
      <div css={graphCommunity && { color: '#E1E1E4' }}>
        <p>{t('common.youDontHaveFeedToRead')}</p>

        <p>{t('common.subscribeToCommToKeep')}</p>

        <A to={routes.communities()}>
          <Button>{t('common.goToCommunities')}</Button>
        </A>
      </div>
    </Wrapper>
  );
};

export default Banner;
