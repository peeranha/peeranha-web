import React from 'react';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';
import ArrowDownIcon from 'icons/ArrowDown';
import { ButtonPaginationProps } from 'components/Documentation/types';
import { CaretDownGraph } from 'components/icons';
import { graphCommunityColors } from 'utils/communityManagement';
import { NEXT_TYPE_BUTTON, PREV_TYPE_BUTTON } from './constants';
import { styled } from './PaginationDocumentation.styled';

const graphCommunity = graphCommunityColors();

const ButtonPaginationDesktop: React.FC<ButtonPaginationProps> = ({
  typeButton,
  onClickPaginationArticle,
  title,
}): JSX.Element => {
  const { t } = useTranslation();
  const isNextButton = typeButton === NEXT_TYPE_BUTTON;
  return (
    <button css={styled.paginationButton} onClick={onClickPaginationArticle}>
      <div
        css={{
          ...styled.paginationButtonBlock,
          flexDirection: isNextButton ? 'row-reverse' : 'row',
        }}
      >
        {graphCommunity ? (
          <CaretDownGraph
            size={[24, 24]}
            css={{ transform: isNextButton ? 'rotate(270deg)' : 'rotate(90deg)' }}
          />
        ) : (
          <ArrowDownIcon css={{ transform: isNextButton ? 'rotate(270deg)' : 'rotate(90deg)' }} />
        )}
        <div
          css={{
            ...styled.paginationButtonText,
            alignItems: isNextButton ? 'flex-start' : 'flex-end',
          }}
        >
          <div>{t(`${isNextButton ? 'common.next' : 'common.prev'}`)}</div>
          <div>{title}</div>
        </div>
      </div>
    </button>
  );
};

export default ButtonPaginationDesktop;
