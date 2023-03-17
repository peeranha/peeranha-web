import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import useTrigger from 'hooks/useTrigger';
import { PEER_PRIMARY_COLOR } from 'style-constants';
import {
  DocumentationSection,
  DocumentationItemMenuType,
} from 'pages/Documentation/types';
import ArrowDownIcon from 'icons/ArrowDown';
import Dropdown from 'components/Dropdown';
import AddSubArticleIcon from 'icons/AddSubArticle';
import EditIcon from 'icons/Edit';
import DeleteIcon from 'icons/Delete';
import PinIcon from 'icons/Pin';
import AddCommentIcon from 'icons/AddComment';
import Link from './Link';
import Item from './Item';
import { getBytes32FromIpfsHash } from 'utils/ipfs';
import {
  singleCommunityColors,
  singleCommunityDocumentation,
} from 'utils/communityManagement';
import { isEditableChildItem } from 'components/Documentation/helpers';
import { styles } from 'containers/LeftMenu/MainLinks.styled';

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
  setEditArticle?: (data: {
    id: string;
    parentId: string;
    isEditArticle: boolean;
  }) => void;
  setViewArticle?: (id: string) => void;
  pinnedArticleMenuDraft?: (data: { id: string; title: string }) => void;
  removeArticle?: (id: string) => void;
  pinnedItemMenuId: string;
  setPinned: React.Dispatch<React.SetStateAction<string>>;
  pinned: string;
  documentationMenu: Array<DocumentationItemMenuType>;
};

const colors = singleCommunityColors();
const documentationColors = singleCommunityDocumentation();

const ItemMenu: React.FC<DocumentationMenuProps> = ({
  item,
  level = 0,
  isModeratorModeSingleCommunity,
  match,
  isEditDocumentation,
  editArticle,
  isMenu = true,
  parentId,
  setEditArticle,
  setViewArticle,
  pinnedArticleMenuDraft,
  removeArticle,
  pinnedItemMenuId,
  setPinned,
  pinned,
  documentationMenu,
}) => {
  const { t } = useTranslation();
  const [isOpen, open, close] = useTrigger(false);
  const route = window.location.pathname;
  const startDocumentionPostLight =
    pinnedItemMenuId == ''
      ? !isEditDocumentation && documentationMenu[0]?.id === item.id
      : item.id === pinnedItemMenuId;
  useEffect(() => {
    const isEditableChildren = isEditableChildItem(item, editArticle?.id);
    if (isEditableChildren) {
      open();
    }
  }, [editArticle?.id, item.children]);

  const onSelect = (event: React.MouseEvent) => {
    const value = Number(event.currentTarget.getAttribute('value'));
    if (value === 1 && typeof setEditArticle === 'function') {
      setEditArticle({
        id: '',
        parentId: item.id,
        isEditArticle: true,
      });
    }

    if (
      value === 2 &&
      typeof setEditArticle === 'function' &&
      typeof setViewArticle === 'function'
    ) {
      setEditArticle({
        id: item.id,
        parentId,
        isEditArticle: true,
      });
      setViewArticle(item.id);
    }

    if (value === 3 && typeof pinnedArticleMenuDraft === 'function') {
      pinnedArticleMenuDraft({
        id: pinnedItemMenuId === item.id ? '' : item.id,
        title: pinnedItemMenuId === item.id ? '' : item.title,
      });
      pinned == item.id ? setPinned('') : setPinned(item.id);
    }

    if (value === 4 && typeof removeArticle === 'function') {
      removeArticle(item.id);
    }
  };

  const onClickArticle = () => {
    if (
      typeof setViewArticle === 'function' &&
      typeof setEditArticle === 'function'
    ) {
      setViewArticle(item.id);
      setEditArticle({
        id: item.id,
        parentId,
        isEditArticle: false,
      });
    }
  };

  const options = [
    {
      label: t('common.addNewSubArticle'),
      value: 1,
      icon: (
        <AddSubArticleIcon
          stroke={documentationColors.linkColor}
          fill={documentationColors.iconsFillColor}
        />
      ),
    },
    {
      label: t('common.editContent'),
      value: 2,
      icon: (
        <EditIcon
          stroke={documentationColors.linkColor}
          fill={documentationColors.iconsFillColor}
        />
      ),
    },
    {
      label: t(pinned === item.id ? 'common.unpin' : 'common.pin'),
      value: 3,
      icon: (
        <PinIcon
          css={{ fill: 'rgba(118, 153, 255, 0.2)' }}
          stroke={documentationColors.linkColor}
          fill={documentationColors.iconsFillColor}
        />
      ),
    },
    {
      label: t('common.delete'),
      value: 4,
      icon: (
        <DeleteIcon
          stroke={documentationColors.linkColor}
          fill={documentationColors.iconsFillColor}
        />
      ),
    },
  ];

  return (
    <>
      <div
        className={cn('df jcsb aic cup')}
        css={{
          ...(isEditDocumentation && { padding: '0 16px' }),
          ...(level === 0 && isEditDocumentation && { padding: '0 16px' }),
          paddingLeft: 15 + 16 * level,
          ...(((match.params.sectionId &&
            getBytes32FromIpfsHash(match.params.sectionId) === item.id) ||
            editArticle?.id === item.id ||
            (route == '/' && startDocumentionPostLight)) && {
            background: 'rgba(53, 74, 137, 0.11)',
            borderLeft: `3px solid ${colors.linkColor || '#5065A5'}`,
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
            pinnedItemMenuId={pinnedItemMenuId}
            documentationMenu={documentationMenu}
            startDocumentionPostLight={startDocumentionPostLight}
          />
        ) : (
          <Item
            item={item}
            isOpen={isOpen}
            match={match}
            editArticleId={editArticle?.id}
            level={level}
            onClickArticle={onClickArticle}
            pinnedItemMenuId={pinnedItemMenuId}
            pinned={pinned}
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
                id="itemMenu_dropdown_id"
                button={
                  <AddCommentIcon
                    css={{ color: colors.linkColor || PEER_PRIMARY_COLOR }}
                  />
                }
                menu={options.map((item) => (
                  <div
                    value={item.value}
                    css={css(styles.dropdownMenuItem)}
                    onClick={onSelect}
                  >
                    {item.icon}
                    <div>{item.label}</div>
                  </div>
                ))}
              />
            </div>
          )}

          {item.children.length > 0 && (
            <ArrowDownIcon
              css={{
                color: colors.linkColor || '#576FED',
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
              setViewArticle={setViewArticle}
              editArticle={editArticle}
              setEditArticle={setEditArticle}
              pinnedArticleMenuDraft={pinnedArticleMenuDraft}
              removeArticle={removeArticle}
              pinnedItemMenuId={pinnedItemMenuId}
              setPinned={setPinned}
              pinned={pinned}
              documentationMenu={documentationMenu}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ItemMenu;
