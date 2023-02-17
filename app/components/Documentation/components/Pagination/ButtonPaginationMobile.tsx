import React from 'react';
import { useTranslation } from 'react-i18next';
import ArrowDownIcon from 'icons/ArrowDown';
import { ButtonPaginationProps } from '../../types';
import { NEXT_TYPE_BUTTON, PREV_TYPE_BUTTON } from './constants';

const ButtonPaginationMobile: React.FC<ButtonPaginationProps> = ({
  isStartArticle,
  isLastArticle,
  onClickPaginationArticle,
  getcurrentArrayTitle,
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div
      className="full-width pa l0 b0"
      css={{
        height: '60px',
        border: '1px solid rgba(53, 74, 137, 0.15)',
        backgroundColor: 'var(--color-white)',
      }}
    >
      <div className="df aic jcsb">
        <div css={{ width: '80%' }}>
          <div className="ml8">
            <div css={{ color: 'var(--color-gray-dark)' }}>
              {' '}
              {t(`${!isLastArticle ? 'common.next' : 'common.prev'}`)}
            </div>
            <div
              className="fz16 semi-bold mt4 ovh"
              css={{
                textOverflow: 'ellipsis',
                display: '-webkit-box !important',
                '-webkit-line-clamp': '1',
                '-webkit-box-orient': 'vertical',
              }}
            >
              {
                getcurrentArrayTitle(
                  !isLastArticle ? NEXT_TYPE_BUTTON : PREV_TYPE_BUTTON,
                )?.title
              }
            </div>
          </div>
        </div>
        <div
          className="df aic jcsa full-width"
          css={{
            height: '60px',
            flexBasis: '20%',
            justifyContent: 'space-around',
          }}
        >
          {!isLastArticle && (
            <ArrowDownIcon
              onClick={onClickPaginationArticle(NEXT_TYPE_BUTTON)}
              className="transform360"
            />
          )}
          {!isStartArticle && (
            <ArrowDownIcon
              onClick={onClickPaginationArticle(PREV_TYPE_BUTTON)}
              className="transform180"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ButtonPaginationMobile;
