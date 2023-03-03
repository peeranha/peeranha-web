import React from 'react';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';
import ArrowDownIcon from 'icons/ArrowDown';
import { ButtonPaginationProps } from '../../types';
import { NEXT_TYPE_BUTTON, PREV_TYPE_BUTTON } from './constants';

const ButtonPaginationDesktop: React.FC<ButtonPaginationProps> = ({
  typeButton,
  onClickPaginationArticle,
  title,
}): JSX.Element => {
  const { t } = useTranslation();
  const isNextButton = typeButton === NEXT_TYPE_BUTTON;
  return (
    <button
      css={{
        width: '350px',
        height: '65px',
        border: '1px solid rgba(53, 74, 137, 0.15);',
        ':hover': {
          background: 'rgba(53, 74, 137, 0.05)',
        },
      }}
      className="ml12 mr12 mb12"
      onClick={onClickPaginationArticle}
    >
      <div
        className={`df aic jcsb ml12 mr12`}
        css={css`
          flex-direction: ${isNextButton ? 'row-reverse' : 'row'};
        `}
      >
        <ArrowDownIcon
          css={{ color: 'var(--color-gray-dark)' }}
          className={`${isNextButton ? 'transform270' : 'transform90'}`}
        />
        <div className={`df fdc ${isNextButton ? 'aifs' : 'aife'} mr16`}>
          <div className="mb4 fz14" css={{ color: 'var(--color-gray-dark)' }}>
            {t(`${isNextButton ? 'common.next' : 'common.prev'}`)}
          </div>
          <div
            className="fz18 semi-bold ovh"
            css={{
              textOverflow: 'ellipsis',
              display: '-webkit-box !important',
              '-webkit-line-clamp': '1',
              '-webkit-box-orient': 'vertical',
            }}
          >
            {title}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ButtonPaginationDesktop;
