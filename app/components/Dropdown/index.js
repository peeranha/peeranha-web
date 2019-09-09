import React from 'react';
import PropTypes from 'prop-types';

import arrowDownIcon from 'images/arrowDown.svg?inline';

import DropdownStyled from './DropdownStyled';
import MenuStyled from './MenuStyled';

export const Dropdown = /* istanbul ignore next */ ({
  button,
  menu,
  id,
  isArrowed,
  className,
}) => (
  <DropdownStyled className={`dropdown show ${className}`}>
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

      {isArrowed && <img src={arrowDownIcon} alt="data-icon" />}
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
};

export default React.memo(Dropdown);
