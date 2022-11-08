import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from 'common-messages';
import { styles } from './Drafts.styled';
import DraftsItem from './DraftsItem';

import { DocumentationSection } from 'pages/Documentation/types';
import { EditArticleType } from 'components/Documentation/types';

type DraftsMenuSectionProps = {
  draftsMenu: Array<DocumentationSection>;
  setEditArticle?: (data: EditArticleType) => void;
  setViewArticle?: (id: string) => void;
  draftsIds: Array<string>;
};

const DOCUMENTATION_ID = '1';

const Drafts: React.FC<DraftsMenuSectionProps> = ({
  draftsMenu,
  setEditArticle,
  setViewArticle,
  draftsIds,
}) => (
  <div>
    <div
      className="mt28 pl15 pb12"
      css={{
        ...styles.draftsSectionTitle,
        ...styles.draftItem,
      }}
    >
      <FormattedMessage id={messages.drafts.id} />
    </div>

    {draftsMenu.map((draftsSection) => (
      <DraftsItem
        key={draftsSection.id}
        item={draftsSection}
        parentId={DOCUMENTATION_ID}
        setEditArticle={setEditArticle}
        setViewArticle={setViewArticle}
        draftsIds={draftsIds}
      />
    ))}
  </div>
);

export default Drafts;
