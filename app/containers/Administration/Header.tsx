// @ts-ignore
import { FormattedMessage } from 'react-intl';
import { css } from '@emotion/react';
import React from 'react';

import LargeButton from 'components/Button/Contained/InfoLarge';
import { MediumIconStyled } from 'components/Icon/MediumIcon';
import { IconSm } from 'components/Icon/IconWithSizes';
import Wrapper from 'components/Header/Simple';
import Icon from 'components/Icon';
import H3 from 'components/H3';

import { OPEN_ADD_MODERATOR_FORM_BUTTON } from 'containers/Administration/constants';
import AddRoleForm from 'containers/Administration/AddRoleForm';
import messages from 'containers/Administration/messages';

import commonMessages from 'common-messages';
import { BG_LIGHT } from 'style-constants';

// @ts-ignore
import usersHeader from 'images/usersHeader.svg?external';
// @ts-ignore
import addIcon from 'images/add.svg?external';

type HeaderProps = {
  locale: string;
  single: number | undefined;
  addRole: Function;
  addRoleLoading: boolean;
};

export const Header: React.FC<HeaderProps> = ({
  locale,
  single,
  addRole,
  addRoleLoading,
}): JSX.Element | null => (
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
      Button={({
        onClick,
      }: {
        onClick: React.MouseEventHandler<HTMLButtonElement>;
      }) => (
        <LargeButton
          id={OPEN_ADD_MODERATOR_FORM_BUTTON}
          onClick={onClick}
          css={css`
            @media only screen and (max-width: 991px) {
              padding: 0;
              border-radius: 50%;
              min-width: auto;
              width: 40px;
              height: 40px;
            }

            @media only screen and (max-width: 576px) {
              width: 36px !important;
              height: 36px !important;
            }
          `}
        >
          <IconSm fill={BG_LIGHT} icon={addIcon} />
          <span className="d-none d-lg-inline ml-2">
            <FormattedMessage id={messages.addRole.id} />
          </span>
        </LargeButton>
      )}
      addRoleLoading={addRoleLoading}
    />
  </Wrapper>
);

export default React.memo(Header);
