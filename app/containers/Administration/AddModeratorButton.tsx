import React from 'react';
import LargeButton from 'components/Button/Contained/InfoLarge';
import { OPEN_ADD_MODERATOR_FORM_BUTTON } from 'containers/Administration/constants';
import { css } from '@emotion/react';
import { IconSm } from 'components/Icon/IconWithSizes';
import { BG_LIGHT } from 'style-constants';
import messages from 'containers/Administration/messages';
import { FormattedMessage } from 'react-intl';
import addIcon from 'images/add.svg?external';

const AddModeratorButton = ({
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
);

export default AddModeratorButton;
