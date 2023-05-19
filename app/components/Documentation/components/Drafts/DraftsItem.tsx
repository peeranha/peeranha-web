import React from 'react';
import { DocumentationSection } from 'app/pages/Documentation/types';
import { styles } from './Drafts.styled';
import EditIcon from 'icons/Edit';
import { EditArticleType } from 'components/Documentation/types';
import { singleCommunityDocumentation } from 'utils/communityManagement';

type DraftsItemProps = {
  item: DocumentationSection;
  level?: number;
  parentId: string;
  setEditArticle?: (data: EditArticleType) => void;
  setViewArticle?: (id: string) => void;
  draftsIds: Array<{ draftId: string; lastmod: string }>;
};

const documentationColors = singleCommunityDocumentation();

const DraftsItem: React.FC<DraftsItemProps> = ({
  item,
  parentId,
  setEditArticle,
  setViewArticle,
  draftsIds,
}) => {
  const editDraft = () => {
    if (typeof setEditArticle === 'function' && typeof setViewArticle === 'function') {
      setEditArticle({
        id: item.id,
        parentId,
        isEditArticle: true,
      });

      setViewArticle(item.id);
    }
  };

  const isDraft = draftsIds.find((draft) => draft.draftId === item.id);

  return (
    <>
      {isDraft && (
        <div
          className="df jcsb aic cup pr16 pl16 pt8 pb8"
          css={{
            ...styles.draftItem,
            ...styles.draftItemHover,
          }}
        >
          <div className="ovh mr12" css={styles.draftItemTitle} title={item.title}>
            {item.title}
          </div>
          <EditIcon
            onClick={editDraft}
            stroke={documentationColors.linkColor}
            fill={documentationColors.iconsFillColor}
          />
        </div>
      )}

      {item.children.length > 0 && (
        <div>
          {item.children.map((draftsSection: any) => (
            <DraftsItem
              key={draftsSection.id}
              item={draftsSection}
              parentId={item.id}
              setEditArticle={setEditArticle}
              setViewArticle={setViewArticle}
              draftsIds={draftsIds}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default DraftsItem;
