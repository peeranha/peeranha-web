import { css } from '@emotion/react';
import { singleCommunityColors } from 'utils/communityManagement';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Wrapper from 'components/Banner';
import H4 from 'components/H4';

import noActivityImg from 'images/userHasntActivity.png';

const colors = singleCommunityColors();

const Banner = () => {
  const { t } = useTranslation();

  return (
    <div>
      <H4
        css={css`
          color: ${colors.white || ''};
        `}
        isHeader
      >
        {t('profile.activity')}
      </H4>
      <Wrapper>
        <img src={noActivityImg} alt="view-profile" />
        <div>
          <p>{t('profile.userHasntActivityYet')}</p>

          <p>{t('profile.heHasNoAnswersAndPosts')}</p>
        </div>
      </Wrapper>
    </div>
  );
};

export default Banner;
