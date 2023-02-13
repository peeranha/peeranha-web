import React from 'react';

import H3 from 'components/H3';
import Wrapper from 'components/Header/Simple';
import Pagination from './Pagination';
import {
  DocumentationArticle,
  DocumentationItemMenuType,
} from 'pages/Documentation/types';

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
};

const ViewContent: React.FC<ViewContentProps> = ({
  documentationArticle,
  isEditDocumentation,
  documentationMenu,
}): JSX.Element => {
  const headers = extractStrings(['#', '\n'])(
    `${documentationArticle?.content}\n` || '',
  );
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
          className="fdc"
          css={{
            ...(isEditDocumentation && styled),
            minWidth: '0',
          }}
        >
          <MarkdownPreviewBlock content={documentationArticle?.content} />

          {!isEditDocumentation && (
            <Pagination
              documentationMenu={documentationMenu}
              id={documentationArticle?.id}
            />
          )}
        </Wrapper>

        {!isEditDocumentation && headers?.length > 1 && (
          <TextNavbar headers={headers} />
        )}
      </div>
    </>
  );
};

export default ViewContent;
