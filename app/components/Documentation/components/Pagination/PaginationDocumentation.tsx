import React from 'react';

import { getIpfsHashFromBytes32 } from 'utils/ipfs';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import useMediaQuery from 'hooks/useMediaQuery';
import { getDataFromTree, getcurrentArrayIndex } from '../../helpers';
import { DocumentationItemMenuType } from 'pages/Documentation/types';
import ButtonPaginationDesktop from './ButtonPaginationDesktop';
import ButtonPaginationMobile from './ButtonPaginationMobile';

type PaginationDocumentationProps = {
  documentationMenu: DocumentationItemMenuType;
  id: string;
  onClickPaginationArticleEditDocumentation?: () => void;
};

const PaginationDocumentation: React.FC<PaginationDocumentationProps> = ({
  documentationMenu,
  id,
  onClickPaginationArticleEditDocumentation,
}): JSX.Element => {
  const isDesktop = useMediaQuery('(min-width: 577px)');
  const treeArray = getDataFromTree(documentationMenu);

  const currentArrayIndex = getcurrentArrayIndex(treeArray, id);

  const isStartArticle = currentArrayIndex < 1;
  const isLastArticle = currentArrayIndex === treeArray.length - 1;
  const TITLE_LENGTH = isDesktop ? 26 : 50;
  const TITLE_LAST_INDEX = isDesktop ? 25 : 49;
  const TITLE_START_INDEX = 0;
  const TITLE_END = '...';
  const NEXT_TYPE_BUTTON = 'next';
  const PREV_TYPE_BUTTON = 'prev';

  const onClickPaginationArticle = (typeButton: 'prev' | 'next') => () => {
    const stepDirection = typeButton === PREV_TYPE_BUTTON ? -1 : +1;
    const arrayId = treeArray.find(
      (item) => item?.treeIndex === currentArrayIndex + stepDirection,
    )?.node.id;
    const arrayTitle = treeArray.find(
      (item) => item?.treeIndex === currentArrayIndex + stepDirection,
    )?.node.title;
    const ipfsHash = getIpfsHashFromBytes32(arrayId);
    createdHistory.push(routes.documentation(ipfsHash, arrayTitle));
  };

  const getcurrentArrayTitle = (typeButton: 'prev' | 'next') => {
    const stepDirection = typeButton === PREV_TYPE_BUTTON ? -1 : +1;
    const title = treeArray?.find(
      (item) => item?.treeIndex === currentArrayIndex + stepDirection,
    )?.node.title;
    return title?.length < TITLE_LENGTH
      ? title
      : title?.substr(TITLE_START_INDEX, TITLE_LAST_INDEX) + TITLE_END;
  };
  return (
    <>
      {isDesktop ? (
        <div
          className={`df aic ${
            isStartArticle ? 'jcfe' : isLastArticle ? 'jcfs' : 'jcc'
          } full-width mb16 mt32 fww`}
        >
          <div className={`${isStartArticle ? 'dn' : null}`}>
            <ButtonPaginationDesktop
              currentArrayIndex={currentArrayIndex}
              treeArray={treeArray}
              onClickPaginationArticle={
                onClickPaginationArticleEditDocumentation ||
                onClickPaginationArticle
              }
              getcurrentArrayTitle={getcurrentArrayTitle}
              NEXT_TYPE_BUTTON={NEXT_TYPE_BUTTON}
              PREV_TYPE_BUTTON={PREV_TYPE_BUTTON}
            />
          </div>
          <div className={`${isLastArticle ? 'dn' : null}`}>
            <ButtonPaginationDesktop
              next
              currentArrayIndex={currentArrayIndex}
              treeArray={treeArray}
              onClickPaginationArticle={
                onClickPaginationArticleEditDocumentation ||
                onClickPaginationArticle
              }
              getcurrentArrayTitle={getcurrentArrayTitle}
              NEXT_TYPE_BUTTON={NEXT_TYPE_BUTTON}
              PREV_TYPE_BUTTON={PREV_TYPE_BUTTON}
            />
          </div>
        </div>
      ) : (
        <ButtonPaginationMobile
          currentArrayIndex={currentArrayIndex}
          treeArray={treeArray}
          onClickPaginationArticle={onClickPaginationArticle}
          getcurrentArrayTitle={getcurrentArrayTitle}
          NEXT_TYPE_BUTTON={NEXT_TYPE_BUTTON}
          PREV_TYPE_BUTTON={PREV_TYPE_BUTTON}
          isStartArticle={isStartArticle}
          isLastArticle={isLastArticle}
        />
      )}
    </>
  );
};
export default PaginationDocumentation;
