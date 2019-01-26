import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DropdownStyled from './DropdownStyled';
import MenuStyled from './MenuStyled';

const Dropdown = ({ button, menu, id, isArrowed }) => (
  <DropdownStyled class="dropdown show">
    <button
      id={id}
      className="d-flex align-items-center"
      type="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      {button}

      {isArrowed && (
        <FontAwesomeIcon className="chevron chevron-up" icon="chevron-up" />
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
  isArrowed: PropTypes.bool,
};

export default Dropdown;
