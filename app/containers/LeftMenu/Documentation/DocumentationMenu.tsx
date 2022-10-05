import React, { useEffect, useState } from 'react';
import * as routes from 'routes-config';
import cn from 'classnames';
import useTrigger from 'hooks/useTrigger';
import { PEER_PRIMARY_COLOR } from 'style-constants';
import { A1 } from 'containers/LeftMenu/MainLinks';
import { DocumentationSection } from 'pages/Documentation/types';
import ArrowDownIcon from 'icons/ArrowDown';
import Dropdown from 'common-components/Dropdown';
import AddSubArticleIcon from 'icons/AddSubArticle';
import EditIcon from 'icons/Edit';
import DeleteIcon from 'icons/Delete';
import AddCommentIcon from 'icons/AddComment';

type DocumentationMenuProps = {
  item: DocumentationSection;
  level: number;
  isModeratorModeSingleCommunity: boolean;
  match: { params: { sectionId: string } };
};

const ItemMenu: React.FC<DocumentationMenuProps> = ({
  item,
  level = 0,
  isModeratorModeSingleCommunity,
  match,
}) => {
  const [isOpen, open, close] = useTrigger(false);

  return (
    <>
      <div
        className={cn('df jcsb aic cup')}
        css={{
          padding: '7px 0',
          ...(level === 0 && { padding: '12px 0' }),
          paddingLeft: 15 + 16 * level,
          ...(match.params.sectionId === item.id && {
            background: 'rgba(53, 74, 137, 0.11)',
            borderLeft: '3px solid #5065A5',
            paddingLeft: 12 + 16 * level,
            cursor: 'default',
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
        <A1
          to={routes.documentation(item.id)}
          name={`documentation/${item.id}`}
          className={cn('p0')}
          css={{
            fontSize: 16,
            lineHeight: '20px',
            ...(level > 0 && {
              fontSize: 14,
              lineHeight: '18px',
              color: '#7B7B7B',
            }),
            ...((isOpen || match.params.sectionId === item.id) && {
              fontWeight: 700,
              color: 'var(--color-black)',
            }),
          }}
        >
          {item.title}
        </A1>
        <div className="df">
          {Boolean(isModeratorModeSingleCommunity) && (
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
                    label: 'Edit a new sub-article',
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
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ItemMenu;
