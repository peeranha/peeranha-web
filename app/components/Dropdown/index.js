import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import ArrowDownFillIcon from 'icons/ArrowDownFill';

import DropdownStyled from './DropdownStyled';
import MenuStyled from './MenuStyled';

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
    >
      {button}

      {isArrowed && (
        <ArrowDownFillIcon
          size={[14, 10]}
          fill="#7B7B7B"
          className="dropdown-arrow"
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
