import React from 'react';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { styles } from 'containers/LeftMenu/MainLinks.styled';
import { PEER_PRIMARY_COLOR } from 'style-constants';
import ItemMenu from './ItemMenu';

import Dropdown from 'components/Dropdown';
import AddCommentIcon from 'icons/AddComment';
import EditIcon from 'icons/Edit';
import PlusIcon from 'icons/Plus';
import {
  singleCommunityDocumentationPosition,
  singleCommunityColors,
  singleCommunityDocumentation,
} from 'utils/communityManagement';
import {
  DocumentationSection,
  PinnedArticleType,
} from 'pages/Documentation/types';
import { EditArticleType } from 'components/Documentation/types';

const documentationColors = singleCommunityDocumentation();

type DocumentationMenuSectionProps = {
  documentationMenu: Array<DocumentationSection>;
  isModeratorModeSingleCommunity: boolean;
  match: { params: { sectionId: string } };
  toggleEditDocumentation?: () => void;
  isEditDocumentation?: boolean;
  editArticle?: { id: string; parentId: string };
  isMenu?: boolean;
  setEditArticle?: (data: EditArticleType) => void;
  setViewArticle?: (id: string) => void;
  pinnedArticleMenuDraft?: (data: PinnedArticleType) => void;
  removeArticle?: (id: string) => void;
  pinnedItemMenuId: string;
  editOrder?: () => void;
  setPinned: React.Dispatch<React.SetStateAction<string>>;
  pinned: string;
};

const documentationPosition = singleCommunityDocumentationPosition();
const colors = singleCommunityColors();
const DOCUMENTATION_ID = '1';

const Documentation: React.FC<DocumentationMenuSectionProps> = ({
  documentationMenu = [],
  isModeratorModeSingleCommunity,
  match,
  toggleEditDocumentation,
  isEditDocumentation,
  editArticle = { id: '', parentId: '' },
  isMenu = true,
  setEditArticle,
  setViewArticle,
  pinnedArticleMenuDraft,
  removeArticle,
  pinnedItemMenuId,
  editOrder,
  setPinned,
  pinned,
}) => {
  const { t } = useTranslation();
  const clickDocumentation = () => (event: React.MouseEvent) => {
    const value = Number(event.currentTarget.getAttribute('value'));

    if (value === 1 && typeof toggleEditDocumentation === 'function') {
      toggleEditDocumentation();
    }

    if (value === 2 && typeof setEditArticle === 'function') {
      setEditArticle({
        id: '',
        parentId: '1',
        isEditArticle: true,
      });
    }

    if (value === 3 && typeof editOrder === 'function') {
      editOrder();
    }
  };

  const options = [
    {
      label: t('common.editDocumentation'),
      value: 1,
      icon: (
        <EditIcon
          stroke={documentationColors.linkColor}
          fill={documentationColors.iconsFillColor}
        />
      ),
    },
    {
      label: t('common.addNewArticle'),
      value: 2,
      icon: (
        <PlusIcon
          stroke={documentationColors.linkColor}
          fill={documentationColors.iconsFillColor}
        />
      ),
    },
    {
      label: t('common.editOrder'),
      value: 3,
      icon: (
        <EditIcon
          css={{ fill: 'rgba(118, 153, 255, 0.2)' }}
          stroke={documentationColors.linkColor}
          fill={documentationColors.iconsFillColor}
        />
      ),
    },
  ];

  return (
    <div>
      {!isEditDocumentation && documentationPosition !== 'top' && (
        <div css={css(styles.divider)} />
      )}
      <div
        className={cn('df jcsb pl15', {
          mt28:
            (pinnedItemMenuId !== '' && documentationPosition === 'top') ||
            documentationPosition !== 'top' ||
            isEditDocumentation,
        })}
        css={{
          ...styles.menuSectionTitle,
          ...styles.menuItem,
          ...(isEditDocumentation && { padding: '0 16px' }),
        }}
      >
        {t('common.documentation')}
        {Boolean(isModeratorModeSingleCommunity) && (
          <div className="dropdown-documentation db mr4">
            <Dropdown
              id="documentation_dropdown_id"
              button={
                <AddCommentIcon
                  css={{ color: colors.linkColor || PEER_PRIMARY_COLOR }}
                />
              }
              menu={options.map(
                (item, index) =>
                  (isEditDocumentation ? index !== 0 : index == 0) && (
                    <div
                      value={item.value}
                      css={css(styles.dropdownMenuItem)}
                      onClick={clickDocumentation()}
                    >
                      {item.icon}
                      <div>{item.label}</div>
                    </div>
                  ),
              )}
            />
          </div>
        )}
      </div>

      {documentationMenu.map((documentationSection) => (
        <ItemMenu
          key={documentationSection.id}
          item={documentationSection}
          isModeratorModeSingleCommunity={isModeratorModeSingleCommunity}
          match={match}
          isEditDocumentation={isEditDocumentation}
          editArticle={editArticle}
          isMenu={isMenu}
          parentId={DOCUMENTATION_ID}
          setEditArticle={setEditArticle}
          setViewArticle={setViewArticle}
          pinnedArticleMenuDraft={pinnedArticleMenuDraft}
          removeArticle={removeArticle}
          pinnedItemMenuId={pinnedItemMenuId}
          setPinned={setPinned}
          pinned={pinned}
          documentationMenu={documentationMenu}
        />
      ))}
      {!isEditDocumentation && documentationPosition === 'top' && (
        <div css={css(styles.divider)} />
      )}
    </div>
  );
};

export default Documentation;
