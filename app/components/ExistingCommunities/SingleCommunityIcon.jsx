import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { translationMessages } from 'i18n';

import singleCommunity from 'images/singleCommunity.svg?external';
import { showPopover, closePopover } from 'utils/popover';

import Icon from 'components/Icon';

import messages from './messages';

const IconSingle = styled(Icon)`
  margin-left: 8px;
  margin-right: 8px;
`;

const ButtonSingle = styled.button`
  display: inline;
  position: relative;
  z-index: 9;

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

  const iPadClick = (e) => {
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
        onClick={(e) => iPadClick(e)}
        onBlur={onBlur}
      >
        <IconSingle icon={singleCommunity} width="14" height="14" />
      </ButtonSingle>
      <ButtonSingleMob
        onBlur={onBlur}
        id={idMobile}
        onClick={(e) => toggleTooltipMobile(e)}
      >
        <IconSingle icon={singleCommunity} width="14" height="14" />
      </ButtonSingleMob>
    </>
  );
};

SingleCommunityIcon.propTypes = {
  locale: PropTypes.string,
  id: PropTypes.number,
};

export default SingleCommunityIcon;
