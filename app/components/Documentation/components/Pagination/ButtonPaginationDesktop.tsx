import React from 'react';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';
import ArrowDownIcon from 'icons/ArrowDown';
import { ButtonPaginationProps } from '../../types';

const ButtonPaginationDesktop: React.FC<ButtonPaginationProps> = ({
  next,
  onClickPaginationArticle,
  getcurrentArrayTitle,
  NEXT_TYPE_BUTTON,
  PREV_TYPE_BUTTON,
}): JSX.Element => {
  const { t } = useTranslation();
  const buttunType = next ? NEXT_TYPE_BUTTON : PREV_TYPE_BUTTON;

  return (
    <button
      css={{
        width: '375px',
        height: '65px',
        border: '1px solid rgba(53, 74, 137, 0.15);',
      }}
      className="ml12 mr12 mb12"
      onClick={onClickPaginationArticle(buttunType)}
    >
      <div
        className={`df aic jcsb ml12 mr12`}
        css={css`
          flex-direction: ${next ? 'row-reverse' : 'row'};
        `}
      >
        <ArrowDownIcon
          css={{ color: 'var(--color-gray-dark)', marginLeft: '12px' }}
          className={`${next ? 'transform270' : 'transform90'}`}
        />
        <div className={`df fdc ${next ? 'aifs' : 'aife'} mr16`}>
          <div className="mb4 fz14" css={{ color: 'var(--color-gray-dark)' }}>
            {t(`${next ? 'common.next' : 'common.prev'}`)}
          </div>
          <div className="fz18 semi-bold">
            {next
              ? getcurrentArrayTitle(NEXT_TYPE_BUTTON)
              : getcurrentArrayTitle(PREV_TYPE_BUTTON)}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ButtonPaginationDesktop;
