import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { TEXT_SECONDARY } from 'style-constants';

import { getUserAvatar } from 'utils/profileManagement';
import { formatStringToHtmlId } from 'utils/animation';

import LargeImage from 'components/Img/LargeImage';
import { ErrorHandling, DisableHandling } from 'components/Input/InputStyled';
import { Wrapper } from 'components/FormFields/Wrapper';

import WarningMessage, { Div as WarningMessageDiv } from './WarningMessage';
import BannerLoader from './BannerLoader';
import { italicFont } from '../../global-styles';

// < 1000 chars - hash, >> 1000 - is base64 (new image)
export const HASH_CHARS_LIMIT = 1000;
const IMG_SIZE_LIMIT_B = 2 * 1024 * 1024;

const Div = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
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
    height: 80px;
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
      height: 80px;
      width: 100%;
      opacity: 0;
      position: relative;
      z-index: 12;
      overflow: hidden;

      input {
        font-size: 200px;
        float: right;
        cursor: pointer;
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
  max-width: 350px;
  margin-bottom: 15px;
`;

const LabelErrorStyle = styled.div`
  width: 100%;
  margin-top: 8px;
  color: ${TEXT_SECONDARY};
  font-style: ${italicFont};
  font-size: 14px;
  line-height: 18px;
`;

const BannerField = ({ input, meta, disabled, label }) => {
  const { t } = useTranslation();
  const [isFileTooLarge, setIsFileTooLarge] = useState(false);
  const [isIncorrectResolution, setIsCorrectResolution] = useState(false);

  return (
    <Wrapper label={label} disabled={disabled}>
      <InfoMessage>{t('common.communityBannerInfo')}</InfoMessage>

      <Div
        disabled={disabled}
        error={
          (meta.touched && (meta.error || meta.warning)) ||
          isIncorrectResolution ||
          isFileTooLarge
        }
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

        {(isFileTooLarge && (
          <LabelErrorStyle>{t('common.bannerSizeErrorMsg')}</LabelErrorStyle>
        )) ||
          (isIncorrectResolution && (
            <LabelErrorStyle>
              {t('common.incorrectBannerResolutionMsg')}
            </LabelErrorStyle>
          ))}
        <WarningMessage {...meta} isSpecialPosition />
      </Div>
    </Wrapper>
  );
};

BannerField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  size: PropTypes.number,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};

export default React.memo(BannerField);
