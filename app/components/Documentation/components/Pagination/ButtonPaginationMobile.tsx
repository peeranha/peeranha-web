import React from 'react';
import { useTranslation } from 'react-i18next';
import ArrowDownIcon from 'icons/ArrowDown';
import { graphCommunityColors } from 'utils/communityManagement';
import { CaretDownGraph } from 'components/icons';
import { ButtonPaginationProps } from 'components/Documentation/types';
import { NEXT_TYPE_BUTTON, PREV_TYPE_BUTTON } from './constants';
import { styled } from './PaginationDocumentation.styled';

const graphCommunity = graphCommunityColors();

const ButtonPaginationMobile: React.FC<ButtonPaginationProps> = ({
  isStartArticle,
  isLastArticle,
  onClickPaginationArticle,
  title,
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div css={styled.paginationButtonBlockMobile}>
      <div>
        <div>
          <div css={styled.paginationButtonTextMobile}>
            <div>{t(`${!isLastArticle ? 'common.next' : 'common.prev'}`)}</div>
            <div>{title}</div>
          </div>
        </div>
        <div css={styled.arrowMobile}>
          {!isLastArticle &&
            (graphCommunity ? (
              <CaretDownGraph
                size={[24, 24]}
                onClick={onClickPaginationArticle(NEXT_TYPE_BUTTON)}
              />
            ) : (
              <ArrowDownIcon onClick={onClickPaginationArticle(NEXT_TYPE_BUTTON)} />
            ))}
          {!isStartArticle &&
            (graphCommunity ? (
              <CaretDownGraph
                size={[24, 24]}
                onClick={onClickPaginationArticle(PREV_TYPE_BUTTON)}
              />
            ) : (
              <ArrowDownIcon onClick={onClickPaginationArticle(PREV_TYPE_BUTTON)} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ButtonPaginationMobile;
