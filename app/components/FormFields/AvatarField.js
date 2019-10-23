import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar-edit';
import styled from 'styled-components';

import { BORDER_SECONDARY } from 'style-constants';
import { getUserAvatar } from 'utils/profileManagement';

import WarningMessage from './WarningMessage';

const Div = styled.div`
  position: relative;
  width: ${x => x.size}px;

  > :first-child {
    position: relative;
    width: inherit;
    height: ${x => x.size}px;
    overflow: hidden;

    > *:nth-child(1) {
      position: relative;
      z-index: 1;
      width: inherit;
      height: inherit;
      opacity: ${x => (x.s ? 1 : 0)};
    }

    > *:nth-child(2) {
      position: absolute;
      z-index: ${x => (x.disabled ? 2 : 0)};
      top: 0;
      left: 0;
      width: inherit;
      height: inherit;
      object-fit: ${x => (x.value ? 'contain' : 'none')};
      border-radius: 50%;
      border: 1px solid ${BORDER_SECONDARY};
      opacity: ${x => (!x.s ? 1 : 0)};
    }
  }
`;

function AvatarField({ input, meta, size, disabled }) {
  const [s, setS] = useState(false);
  const [y, setY] = useState(null);

  return (
    <Div s={s} value={input.value.length} size={size} disabled={disabled}>
      <div className="my-3">
        <Avatar
          {...input}
          width={size}
          height={size}
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
            (input.value && input.value.length > 1000 && input.value) ||
            getUserAvatar(input.value)
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
