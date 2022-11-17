import React from 'react';
import cn from 'classnames';
import { DocumentationSection } from 'pages/Documentation/types';

type ItemProps = {
  item: DocumentationSection;
  level: number;
  match: { params: { sectionId: string } };
  editArticleId?: string;
  isOpen: boolean;
  onClickArticle?: (id: string) => void;
};

const Item: React.FC<ItemProps> = ({
  item,
  isOpen,
  match,
  editArticleId,
  level,
  onClickArticle,
}) => {
  const onClick = () => {
    if (typeof onClickArticle === 'function') {
      onClickArticle(item.id);
    }
  };

  return (
    <div
      className={cn('p0')}
      css={{
        padding: '7px 0',
        fontSize: 16,
        lineHeight: '20px',
        flexGrow: 1,
        ...(level > 0 && {
          color: '#7B7B7B',
        }),
        ...(level === 0 && { padding: '12px 0' }),
        ...((isOpen ||
          match.params.sectionId === item.id ||
          editArticleId === item.id) && {
          fontWeight: 700,
          color: 'var(--color-black)',
        }),
      }}
      onClick={onClick}
    >
      {item.title}
    </div>
  );
};

export default Item;