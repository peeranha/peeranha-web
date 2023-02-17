import React from 'react';

import { getIpfsHashFromBytes32 } from 'utils/ipfs';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import useMediaQuery from 'hooks/useMediaQuery';
import { getDataFromTree, getcurrentArrayIndex } from '../../helpers';
import { DocumentationItemMenuType } from 'pages/Documentation/types';
import ButtonPaginationDesktop from './ButtonPaginationDesktop';
import ButtonPaginationMobile from './ButtonPaginationMobile';
import { PREV_TYPE_BUTTON } from './constants';

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
    return title;
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
            />
          </div>
        </div>
      ) : (
        <ButtonPaginationMobile
          currentArrayIndex={currentArrayIndex}
          treeArray={treeArray}
          onClickPaginationArticle={onClickPaginationArticle}
          getcurrentArrayTitle={getcurrentArrayTitle}
          isStartArticle={isStartArticle}
          isLastArticle={isLastArticle}
        />
      )}
    </>
  );
};
export default PaginationDocumentation;
