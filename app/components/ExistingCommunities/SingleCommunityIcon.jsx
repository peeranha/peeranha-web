import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { translationMessages } from 'i18n';

import singleCommunity from 'images/singleCommunity.svg?external';
import { showPopover, closePopover } from 'utils/popoverMultiple';

import Icon from 'components/Icon';

import messages from './messages';

const SCIcon = styled(Icon)`
  margin-left: 8px;
  margin-right: 8px;
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

const SingleCommunityIcon = ({ locale, id }) => {
  const tooltipText =
    translationMessages[locale][messages.singleCommunityTooltip.id];

  const idMobile = `${id}mob`;

  const [opened, setOpened] = useState(false);
  const setOpenedFalse = () => setOpened(false);

  const isIPad = () => window.navigator.userAgent.includes('iPad');

  const showTooltip = () => {
    if (!isIPad()) showPopover(id, tooltipText, { timer: false });
  };

  const hideTooltip = () => {
    if (!isIPad()) closePopover(id);
  };

  const toggleTooltipMobile = (e, iconId = idMobile) => {
    e.preventDefault();
    if (!opened) {
      setOpened(true);
      showPopover(iconId, tooltipText, {
        callback: setOpenedFalse,
        timeout: 3500,
        position: 'top',
      });
    } else {
      closePopover(iconId, setOpenedFalse);
    }
  };

  const iPadClick = e => {
    if (isIPad()) {
      toggleTooltipMobile(e, id);
    }
  };

  return (
    <>
      <SCSpan
        id={id}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onClick={e => iPadClick(e)}
      >
        <SCIcon icon={singleCommunity} width="14" height="14" />
      </SCSpan>
      <SCSpanMob id={idMobile} onClick={e => toggleTooltipMobile(e)}>
        <SCIcon icon={singleCommunity} width="14" height="14" />
      </SCSpanMob>
    </>
  );
};

SingleCommunityIcon.propTypes = {
  locale: PropTypes.string,
  id: PropTypes.number,
};

export default SingleCommunityIcon;
