import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { css } from '@emotion/react';

import { BG_PRIMARY, RULES_BACKGROUND, TEXT_SECONDARY } from 'style-constants';

import Label from 'components/FormFields/Label';
import { FULL_RULES_LINK } from 'app/constants/rules';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

const messagesArray = [
  'common.contentPopupBlock_3',
  'common.contentPopupBlock_4',
  'common.contentPopupBlock_5',
  'common.contentPopupBlock_6',
  'common.contentPopupBlock_7',
];

const PostRules = () => {
  const { t } = useTranslation();

  return (
    <div
      css={css`
        margin-bottom: 32px;
        padding: 16px;
        background-color: ${RULES_BACKGROUND};
        width: 100%;
      `}
    >
      <Label
        css={css`
          margin-bottom: 12px;
          font-size: 18px;
        `}
      >
        {t('common.postRules')}:
      </Label>

      <ul
        css={css`
          padding-bottom: 6px;
          ::after {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background-color: #fff;
            margin: 20px auto 12px;
          }
        `}
      >
        {messagesArray.map((item) => (
          <li
            key={item}
            css={css`
              display: flex;
              align-items: start;
              margin-bottom: 12px;
              font-size: 16px;
              line-height: 20px;
              :before {
                content: '';
                flex-basis: 5px;
                height: 5px;
                border-radius: 50%;
                background: ${colors.textColor || BG_PRIMARY};
                margin-right: 10px;
                display: inline-flex;
                position: relative;
                top: 8px;
              }
              span {
                flex: 1;
              }
            `}
          >
            <span>{t(item)}</span>
          </li>
        ))}
      </ul>
      <div
        css={css`
          color: ${TEXT_SECONDARY};
          font-size: 16px;
          line-height: 24px;
        `}
      >
        <span
          css={css`
            font-style: italic;
            margin-bottom: 12px;
            display: block;
          `}
        >
          <Trans
            i18nKey="common.contentPopupBlock_8"
            components={[<a href={FULL_RULES_LINK} key="0" target="_blank" />]}
          />
        </span>
        <span>{t('common.moderatorsCanDeletePosts')}</span>
      </div>
    </div>
  );
};

export default PostRules;
