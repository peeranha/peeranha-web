/* eslint indent: 0, jsx-a11y/click-events-have-key-events: 0, jsx-a11y/no-static-element-interactions: 0 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';

import { TEXT_PRIMARY, TEXT_WARNING } from 'style-constants';

import { getUserAvatar } from 'utils/profileManagement';
import { formatStringToHtmlId } from 'utils/animation';

import LargeImage from 'components/Img/LargeImage';
import { ErrorHandling, DisableHandling } from 'components/Input/InputStyled';

import WarningMessage, { Div as WarningMessageDiv } from './WarningMessage';
import BannerLoader from './BannerLoader';

// < 1000 chars - hash, >> 1000 - is base64 (new image)
export const HASH_CHARS_LIMIT = 1000;
const IMG_SIZE_LIMIT_B = 2 * 1024 * 1024;

const Div = styled.div`
  position: relative;
  width: 640px;
  max-width: 680px;
  display: flex;
  flex-direction: column;

  ${WarningMessageDiv} {
    width: 50%;
    display: flex;
    justify-content: center;
    text-align: center;
  }

  > :first-child {
    position: relative;
    height: 60px;
    width: 100%;

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
      background-color: aliceblue;
      height: 60px;
      width: 100%;
      opacity: 0;
      position: relative;
      z-index: 12;
      overflow: hidden;
      input {
        font-size: 200px;
        float: right;
      }
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

      object-fit: scale-down;
    }
  }
`;

const InfoMessage = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;

  font-size: 13px;
  line-height: 1.2;
  color: ${TEXT_PRIMARY};
  //text-align: center;
  font-style: italic;

  opacity: 0.9;
`;

const LabelErrorStyle = styled.div`
  width: 100%;
  margin-bottom: 10px;
  fontweight: 500;
  color: ${TEXT_WARNING};
`;

function AvatarField({ input, meta, disabled }) {
  const [isFileTooLarge, setIsFileTooLarge] = useState(false);
  const [isIncorrectResolution, setIsCorrectResolution] = useState(false);

  return (
    <Div
      disabled={disabled}
      value={input.value && input.value.length}
      error={meta.touched && (meta.error || meta.warning)}
      id={formatStringToHtmlId(input.name)}
    >
      <div>
        <div>
          <div className="avatar-wrapper">
            <BannerLoader
              input={input}
              onBeforeFileLoad={e => {
                if (e.target.files[0].size > IMG_SIZE_LIMIT_B) {
                  setIsFileTooLarge(true);
                  e.target.value = '';
                } else setIsFileTooLarge(false);
              }}
              setIsCorrectResolution={setIsCorrectResolution}
            />
          </div>
        </div>

        <LargeImage
          isBordered
          src={
            input.value && input.value.length > HASH_CHARS_LIMIT
              ? input.value
              : getUserAvatar(input.value, true, true)
          }
          alt="icon"
        />
      </div>

      <InfoMessage>
        <FormattedMessage {...messages.communityBannerInfo} />
      </InfoMessage>
      {(isFileTooLarge && (
        <LabelErrorStyle>
          <FormattedMessage {...messages.bannerSizeErrorMsg} />
        </LabelErrorStyle>
      )) ||
        (isIncorrectResolution && (
          <LabelErrorStyle>
            <FormattedMessage {...messages.incorrectBannerResolutionMsg} />
          </LabelErrorStyle>
        ))}
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
