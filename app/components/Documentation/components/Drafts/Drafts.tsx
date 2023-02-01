import React from 'react';
import { useTranslation } from 'react-i18next';
import { DocumentationSection } from 'app/pages/Documentation/types';
import { EditArticleType } from 'components/Documentation/types';
import { styles } from './Drafts.styled';
import DraftsItem from './DraftsItem';

type DraftsMenuSectionProps = {
  draftsMenu: Array<DocumentationSection>;
  setEditArticle?: (data: EditArticleType) => void;
  setViewArticle?: (id: string) => void;
  draftsIds: Array<{ draftId: string; lastmod: string }>;
};

const DOCUMENTATION_ID = '1';

const Drafts: React.FC<DraftsMenuSectionProps> = ({
  draftsMenu,
  setEditArticle,
  setViewArticle,
  draftsIds,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <div
        className="mt28 pl15 pb12"
        css={{
          ...styles.draftsSectionTitle,
          ...styles.draftItem,
        }}
      >
        {t('common.drafts')}
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
};

export default Drafts;
