import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { translationMessages } from 'i18n';

import SingleCommunityIc from 'icons/SingleCommunity';
import { showPopover, closePopover } from 'utils/popover';

import messages from './messages';

const ButtonSingle = styled.button`
  display: inline;
  position: relative;
  z-index: 8;

  @media only screen and (max-width: 991px) {
    display: none;
  }
`;

const ButtonSingleMob = styled(ButtonSingle)`
  display: none;

  @media only screen and (max-width: 991px) {
    display: inline;
  }
`;

const SingleCommunityIcon = ({ locale, id }) => {
  const tooltipText =
    translationMessages[locale][messages.singleCommunityTooltip.id];

  const fullId = `SingleCommunityIcon_${id}`;
  const idMobile = `${fullId}mob`;

  const [opened, setOpened] = useState(false);
  const setOpenedFalse = () => setOpened(false);

  const iPad = () => window.navigator.userAgent.includes('iPad');

  const showTooltip = () => {
    if (!iPad()) showPopover(fullId, tooltipText, { timer: false });
  };

  const hideTooltip = () => {
    if (!iPad()) closePopover();
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
      closePopover();
      setOpenedFalse();
    }
  };

  const iPadClick = e => {
    if (iPad()) {
      toggleTooltipMobile(e, fullId);
    }
  };

  const onBlur = () => {
    closePopover();
    setOpenedFalse();
  };

  return (
    <>
      <ButtonSingle
        id={fullId}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onClick={e => iPadClick(e)}
        onBlur={onBlur}
      >
        <SingleCommunityIc className="ml8 mr8" size={[14, 14]} />
      </ButtonSingle>
      <ButtonSingleMob
        onBlur={onBlur}
        id={idMobile}
        onClick={e => toggleTooltipMobile(e)}
      >
        <SingleCommunityIc className="ml8 mr8" size={[14, 14]} />
      </ButtonSingleMob>
    </>
  );
};

SingleCommunityIcon.propTypes = {
  locale: PropTypes.string,
  id: PropTypes.number,
};

export default SingleCommunityIcon;
