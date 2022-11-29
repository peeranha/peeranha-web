// @ts-ignore
import { FormattedMessage } from 'react-intl';
import React from 'react';

import { MediumIconStyled } from 'components/Icon/MediumIcon';
import Wrapper from 'components/Header/Simple';
import Icon from 'components/Icon';
import H3 from 'components/H3';

import messages from 'containers/Administration/messages';

import AddRoleForm from 'containers/Administration/AddModeratorForm';

import commonMessages from 'common-messages';

// @ts-ignore
import usersHeader from 'images/usersHeader.svg?external';
// @ts-ignore
import AddModeratorButton from 'containers/Administration/AddModeratorButton';

type HeaderProps = {
  locale: string;
  single?: number;
  addRole: (userAddress: string, role: number, communityId: number) => void;
  addRoleLoading: boolean;
};

export const Header: React.FC<HeaderProps> = ({
  locale,
  single,
  addRole,
  addRoleLoading,
}): JSX.Element => (
  <Wrapper className="mb-to-sm-0 mb-from-sm-3">
    <H3>
      <MediumIconStyled>
        <Icon icon={usersHeader} width="38" />
      </MediumIconStyled>
      <FormattedMessage id={commonMessages.administration.id} />
    </H3>

    <AddRoleForm
      locale={locale}
      single={single}
      addRole={addRole}
      Button={AddModeratorButton}
      addRoleLoading={addRoleLoading}
    />
  </Wrapper>
);

export default React.memo(Header);
