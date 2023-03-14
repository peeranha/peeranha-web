import React from 'react';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { RULES_BACKGROUND } from 'style-constants';

const RulesBlock: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div
      className="full-width full-height p20 df"
      css={css`
        background-color: ${RULES_BACKGROUND};
        border-radius: 10px;
        margin-bottom: 16px;
      `}
    >
      <div
        css={css`
          line-height: 30px;
        `}
      >
        <div
          css={css`
            margin-bottom: 5px;
            font-weight: bold;
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
