import React, { useState, memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { BG_WARNING_LIGHT, TEXT_DARK } from 'style-constants';

import Span from 'components/Span';

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

  $:hover {
    Tooltip {
      display: block;
    }
  }

  @media only screen and (max-width: 992px) {
    min-width: 20px;
  }
`;

const Base = styled.div`
  position: absolute;
  width: 150px;
  padding: 10px;
  line-height: 1.3em;
  left: 30px;
  bottom: -54px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);

  span {
    color: ${TEXT_DARK};
  }

  @media (max-width: 992px) {
    left: 16px;
    bottom: -62px;
  }

  @media (max-width: 767px) {
    left: -60px;
    bottom: 22px;
  }
`;

const NotificationIcon = memo(({ number, inline, mobile, tooltipText }) => {
  const [displayHint, setDisplay] = useState(false);

  const iPad = window.navigator.userAgent.includes('iPad');

  const mobileClickHandler = e => {
    if (mobile && !inline) {
      e.stopPropagation();
      setDisplay(!displayHint);
    }
  };

  const showTooltip = () => {
    if (!mobile && !inline && !iPad) setDisplay(true);
  };

  const hideTooltip = () => {
    if (!mobile && !inline && !iPad) setDisplay(false);
  };

  return (
    <Div
      inline={inline}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onClick={e => mobileClickHandler(e)}
    >
      <Span fontSize="13" color="white">
        {number}
      </Span>
      {displayHint && tooltipText && <Base>{tooltipText}</Base>}
    </Div>
  );
});

NotificationIcon.propTypes = {
  number: PropTypes.number,
  inline: PropTypes.bool,
  mobile: PropTypes.bool,
  tooltipText: PropTypes.string,
};

export default NotificationIcon;
