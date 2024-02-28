import { useTranslation } from 'react-i18next';
import React from 'react';
import { css } from '@emotion/react';

import { BORDER_PRIMARY, ICON_TRASPARENT_BLUE } from 'style-constants';
import { Administration, UserGraph } from 'icons/index';

import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

import AddRoleForm from 'containers/Administration/AddRoleForm';
import { Moderator } from 'containers/Administration/types';
import AddModeratorButton from 'containers/Administration/AddModeratorButton';
import { MediumIconStyled } from 'components/Icon/MediumIcon';
import Wrapper from 'components/Header/Simple';
import H3 from 'components/H3';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

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
    <Wrapper className="mb-to-sm-0 mb-from-sm-3" css={{ background: 'none', border: 'none' }}>
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
            {graphCommunity ? <UserGraph size={[24, 24]} /> : <Administration />}
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
