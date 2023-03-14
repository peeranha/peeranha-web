import { useTranslation } from 'react-i18next';
import React from 'react';

import { MediumIconStyled } from 'components/Icon/MediumIcon';
import Wrapper from 'components/Header/Simple';
import Icon from 'components/Icon';
import H3 from 'components/H3';

import AddRoleForm from 'containers/Administration/AddRoleForm';
import { Moderator } from 'containers/Administration/types';

import usersHeader from 'images/usersHeader.svg?external';
import AddModeratorButton from 'containers/Administration/AddModeratorButton';

import { singleCommunityColors } from 'utils/communityManagement';
import { BORDER_PRIMARY } from 'style-constants';
const colors = singleCommunityColors();

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
        <MediumIconStyled>
          <Icon
            icon={usersHeader}
            width="38"
            color={colors.btnColor || BORDER_PRIMARY}
            isColorImportant={true}
          />
        </MediumIconStyled>

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
