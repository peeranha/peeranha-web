import React, { memo, useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { translationMessages } from 'i18n';

import { BG_WARNING_LIGHT } from 'style-constants';

import Span from 'components/Span';
import { showPopover, closePopover } from 'utils/popover';
import headerMessages from './messages';

const IconCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 17px;
  background: ${BG_WARNING_LIGHT};
  position: absolute;
  z-index: 1;
  top: -5px;
  right: 0;
  margin-left: 0;
  border-radius: 8.5px;
  min-width: 24px;
`;

const IconButton = styled.button`
  ${IconCss};

  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

const IconDivMob = styled('div')`
  ${IconCss};
  padding: 0 !important;
  border: 0 !important;
  right: -6px;
  margin-left: 0;
`;

const IconButtonInline = styled(IconButton)`
  position: relative;
  top: 0;
  right: 0;
  margin-left: 5px;
  padding: ${x => (x.mobile ? '0 !important' : '')};
  border: ${x => (x.mobile ? '0 !important' : '')};
`;

const IconNumber = Span.extend`
  padding-left: 4px;
  padding-right: 4px;
`;

const NotificationIcon = ({ number, inline, mobile, iconId, locale }) => {
  const translations = translationMessages[locale];
  const tooltipText =
    translations[headerMessages.walletTooltipPart1.id] +
    number +
    translations[headerMessages.walletTooltipPart2.id];

  const [opened, setOpened] = useState(false);
  const setOpenedFalse = () => setOpened(false);

  const closeTooltipOnClick = e => {
    e.stopPropagation();
    closePopover();
    setOpenedFalse();
  };

  const toggleTooltipOnClick = e => {
    if (!opened) {
      setOpened(true);
      e.stopPropagation();
      e.preventDefault();
      showPopover(iconId, tooltipText, {
        callback: setOpenedFalse,
        position:
          (mobile && 'top') || (window.innerWidth < 992 && 'auto') || 'right',
      });
    } else closeTooltipOnClick(e);
  };

  if (inline)
    return (
      <IconButtonInline id={iconId} mobile={mobile}>
        <IconNumber fontSize="13" color="white">
          {number}
        </IconNumber>
      </IconButtonInline>
    );

  if (mobile)
    return (
      <div tabIndex="0" onBlur={closeTooltipOnClick}>
        <IconDivMob id={iconId} onClick={e => toggleTooltipOnClick(e)}>
          <IconNumber fontSize="13" color="white">
            {number}
          </IconNumber>
        </IconDivMob>
      </div>
    );

  return (
    <IconButton
      id={iconId}
      onClick={e => toggleTooltipOnClick(e)}
      onBlur={closeTooltipOnClick}
    >
      <IconNumber fontSize="13" color="white">
        {number}
      </IconNumber>
    </IconButton>
  );
};

NotificationIcon.propTypes = {
  number: PropTypes.number,
  inline: PropTypes.bool,
  mobile: PropTypes.bool,
  iconId: PropTypes.string,
  locale: PropTypes.string,
};

export default memo(NotificationIcon);
