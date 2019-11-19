/* eslint indent: 0 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar-edit';
import styled from 'styled-components';

import { BG_PRIMARY_SPECIAL } from 'style-constants';

import { getUserAvatar } from 'utils/profileManagement';
import { formatStringToHtmlId } from 'utils/animation';

import { ErrorHandling, DisableHandling } from 'components/Input/InputStyled';

import WarningMessage, { Div as WarningMessageDiv } from './WarningMessage';

// < 1000 chars - hash, >> 1000 - is base64 (new image)
export const HASH_CHARS_LIMIT = 1000;

const Div = styled.div`
  position: relative;
  width: ${x => x.size}px;

  ${WarningMessageDiv} {
    display: flex;
    justify-content: center;
  }

  > :first-child {
    position: relative;
    width: inherit;
    height: ${x => x.size}px;

    label {
      width: 100%;
      height: 100%;
    }

    > *:nth-child(1) {
      ${x =>
        x.s
          ? `
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10000;
        width: 100vw;
        height: 100vh;
        opacity: 1;
        overflow: initial;
        background: ${BG_PRIMARY_SPECIAL};
        display: flex;
        align-items: center;
        justify-content: center;
      `
          : `
        position: relative;
        z-index: 1;
        width: inherit;
        height: inherit;
        opacity: 0;
        overflow: hidden;
      `};
    }

    > *:nth-child(2) {
      position: absolute;
      z-index: ${x => (x.disabled ? 2 : 0)};
      top: 0;
      left: 0;
      width: inherit;
      height: inherit;

      ${({ error }) => ErrorHandling(error)};
      ${({ disabled }) => DisableHandling(disabled)};

      border-radius: 50%;
      object-fit: scale-down;
    }
  }
`;

function AvatarField({ input, meta, size, disabled }) {
  const [s, setS] = useState(false);
  const [y, setY] = useState(null);

  const isPhone = window.screen.width <= 576;

  return (
    <Div
      s={s}
      size={size}
      disabled={disabled}
      value={input.value && input.value.length}
      error={meta.touched && (meta.error || meta.warning)}
      id={formatStringToHtmlId(input.name)}
    >
      <div>
        <Avatar
          {...input}
          imageWidth={isPhone ? 320 : 480}
          cropRadius={0.5 * size}
          onCrop={setY}
          onBeforeFileLoad={() => {
            setS(true);
          }}
          onClose={() => {
            input.onChange(y);
            setS(false);
          }}
        />

        <img
          src={
            input.value && input.value.length > HASH_CHARS_LIMIT
              ? input.value
              : getUserAvatar(input.value, true, true)
          }
          alt="icon"
        />
      </div>

      <WarningMessage {...meta} />
    </Div>
  );
}

AvatarField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  size: PropTypes.number,
  disabled: PropTypes.bool,
};

export default React.memo(AvatarField);
