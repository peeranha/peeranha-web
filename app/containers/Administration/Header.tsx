import { useTranslation } from 'react-i18next';
import React from 'react';

import { MediumIconStyled } from 'components/Icon/MediumIcon';
import Wrapper from 'components/Header/Simple';
import Icon from 'components/Icon';
import H3 from 'components/H3';

import AddRoleForm from 'containers/Administration/AddRoleForm';
import { Moderator } from 'containers/Administration/types';

import AddModeratorButton from 'containers/Administration/AddModeratorButton';

import { singleCommunityColors } from 'utils/communityManagement';
import { BORDER_PRIMARY, ICON_TRASPARENT_BLUE } from 'style-constants';
import { Administration } from 'icons/index';
import { css } from '@emotion/react';

const colors = singleCommunityColors();

const customColor = colors.linkColor || BORDER_PRIMARY;

type HeaderProps = {
  locale: string;
  single?: number;
  moderators: Array<Moderator>;
  addRole: (userAddress: string, role: number, communityId: number) => void;
  addRoleLoading: boolean;
};

export const Header: React.FC<HeaderProps> = ({
  locale,
  single,
  moderators,
  addRole,
  addRoleLoading,
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Wrapper className="mb-to-sm-0 mb-from-sm-3">
      <H3>
        <div
          css={css`
            .fill {
              fill: ${customColor};
            }
            .stroke {
              stroke: ${customColor};
            }

            .semitransparent {
              fill: ${colors.transparentIconColor || ICON_TRASPARENT_BLUE};
            }
          `}
        >
          <MediumIconStyled>
            <Administration />
          </MediumIconStyled>
        </div>
        {t('common.administration')}
      </H3>
      <AddRoleForm
        locale={locale}
        single={single}
        addRole={addRole}
        moderators={moderators}
        Button={AddModeratorButton}
        addRoleLoading={addRoleLoading}
      />
    </Wrapper>
  );
};

export default React.memo(Header);
