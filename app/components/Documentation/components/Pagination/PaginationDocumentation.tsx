import React from 'react';

import { getIpfsHashFromBytes32 } from 'utils/ipfs';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import useMediaQuery from 'hooks/useMediaQuery';
import { getDataFromTree, getcurrentArrayIndex } from '../../helpers';
import { DocumentationItemMenuType } from 'pages/Documentation/types';
import ButtonPaginationDesktop from './ButtonPaginationDesktop';
import ButtonPaginationMobile from './ButtonPaginationMobile';
import { PREV_TYPE_BUTTON, NEXT_TYPE_BUTTON } from './constants';
import { styled } from './PaginationDocumentation.styled';

type PaginationDocumentationProps = {
  documentationMenu: DocumentationItemMenuType;
  id: number;
  onClickPaginationArticleEditDocumentation?: (arrayId: string) => void;
};

const PaginationDocumentation: React.FC<PaginationDocumentationProps> = ({
  documentationMenu,
  id,
  onClickPaginationArticleEditDocumentation,
}): JSX.Element => {
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const treeArray = getDataFromTree(documentationMenu);

  const currentArrayIndex = getcurrentArrayIndex(treeArray, id);
  const isStartArticle = currentArrayIndex < 1;
  const isLastArticle = currentArrayIndex === treeArray.length - 1;

  const getButtonContent = (typeButton: typeof PREV_TYPE_BUTTON | typeof NEXT_TYPE_BUTTON) => {
    const stepDirection = typeButton === PREV_TYPE_BUTTON ? -1 : +1;
    return treeArray.find((item) => item?.treeIndex === currentArrayIndex + stepDirection)?.node;
  };

  const onClickPaginationArticle =
    (typeButton: typeof PREV_TYPE_BUTTON | typeof NEXT_TYPE_BUTTON) => () => {
      const { id, title } = getButtonContent(typeButton);

      if (typeof onClickPaginationArticleEditDocumentation === 'function') {
        onClickPaginationArticleEditDocumentation(id);
        return;
      }
      const ipfsHash = getIpfsHashFromBytes32(id);
      createdHistory.push(routes.documentation(ipfsHash, title));
    };

  return (
    <>
      {isDesktop ? (
        <div
          css={{
            ...styled.paginationBlock,
            justifyContent: isStartArticle ? 'flex-end' : isLastArticle ? 'flex-start' : 'center',
          }}
        >
          <div css={isStartArticle && styled.viewBlock}>
            <ButtonPaginationDesktop
              typeButton={PREV_TYPE_BUTTON}
              onClickPaginationArticle={onClickPaginationArticle(PREV_TYPE_BUTTON)}
              title={getButtonContent(PREV_TYPE_BUTTON)?.title}
            />
          </div>
          <div css={isLastArticle && styled.viewBlock}>
            <ButtonPaginationDesktop
              typeButton={NEXT_TYPE_BUTTON}
              onClickPaginationArticle={onClickPaginationArticle(NEXT_TYPE_BUTTON)}
              title={getButtonContent(NEXT_TYPE_BUTTON)?.title}
            />
          </div>
        </div>
      ) : (
        <ButtonPaginationMobile
          onClickPaginationArticle={onClickPaginationArticle}
          title={getButtonContent(!isLastArticle ? NEXT_TYPE_BUTTON : PREV_TYPE_BUTTON)?.title}
          isStartArticle={isStartArticle}
          isLastArticle={isLastArticle}
        />
      )}
    </>
  );
};
export default PaginationDocumentation;
