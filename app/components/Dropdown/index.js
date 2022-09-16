import React from 'react';
import PropTypes from 'prop-types';
import { DARK_SECONDARY } from 'style-constants';
import styled from 'styled-components';
import { css } from '@emotion/react';
import {
  singleCommunityColors,
  singleCommunityStyles,
} from 'utils/communityManagement';
import arrowDownIcon from 'images/arrowDown.svg?external';

import Icon from 'components/Icon/index';
import DropdownStyled from './DropdownStyled';
import MenuStyled from './MenuStyled';

const styles = singleCommunityStyles();
const colors = singleCommunityColors();

const ArrowDown = styled(Icon)`
  path {
    fill: ${colors.localeArrowColor || styles.commHeadElemColor || ''};
  }
`;

export const Dropdown = ({
  button,
  menu,
  id,
  className,
  isArrowed,
  isMenuLabelMobile,
  isArrowMarginMobile,
}) => (
  <DropdownStyled
    className={`dropdown ${className}`}
    isMenuLabelMobile={isMenuLabelMobile}
    isArrowMarginMobile={isArrowMarginMobile}
  >
    <button
      id={id}
      className="d-flex align-items-center w-100 p-0"
      type="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      data-icon="arrow"
      css={css`color: colors.localeArrowColor : "" `}
    >
      {button}

      {isArrowed && (
        <ArrowDown
          icon={arrowDownIcon}
          width="10"
          alt="data-icon"
          className="dropdown-arrow"
          fill={DARK_SECONDARY}
        />
      )}
    </button>

    <MenuStyled className="dropdown-menu" ariaLabelledby={id}>
      {menu}
    </MenuStyled>
  </DropdownStyled>
);

Dropdown.propTypes = {
  button: PropTypes.element.isRequired,
  menu: PropTypes.element.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  isArrowed: PropTypes.bool,
  isMenuLabelMobile: PropTypes.bool,
  isArrowMarginMobile: PropTypes.bool,
};

export default React.memo(Dropdown);
