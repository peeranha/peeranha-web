import React from 'react';
import PropTypes from 'prop-types';

import arrowDownIcon from 'svg/arrowDown';
import Icon from 'components/Icon';

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

      {isArrowed && <Icon icon={arrowDownIcon} />}
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
