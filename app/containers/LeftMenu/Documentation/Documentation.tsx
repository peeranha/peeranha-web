import React from 'react';
import { css } from '@emotion/react';
import { FormattedMessage } from 'react-intl';
import { styles } from 'containers/LeftMenu/MainLinks.styled';
import messages from 'common-messages';
import { PEER_PRIMARY_COLOR } from 'style-constants';
import ItemMenu from './ItemMenu';

import Dropdown from 'common-components/Dropdown';
import AddCommentIcon from 'icons/AddComment';
import EditIcon from 'icons/Edit';
import PlusIcon from 'icons/Plus';

import { DocumentationSection } from 'pages/Documentation/types';

type DocumentationMenuSectionProps = {
  documentationMenu: Array<DocumentationSection>;
  isModeratorModeSingleCommunity: boolean;
  match: { params: { sectionId: string } };
  toggleEditDocumentation?: () => void;
  isEditDocumentation: boolean;
  editArticle?: { id: string; parentId: string };
  isMenu?: boolean;
  setEditArticle?: (data: {
    id: string;
    parentId: string;
    isEditArticle: boolean;
  }) => void;
  setViewArticle?: (id: string) => void;
};

const EditDocumentation = [
  {
    label: 'Edit Documentation',
    value: 1,
    icon: <EditIcon />,
  },
];

const DropdownDocumentation = [
  {
    label: 'Add new article',
    value: 2,
    icon: <PlusIcon />,
  },
  // {
  //   label: 'Edit order',
  //   value: 3,
  //   icon: <EditIcon />,
  // },
];

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
}) => {
  const clickDocumentation = () => (value: number) => {
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
  };

  return (
    <>
      {!isEditDocumentation && <div css={css(styles.divider)} />}
      <div
        className="df jcsb mt28 pl15"
        css={{
          ...styles.menuSectionTitle,
          ...styles.menuItem,
          ...(isEditDocumentation && { padding: '0 16px' }),
        }}
      >
        <FormattedMessage id={messages.documentation.id} />
        {Boolean(isModeratorModeSingleCommunity) && (
          <div className="dropdown-documentation db mr4">
            <Dropdown
              trigger={<AddCommentIcon css={{ color: PEER_PRIMARY_COLOR }} />}
              options={
                isEditDocumentation ? DropdownDocumentation : EditDocumentation
              }
              isMultiple={false}
              isEqualWidth={false}
              onSelect={clickDocumentation()}
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
        />
      ))}
    </>
  );
};

export default Documentation;
