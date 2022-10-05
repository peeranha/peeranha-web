import React from 'react';
import { css } from '@emotion/react';
import { FormattedMessage } from 'react-intl';
import { styles } from 'containers/LeftMenu/MainLinks.styled';
import messages from 'common-messages';
import { PEER_PRIMARY_COLOR } from 'style-constants';
import ItemMenu from './DocumentationMenu';

import Dropdown from 'common-components/Dropdown';
import AddCommentIcon from 'icons/AddComment';
import EditIcon from 'icons/Edit';
import PlusIcon from 'icons/Plus';

import { DocumentationSection } from 'pages/Documentation/types';

type DocumentationMenuSectionProps = {
  documentationMenu: Array<DocumentationSection>;
  isModeratorModeSingleCommunity: boolean;
  match: { params: { sectionId: string } };
  toggleEditDocumentation: () => void;
};

const Documentation: React.FC<DocumentationMenuSectionProps> = ({
  documentationMenu = [],
  isModeratorModeSingleCommunity,
  match,
  toggleEditDocumentation,
}) => (
  <>
    <div css={css(styles.divider)} />
    <div
      className="df jcsb mt28 pl15"
      css={{ ...styles.menuSectionTitle, ...styles.menuItem }}
    >
      <FormattedMessage {...messages.documentation} />
      {Boolean(isModeratorModeSingleCommunity) && (
        <div className="dropdown-documentation db mr4">
          <Dropdown
            trigger={<AddCommentIcon css={{ color: PEER_PRIMARY_COLOR }} />}
            options={[
              {
                label: 'Edit Documentation',
                value: 1,
                icon: <EditIcon />,
              },
              {
                label: 'Add new article',
                value: 2,
                icon: <PlusIcon />,
              },
              {
                label: 'Edit order',
                value: 3,
                icon: <EditIcon />,
              },
            ]}
            isMultiple={false}
            isEqualWidth={false}
            onSelect={toggleEditDocumentation}
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
      />
    ))}
  </>
);

export default Documentation;
