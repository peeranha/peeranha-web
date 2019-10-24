import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar-edit';
import styled from 'styled-components';

import { getUserAvatar } from 'utils/profileManagement';

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
    margin-top: 15px;

    > *:nth-child(1) {
      position: relative;
      z-index: 1;
      width: inherit;
      height: inherit;
      opacity: ${x => (x.s ? 1 : 0)};
      overflow: ${x => (x.s ? 'initial' : 'hidden')};
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

      object-fit: none;
      border-radius: 50%;
      opacity: ${x => (!x.s ? 1 : 0)};
    }
  }
`;

function AvatarField({ input, meta, size, disabled }) {
  const [s, setS] = useState(false);
  const [y, setY] = useState(null);

  return (
    <Div
      s={s}
      size={size}
      disabled={disabled}
      value={input.value && input.value.length}
      error={meta.touched && (meta.error || meta.warning)}
    >
      <div>
        <Avatar
          {...input}
          height={size}
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
