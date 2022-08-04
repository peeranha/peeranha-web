import React from 'react';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import warning from 'images/feedback.svg?inline';

const RulesBlock: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div
      className="full-width full-height p20 df"
      css={css`
        background-color: #ffecd8;
        border-radius: 10px;
      `}
    >
      <div className="pl20">
        <img src={warning} alt={'warning'} />
      </div>
      <div className="pl20">
        <div className="df fdc jcsb lh1-5">
          <div className="pb20">{t('post.RulesBlock_1')}</div>
          <div>{t('post.RulesBlock_2')}</div>
          <div>{t('post.RulesBlock_3')}</div>
          <div>{t('post.RulesBlock_4')}</div>
        </div>
      </div>
    </div>
  );
};

export default RulesBlock;
