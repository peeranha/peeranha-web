import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { singleCommunityStyles } from 'utils/communityManagement';
import arrowDownIcon from 'images/arrowDown.svg?external';

import Icon from 'components/Icon/index';
import DropdownStyled from './DropdownStyled';
import MenuStyled from './MenuStyled';

const styles = singleCommunityStyles();

const ArrowDown = styled(Icon)`
  path {
    fill: ${styles.commHeadElemColor || ''};
  }
`;

export const Dropdown = ({ button, menu, id, isArrowed, className }) => (
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

      {isArrowed && (
        <ArrowDown icon={arrowDownIcon} width="10" alt="data-icon" />
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
