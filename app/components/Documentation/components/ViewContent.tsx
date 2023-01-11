import React from 'react';
import TextBlock from 'components/FormFields/TextBlock';
import H3 from 'components/H3';
import Wrapper from 'components/Header/Simple';
import { DocumentationArticle } from 'pages/Documentation/types';
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
};

const ViewContent: React.FC<ViewContentProps> = ({
  documentationArticle,
  isEditDocumentation,
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
          css={{
            ...(isEditDocumentation && styled),
            minWidth: '0',
          }}
        >
          <TextBlock content={documentationArticle?.content} />
        </Wrapper>
        {!isEditDocumentation && headers?.length > 1 && (
          <TextNavbar headers={headers} />
        )}
      </div>
    </>
  );
};

export default ViewContent;
