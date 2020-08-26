import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { BG_WARNING_LIGHT } from 'style-constants';

import Span from 'components/Span';
import { showPopover } from 'utils/popover';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 17px;
  background: ${BG_WARNING_LIGHT};
  position: ${x => (!x.inline ? 'absolute' : 'relative')};
  z-index: 10;
  top: ${x => (!x.inline ? '-6px' : '0')};
  right: ${x => (!x.inline ? '-6px' : '0')};
  margin-left: ${x => (x.inline ? '5px' : '0')};
  border-radius: 8.5px;
  min-width: 24px;

  @media only screen and (max-width: 992px) {
    min-width: 20px;
  }
`;

const IconNumber = Span.extend`
  padding-left: 4px;
  padding-right: 4px;
`;

const NotificationIcon = ({ number, inline, mobile, tooltipText, iconId }) => {
  const iPad = window.navigator.userAgent.includes('iPad');

  const showTooltip = () => {
    if (!inline && tooltipText && !iPad) showPopover(iconId, tooltipText);
  };

  const showTooltipOnClick = e => {
    if (!inline && (mobile || iPad) && tooltipText) {
      e.stopPropagation();
      showTooltip();
    }
  };

  return (
    <Div
      id={iconId}
      inline={inline}
      onClick={e => showTooltipOnClick(e)}
      onMouseEnter={showTooltip}
    >
      <IconNumber fontSize="13" color="white">
        {number}
      </IconNumber>
    </Div>
  );
};

NotificationIcon.propTypes = {
  number: PropTypes.number,
  inline: PropTypes.bool,
  mobile: PropTypes.bool,
  tooltipText: PropTypes.string,
  iconId: PropTypes.string,
};

export default memo(NotificationIcon);
