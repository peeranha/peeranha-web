import React from 'react';
import { css } from '@emotion/react';
import { getFormattedDate } from 'utils/datetime';
import H3 from 'components/H3';
import { useTranslation } from 'react-i18next';
import Wrapper from 'components/Header/Simple';
import { DocumentationArticle, DocumentationItemMenuType } from 'pages/Documentation/types';

import MarkdownPreviewBlock from 'components/TextEditor/MarkdownPreview';
import { extractStrings } from 'utils/url';
import Pagination from './Pagination';
import TextNavbar from './TextNavbar/TextNavbar';
import { MONTH_3LETTERS__DAY_YYYY_TIME } from '../../../utils/constants';
import { TEXT_SECONDARY } from '../../../style-constants';

const styled = {
  border: 'none',
  boxShadow: 'none',
  '&:hover': {
    border: 'none',
    boxShadow: 'none',
  },
  creationTime: {
    lineHeight: '15px',
    color: TEXT_SECONDARY,

    '@media only screen and (min-width: 768px)': {
      fontSize: '14px',
      lineHeight: '18px',
    },
  },
};

type ViewContentProps = {
  documentationArticle: DocumentationArticle;
  isEditDocumentation?: boolean;
  documentationMenu?: DocumentationItemMenuType;
  locale: string;
  isEditPost?: boolean;
};

const ViewContent: React.FC<ViewContentProps> = ({
  documentationArticle,
  isEditDocumentation,
  documentationMenu,
  locale,
  isEditPost,
}): JSX.Element => {
  const { t } = useTranslation();
  const headers = extractStrings(['#', '\n'])(`${documentationArticle?.content}\n` || '');
  return (
    <>
      <Wrapper
        className="mb-to-sm-0 mb-from-sm-3"
        css={{
          ...(isEditDocumentation && styled),
          width: '100%',
        }}
      >
        <div>
          <H3>
            <span className="d-none d-md-inline-block">{documentationArticle?.title}</span>
          </H3>
          {documentationArticle?.lastmod &&
            (!isEditDocumentation || (isEditPost && isEditDocumentation)) && (
              <span
                className="d-none d-md-inline-block db mt8 fz14 light"
                css={css(styled.creationTime)}
              >
                {isEditDocumentation ? t('post.lastEdited') : t('common.lastUpdated')}{' '}
                {getFormattedDate(
                  documentationArticle.lastmod,
                  locale,
                  MONTH_3LETTERS__DAY_YYYY_TIME,
                )}
              </span>
            )}
        </div>
      </Wrapper>
      <div className="df" css={{ marginBottom: '50px' }}>
        <Wrapper
          className="fdc"
          css={{
            ...(isEditDocumentation && styled),
          }}
        >
          <MarkdownPreviewBlock content={documentationArticle?.content} />

          {!isEditDocumentation && (
            <Pagination documentationMenu={documentationMenu} id={documentationArticle?.id} />
          )}
        </Wrapper>

        {!isEditDocumentation && headers?.length > 1 && <TextNavbar headers={headers} />}
      </div>
    </>
  );
};

export default ViewContent;
