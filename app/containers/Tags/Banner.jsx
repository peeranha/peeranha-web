import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Wrapper from 'components/Banner';
import Button from 'components/Button/Contained/InfoLarge';

import communitySuggestBanner from 'images/box_with_tags.svg?inline';

import { GO_TO_CREATE_TAG_SCREEN_BUTTON_ID } from './constants';

export const Banner = ({ openTagForm, communityId }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <img src={communitySuggestBanner} alt="tags-banner" />
      <div>
        <p>{t('tags.didntFindSuitableTag')}</p>

        <p>{t('tags.suggestTagWhichWillbeUseful')}</p>

        <Button
          data-communityid={communityId}
          id={`${GO_TO_CREATE_TAG_SCREEN_BUTTON_ID}_banner`}
          onClick={openTagForm}
        >
          {t('common.createTag')}
        </Button>
      </div>
    </Wrapper>
  );
};

Banner.propTypes = {
  openTagForm: PropTypes.func,
  communityId: PropTypes.number,
};

export default React.memo(Banner);
