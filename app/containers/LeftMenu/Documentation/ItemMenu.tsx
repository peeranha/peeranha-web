import React from 'react';
import cn from 'classnames';
import useTrigger from 'hooks/useTrigger';
import { PEER_PRIMARY_COLOR } from 'style-constants';
import { DocumentationSection } from 'pages/Documentation/types';
import ArrowDownIcon from 'icons/ArrowDown';
import Dropdown from 'common-components/Dropdown';
import AddSubArticleIcon from 'icons/AddSubArticle';
import EditIcon from 'icons/Edit';
import DeleteIcon from 'icons/Delete';
import AddCommentIcon from 'icons/AddComment';
import Link from './Link';
import Item from './Item';

type DocumentationMenuProps = {
  item: DocumentationSection;
  level?: number;
  isModeratorModeSingleCommunity: boolean;
  match: { params: { sectionId: string } };
  isEditDocumentation?: boolean;
  editArticle?: { id: string; parentId: string };
  isMenu?: boolean;
  setEditDocumentation?: (id: string, parentId: string) => void;
  parentId: string;
  viewArticle?: (id: string) => void;
  setEditArticle?: (value: boolean) => void;
};

const ItemMenu: React.FC<DocumentationMenuProps> = ({
  item,
  level = 0,
  isModeratorModeSingleCommunity,
  match,
  isEditDocumentation,
  editArticle,
  isMenu = true,
  setEditDocumentation,
  parentId,
  viewArticle,
  setEditArticle,
}) => {
  const [isOpen, open, close] = useTrigger(false);

  const onSelect = (value: number) => {
    if (value === 1 && typeof setEditDocumentation === 'function') {
      setEditDocumentation('', item.id);
    }

    if (
      value === 2 &&
      typeof setEditDocumentation === 'function' &&
      typeof setEditArticle === 'function'
    ) {
      setEditDocumentation(item.id, parentId);
      setEditArticle(true);
    }
  };

  return (
    <>
      <div
        className={cn('df jcsb aic cup')}
        css={{
          padding: '7px 0',
          ...(isEditDocumentation && { padding: '7px 16px' }),
          ...(level === 0 && { padding: '12px 0' }),
          ...(level === 0 && isEditDocumentation && { padding: '12px 16px' }),
          paddingLeft: 15 + 16 * level,
          ...((match.params.sectionId === item.id ||
            editArticle?.id === item.id) && {
            background: 'rgba(53, 74, 137, 0.11)',
            borderLeft: '3px solid #5065A5',
            paddingLeft: 12 + 16 * level,
          }),
          '&:hover .dropdown-documentation': {
            visibility: 'visible',
          },
          '&:hover': {
            background: 'rgba(53, 74, 137, 0.05)',
          },
          '&:hover a': {
            color: '#576FED',
          },
        }}
      >
        {isMenu ? (
          <Link
            item={item}
            isOpen={isOpen}
            match={match}
            editArticleId={editArticle?.id}
            level={level}
          />
        ) : (
          <Item
            item={item}
            isOpen={isOpen}
            match={match}
            editArticleId={editArticle?.id}
            level={level}
            onClickArticle={viewArticle}
          />
        )}

        <div className="df">
          {isEditDocumentation && (
            <div
              className="dropdown-documentation ml4 mr4"
              css={{
                visibility: 'hidden',
              }}
            >
              <Dropdown
                trigger={<AddCommentIcon css={{ color: PEER_PRIMARY_COLOR }} />}
                options={[
                  {
                    label: 'Add a new sub-article',
                    value: 1,
                    icon: <AddSubArticleIcon />,
                  },
                  {
                    label: 'Edit content',
                    value: 2,
                    icon: <EditIcon />,
                  },
                  {
                    label: 'Delete',
                    value: 3,
                    icon: <DeleteIcon />,
                  },
                ]}
                isMultiple={false}
                isEqualWidth={false}
                onSelect={onSelect}
              />
            </div>
          )}

          {item.children.length > 0 && (
            <ArrowDownIcon
              css={{
                color: '#576FED',
                width: 18,
                height: 18,
                transform: 'rotate(-90deg)',
                transition: 'transform 0.25s',
                marginLeft: 10,
                ...(isOpen && { transform: 'rotate(0deg)' }),
              }}
              className="mr4 cup"
              onClick={isOpen ? close : open}
            />
          )}
        </div>
      </div>

      {item.children.length > 0 && isOpen && (
        <div>
          {item.children.map((itemMenu: any) => (
            <ItemMenu
              key={itemMenu.id}
              item={itemMenu}
              level={level + 1}
              isModeratorModeSingleCommunity={isModeratorModeSingleCommunity}
              match={match}
              isMenu={isMenu}
              parentId={item.id}
              isEditDocumentation={isEditDocumentation}
              setEditDocumentation={setEditDocumentation}
              viewArticle={viewArticle}
              editArticle={editArticle}
              setEditArticle={setEditArticle}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ItemMenu;
