import React from 'react';

import * as routes from 'routes-config';
import { map, getFlatDataFromTree } from 'react-sortable-tree';

import { getIpfsHashFromBytes32 } from 'utils/ipfs';
import createdHistory from 'createdHistory';

import TextBlock from 'components/FormFields/TextBlock';
import H3 from 'components/H3';
import Wrapper from 'components/Header/Simple';
import {
  DocumentationArticle,
  DocumentationItemMenuType,
} from 'pages/Documentation/types';
import Button from 'common-components/Button';

import RiseUpIcon from 'icons/RiseUp';
import { translationMessages } from 'i18n';

import MarkdownPreviewBlock from 'components/TextEditor/MarkdownPreview';
import { extractStrings } from 'utils/url';
import TextNavbar from './TextNavbar/TextNavbar';

const styled = {
  border: 'none',
  boxShadow: 'none',
  '&:hover': {
    border: 'none',
    boxShadow: 'none',
  },
};

type ViewContentProps = {
  documentationArticle: DocumentationArticle;
  isEditDocumentation?: boolean;
  documentationMenu?: DocumentationItemMenuType;
  locale: string;
};

const ViewContent: React.FC<ViewContentProps> = ({
  documentationArticle,
  isEditDocumentation,
  documentationMenu,
  locale,
}): JSX.Element => {
  const headers = extractStrings(['#', '\n'])(
    `${documentationArticle?.content}\n` || '',
  );

  const treeArray = getFlatDataFromTree({
    treeData: documentationMenu?.map((node) => ({ ...node })),
    getKey: (node) => node.id,
    getNodeKey: ({ treeIndex }) => treeIndex,
    ignoreCollapsed: false,
  });
  const currentArticleId = documentationArticle?.id;
  const currentArrayIndex = treeArray.filter(
    (item) => item?.node.id == currentArticleId,
  )[0]?.treeIndex;
  const sliceTitle = (title: string): string =>
    title?.length < 26 ? title : title?.substr(0, 25) + '...';
  const isStartArticle = currentArrayIndex < 1;
  const isLastArticle = currentArrayIndex == treeArray.length - 1;

  const onClickPrevArticle = (): void => {
    const prevArrayId = treeArray.filter(
      (item) => item?.treeIndex == currentArrayIndex - 1,
    )[0]?.node.id;
    const ipfsHash = getIpfsHashFromBytes32(prevArrayId);
    createdHistory.push(routes.documentation(ipfsHash));
  };

  const onClickNextArticle = (): void => {
    const nextArrayId = treeArray.filter(
      (item) => item?.treeIndex == currentArrayIndex + 1,
    )[0]?.node.id;
    const ipfsHash = getIpfsHashFromBytes32(nextArrayId);
    createdHistory.push(routes.documentation(ipfsHash));
  };

  const onClickNextTitle = (): string => {
    const nextTitle = treeArray.filter(
      (item) => item?.treeIndex == currentArrayIndex + 1,
    )[0]?.node.title;
    return sliceTitle(nextTitle);
  };

  const onClickPrevTitle = (): string => {
    const prevTitle = treeArray.filter(
      (item) => item?.treeIndex == currentArrayIndex - 1,
    )[0]?.node.title;
    return sliceTitle(prevTitle);
  };

  return (
    <>
      <Wrapper
        className="mb-to-sm-0 mb-from-sm-3"
        css={{
          ...(isEditDocumentation && styled),
        }}
      >
        <H3>
          <span className="d-none d-md-inline-block">
            {documentationArticle?.title}
          </span>
        </H3>
      </Wrapper>
      <div className="df">
        <Wrapper
          css={{
            ...(isEditDocumentation && styled),
            minWidth: '0',
          }}
        >
          <MarkdownPreviewBlock content={documentationArticle?.content} />
        </Wrapper>
        {!isEditDocumentation && headers?.length > 1 && (
          <TextNavbar headers={headers} />
        )}
      </div>
      {!isEditDocumentation && (
        <Wrapper>
          <div
            className="df aic jcc full-width mb16 fww"
            css={{ '@media (min-width: 768px)': { flexWrap: 'nowrap' } }}
          >
            {!isStartArticle && (
              <div>
                <Button
                  variant="third"
                  icon={<RiseUpIcon className="icon" stroke="#282828" />}
                  className="df aic mr16"
                  css={{
                    border: '1px solid #282828',
                    color: '#282828',
                    justifyContent: `${
                      isLastArticle ? 'space-between' : 'flex-start'
                    }`,
                    textAlign: 'start',
                    width: `${isLastArticle ? '600px' : '300px'} !important`,
                    height: '60px',
                    '@media (max-width: 768px)': {
                      marginRight: '0px',
                      width: '300px !important',
                    },
                  }}
                  onClick={onClickPrevArticle}
                >
                  <div css={{ color: 'rgba(136 153 168 / 85%);' }}>
                    {translationMessages[locale][messages.documentationPrev.id]}
                  </div>
                  <div>{onClickPrevTitle()}</div>
                </Button>
              </div>
            )}
            {!isLastArticle && (
              <div>
                <Button
                  variant="third"
                  icon={
                    <RiseUpIcon
                      className="icon"
                      stroke="#282828"
                      css={{ transform: 'rotate(180deg)' }}
                    />
                  }
                  className="df aic ml16"
                  css={{
                    border: '1px solid #282828',
                    color: '#282828',
                    justifyContent: `${
                      isStartArticle ? 'space-between' : 'flex-start'
                    }`,
                    textAlign: 'start',
                    width: `${isStartArticle ? '600px' : '300px'} !important`,
                    height: '60px',
                    '@media (max-width: 768px)': {
                      margin: '10px 0px',
                      width: '300px !important',
                    },
                  }}
                  onClick={onClickNextArticle}
                >
                  <div css={{ color: 'rgba(136 153 168 / 85%);' }}>
                    {translationMessages[locale][messages.documentationNext.id]}
                  </div>
                  <div>{onClickNextTitle()}</div>
                </Button>
              </div>
            )}
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default ViewContent;
