import React from 'react';
import { css } from '@emotion/react';
import { getFormattedDate } from 'utils/datetime';
import MarkdownPreviewBlock from 'components/TextEditor/MarkdownPreview';
import H3 from 'components/H3';
import { useTranslation } from 'react-i18next';
import Wrapper from 'components/Header/Simple';
import { DocumentationArticle } from 'pages/Documentation/types';
import { extractStrings } from 'utils/url';
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
  locale: string;
  isEditPost?: boolean;
};

const ViewContent: React.FC<ViewContentProps> = ({
  documentationArticle,
  isEditDocumentation,
  locale,
  isEditPost,
}): JSX.Element => {
  const { t } = useTranslation();
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
        <div>
          <H3>
            <span className="d-none d-md-inline-block">
              {documentationArticle?.title}
            </span>
          </H3>
          {documentationArticle?.lastmod &&
            (!isEditDocumentation || (isEditPost && isEditDocumentation)) && (
              <span
                className="d-none d-md-inline-block db mt8 fz14 light"
                css={css(styled.creationTime)}
              >
                {isEditDocumentation
                  ? t('post.lastEdited')
                  : t('common.lastUpdated')}{' '}
                {getFormattedDate(
                  documentationArticle.lastmod,
                  locale,
                  MONTH_3LETTERS__DAY_YYYY_TIME,
                )}
              </span>
            )}
        </div>
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
    </>
  );
};

export default ViewContent;
