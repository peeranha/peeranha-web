import React from 'react';
import PropTypes from 'prop-types';
import DropdownStyled from './DropdownStyled';

const Dropdown = ({ button, menu, id, isArrowed }) => (
  <DropdownStyled class="dropdown show">
    <button
      type="button"
      id={id}
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      {button}
      {isArrowed && <span className="arrow">▴</span>}
    </button>

    <div className="dropdown-menu" aria-labelledby={id}>
      {menu}
    </div>
  </DropdownStyled>
);

Dropdown.propTypes = {
  button: PropTypes.element,
  menu: PropTypes.element,
  id: PropTypes.string,
  isArrowed: PropTypes.bool,
};

export default Dropdown;
