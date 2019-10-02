import React from 'react';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';
import styled from 'styled-components';

import { TEXT_SECONDARY } from 'style-constants';

import editUserNoAvatar from 'images/editUserNoAvatar.png';
import { ErrorHandling, DisableHandling } from 'components/Input/InputStyled';

import WarningMessage from './WarningMessage';

export const MAX_FILE_SIZE = 2000000; // 2mb

const BORDER_EDITOR_RADIUS = 100;
const EDITOR_COLOR = [255, 255, 255, 0.6];
const EDITOR_SCALE = 1.5;
const EDITOR_ROTATE = 0;
const CROSS_ORIGIN = 'anonymous';

const AvatarArea = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  width: ${x => x.size}px;
  height: ${x => x.size}px;
  margin-bottom: 10px;

  ${x => ErrorHandling(x.error)};
  ${x => DisableHandling(x.disabled)};

  border-radius: 50% !important;

  img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
  }

  input {
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    cursor: pointer;
  }
`;

const ButtonStyled = styled.button`
  position: absolute;
  font-size: 20px;
  color: ${TEXT_SECONDARY};
  top: ${x => x.top}px;
  right: ${x => x.right}px;
`;

const Box = styled.div`
  position: relative;
  width: ${x => x.size}px;
  height: auto;
`;

function AvatarField({
  input,
  size,
  disabled,
  meta,
  editingImgState,
  cachedProfileImg,
  ipfsAvatar,
  getCroppedAvatar,
  uploadImage,
  clearImageChanges,
}) {
  let avatarRefs;

  const displayAvatar = !editingImgState && cachedProfileImg;

  return (
    <Box size={size}>
      <AvatarArea
        size={size}
        disabled={disabled}
        error={meta.touched && (meta.warning || meta.error)}
      >
        {!displayAvatar && (
          <img
            src={cachedProfileImg || ipfsAvatar || editUserNoAvatar}
            alt="avatar"
          />
        )}

        {displayAvatar && (
          <AvatarEditor
            image={cachedProfileImg}
            ref={refs => {
              avatarRefs = refs;
            }}
            width={size - 0.2 * size}
            height={size - 0.2 * size}
            color={EDITOR_COLOR}
            scale={EDITOR_SCALE}
            rotate={EDITOR_ROTATE}
            border={0.2 * size}
            crossOrigin={CROSS_ORIGIN}
            borderRadius={BORDER_EDITOR_RADIUS}
          />
        )}

        {!displayAvatar && (
          <input
            {...input}
            onChange={x => {
              if (x.target.files[0].size > MAX_FILE_SIZE) {
                clearImageChanges();
                return;
              }

              uploadImage(x);
            }}
            disabled={disabled}
            type="file"
            value={undefined}
            className="custom-file-input"
          />
        )}
      </AvatarArea>

      <WarningMessage {...meta} />

      {displayAvatar && (
        <div>
          <ButtonStyled
            top={-5}
            right={-5}
            disabled={disabled}
            onClick={() => getCroppedAvatar(avatarRefs)}
            type="button"
          >
            ✔
          </ButtonStyled>
          <ButtonStyled
            top={5}
            right={-25}
            disabled={disabled}
            onClick={clearImageChanges}
            type="button"
          >
            ✕
          </ButtonStyled>
        </div>
      )}
    </Box>
  );
}

AvatarField.propTypes = {
  input: PropTypes.object,
  size: PropTypes.number,
  disabled: PropTypes.bool,
  meta: PropTypes.object,
  editingImgState: PropTypes.bool,
  cachedProfileImg: PropTypes.string,
  ipfsAvatar: PropTypes.string,
  getCroppedAvatar: PropTypes.func,
  uploadImage: PropTypes.func,
  clearImageChanges: PropTypes.func,
};

export { AvatarField };
export default React.memo(AvatarField);
