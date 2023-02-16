import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Wrapper from 'components/Banner';
import Button from 'components/Button/Contained/InfoLarge';

import communitySuggestBanner from 'images/communitySuggest.svg?inline';

import { GO_TO_CREATE_COMMUNITY_SCREEN_BUTTON_ID } from './constants';

export const Banner = ({ goToCreateCommunityScreen }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <img src={communitySuggestBanner} alt="create-community" />
      <div>
        <p>{t('common.didntFindAnyInteresting')}</p>

        <p>{t('common.suggestInterestingComm')}</p>

        <Button
          id={`${GO_TO_CREATE_COMMUNITY_SCREEN_BUTTON_ID}_banner`}
          onClick={goToCreateCommunityScreen}
        >
          {t('common.suggestCommunity')}
        </Button>
      </div>
    </Wrapper>
  );
};

Banner.propTypes = {
  goToCreateCommunityScreen: PropTypes.func,
};

export default React.memo(Banner);
