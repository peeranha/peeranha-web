/* eslint indent: 0, jsx-a11y/click-events-have-key-events: 0, jsx-a11y/no-static-element-interactions: 0 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar-edit';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';

import {
  BG_PRIMARY_SPECIAL,
  BORDER_DARK,
  TEXT_PRIMARY,
  TEXT_WARNING,
} from 'style-constants';
import avatarCloseIcon from 'images/avatarCloseIcon.png';
import addIcon from 'images/tick.png';

import { NO_AVATAR } from 'utils/constants';
import { getUserAvatar } from 'utils/profileManagement';
import { formatStringToHtmlId } from 'utils/animation';

import LargeImage from 'components/Img/LargeImage';
import { ErrorHandling, DisableHandling } from 'components/Input/InputStyled';

import { AVATAR_FIELD } from 'containers/Profile/constants';

import WarningMessage, { Div as WarningMessageDiv } from './WarningMessage';
import { italicFont } from '../../global-styles';
import { singleCommunityColors } from 'utils/communityManagement';
// < 1000 chars - hash, >> 1000 - is base64 (new image)
export const HASH_CHARS_LIMIT = 1000;
const IMG_SIZE_LIMIT_B = 5 * 1024 * 1024;
const colors = singleCommunityColors();
const Div = styled.div`
  position: relative;
  width: 120px;
  display: flex;
  flex-direction: column;

  ${WarningMessageDiv} {
    width: 120px;
    display: flex;
    justify-content: center;
    text-align: center;
  }

  > :first-child {
    overflow: hidden;
    position: relative;
    width: inherit;
    height: 120px;

    @media (min-width: 992px) {
      border-radius: 50%;

      &:hover {
        .remove-avatar-action-container {
          bottom: 0;
        }
      }
    }

    .remove-avatar-action-container {
      height: 14px;
      position: absolute;
      right: 0;
      top: 0;
      width: 14px;
      z-index: 1;

      @media (min-width: 992px) {
        background-color: var(--color-white);
        bottom: -25%;
        height: 25%;
        opacity: 75%;
        top: initial;
        transition: bottom 0.5s;
        width: 100%;
      }
    }

    .remove-avatar-action {
      background: url(${avatarCloseIcon}) center center / 10px 10px no-repeat;
      height: 10px;
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 10px;

      @media (min-width: 992px) {
        top: 25%;
        transform: translateX(-50%);
      }
    }

    label {
      width: 100%;
      height: 100%;

      line-height: 1.2 !important;
    }

    .reload-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 11;
    }

    .avatar-wrapper {
      position: relative;
      max-height: 95vh;
      z-index: 12;

      svg,
      .close-icon {
        position: absolute;
        border: 1px solid ${BORDER_DARK};
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 50%;
        width: 20px;
        height: 20px;
      }

      svg:not(.svg-icon) {
        top: 10px;
        left: 35px !important;
        background-image: url(${addIcon});
        background-size: 12px 12px;
      }

      .close-icon {
        top: 10px;
        left: 10px;
        background-image: url(${avatarCloseIcon});
        background-size: 10px 10px;
      }
    }

    > *:nth-child(1) {
      ${(x) =>
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
      z-index: ${(x) => (x.disabled ? 2 : 0)};
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

const InfoMessage = styled.div`
  width: 120px;
  margin-top: 10px;

  font-size: 13px;
  line-height: 1.2;
  color: ${colors.textColor || TEXT_PRIMARY};
  text-align: center;
  font-style: ${italicFont};

  opacity: 0.9;
`;

function AvatarField({ input, meta, disabled }) {
  const [s, setS] = useState(false);
  const [y, setY] = useState(null);
  const [v, setV] = useState(true);
  const [isFileTooLarge, setIsFileTooLarge] = useState(false);

  const reload = () => {
    setS(false);
    setV(false);
    setIsFileTooLarge(false);
    setTimeout(() => setV(true), 0);
  };

  const labelErrorStyle = {
    fontSize: '1.2em',
    fontWeight: '500',
    color: TEXT_WARNING,
    padding: '65px 15px 0',
    cursor: 'pointer',
  };

  return (
    <Div
      s={s}
      disabled={disabled}
      value={input.value && input.value.length}
      error={meta.touched && (meta.error || meta.warning)}
      id={formatStringToHtmlId(input.name)}
    >
      <div>
        {v && (
          <div>
            <div className="avatar-wrapper">
              <Avatar
                {...input}
                imageWidth={320}
                cropRadius={60}
                closeIconColor="transparent"
                onCrop={setY}
                label={
                  isFileTooLarge ? (
                    <FormattedMessage {...messages.fileSizeErrorMsg} />
                  ) : (
                    <FormattedMessage {...messages.chooseFile} />
                  )
                }
                labelStyle={isFileTooLarge ? labelErrorStyle : {}}
                onBeforeFileLoad={(e) => {
                  if (e.target.files[0].size > IMG_SIZE_LIMIT_B) {
                    setIsFileTooLarge(true);
                    e.target.value = '';
                  }

                  setS(true);
                }}
                onClose={() => {
                  input.onChange(y);
                  setS(false);
                }}
              />
              <button className="close-icon" onClick={reload} />
            </div>

            <div className="reload-bg" onClick={reload} />
          </div>
        )}

        <LargeImage
          isBordered
          src={
            input.value && input.value.length > HASH_CHARS_LIMIT
              ? input.value
              : getUserAvatar(input.value, true, true)
          }
          alt="icon"
        />
        {input.name === AVATAR_FIELD && input.value && (
          <div className="remove-avatar-action-container">
            <button
              className="remove-avatar-action"
              onClick={() => input.onChange(NO_AVATAR)}
            />
          </div>
        )}
      </div>
      <InfoMessage>
        <FormattedMessage
          id={messages.profilesUsersInfo.id}
          color={colors.btnColor}
        />
      </InfoMessage>
      <WarningMessage {...meta} isSpecialPosition />
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
