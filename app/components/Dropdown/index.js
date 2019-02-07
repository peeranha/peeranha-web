import React from 'react';
import PropTypes from 'prop-types';

import arrowDownIcon from 'svg/arrowDown';
import Icon from 'components/Icon';

import DropdownStyled from './DropdownStyled';
import MenuStyled from './MenuStyled';

const Dropdown = ({ button, menu, id, isArrowed, className }) => (
  <DropdownStyled className={`dropdown show ${className}`}>
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
        <span className="d-none d-md-flex" data-icon="arrow">
          <Icon icon={arrowDownIcon} />
        </span>
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
};

export default React.memo(Dropdown);
