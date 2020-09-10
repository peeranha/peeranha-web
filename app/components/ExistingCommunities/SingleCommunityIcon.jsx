import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { translationMessages } from 'i18n';

import singleCommunity from 'images/singleCommunity.svg?external';
import { showPopover, closePopover } from 'utils/popover';

import Icon from 'components/Icon';

import messages from './messages';

const SCIcon = styled(Icon)`
  margin-left: 8px;
`;

const SCSpan = styled('span')`
  display: inline;
  position: absolute;
  z-index: 1000;

  @media only screen and (max-width: 991px) {
    display: none;
  }
`;

const SCSpanMob = styled(SCSpan)`
  display: none;

  @media only screen and (max-width: 991px) {
    display: inline;
  }
`;

const SingleCommunityIcon = ({ locale }) => {
  const tooltipText =
    translationMessages[locale][messages.singleCommunityTooltip.id];

  const [opened, setOpened] = useState(false);
  const setOpenedFalse = () => setOpened(false);

  const isIPad = () => window.navigator.userAgent.includes('iPad');

  const showTooltip = () => {
    if (!isIPad()) showPopover('iconId', tooltipText, { timer: false });
  };

  const hideTooltip = () => {
    if (!isIPad()) closePopover();
  };

  const toggleTooltipMobile = (e, iconId = 'iconIdMob') => {
    e.preventDefault();
    if (!opened) {
      setOpened(true);
      showPopover(iconId, tooltipText, {
        callback: setOpenedFalse,
        timeout: 4000,
      });
    } else {
      closePopover(setOpenedFalse);
    }
  };

  const iPadClick = e => {
    if (isIPad()) {
      toggleTooltipMobile(e, 'iconId');
    }
  };

  return (
    <>
      <SCSpan
        id="iconId"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onClick={e => iPadClick(e)}
      >
        <SCIcon icon={singleCommunity} width="14" height="14" />
      </SCSpan>
      <SCSpanMob id="iconIdMob" onClick={e => toggleTooltipMobile(e)}>
        <SCIcon icon={singleCommunity} width="14" height="14" />
      </SCSpanMob>
    </>
  );
};

SingleCommunityIcon.propTypes = {
  locale: PropTypes.string,
};

export default SingleCommunityIcon;
