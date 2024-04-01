import React from 'react';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { RULES_BACKGROUND } from 'style-constants';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

const RulesBlock: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div
      className="full-width full-height p20 df"
      css={{
        backgroundColor: graphCommunity
          ? '#6F4CFF33'
          : colors.newPostMediaBackgroundColor || RULES_BACKGROUND,
        borderRadius: '10px',
        marginBottom: '16px',
        color: graphCommunity ? '#E1E1E4' : 'inherit',
      }}
    >
      <div
        css={css`
          line-height: 30px;
        `}
      >
        <div
          css={css`
            margin-bottom: 5px;
            font-weight: 700;
          `}
        >
          {t('post.RulesBlock_1')}
        </div>
        <div
          css={css`
            padding-left: 5px;
          `}
        >
          <div>{t('post.RulesBlock_2')}</div>
          <div>{t('post.RulesBlock_3')}</div>
          <div>{t('post.RulesBlock_4')}</div>
        </div>
      </div>
    </div>
  );
};

export default RulesBlock;
