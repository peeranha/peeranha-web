import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import arrowDownIcon from 'images/arrowDown.svg?inline';

import Menu from './MenuStyled';

export const MenuStyled = Menu.extend`
  position: absolute;
  z-index: 2;
`;

const TargetButton = styled.div`
  cursor: pointer;
`;

const Blanket = styled.div`
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  position: fixed;
  z-index: 1;
`;

const Chevron = styled.span`
  transform: rotate(
    ${/* istanbul ignore next */ ({ isOpen }) => (isOpen ? '180deg' : '0deg')}
  );
  transition: 0.5s;
`;
/* istanbul ignore next */
const Dropdown = ({ children, isOpen, target, toggle, isArrowed }) => (
  <div className="position-relative">
    <TargetButton className="d-flex align-items-center" onClick={toggle}>
      {target}
      {isArrowed && (
        <Chevron isOpen={isOpen}>
          <img className="px-3" src={arrowDownIcon} alt="icon" />
        </Chevron>
      )}
    </TargetButton>

    {isOpen ? <MenuStyled>{children}</MenuStyled> : null}
    {isOpen ? <Blanket onClick={toggle} /> : null}
  </div>
);

Dropdown.propTypes = {
  children: PropTypes.any,
  isOpen: PropTypes.bool,
  target: PropTypes.any,
  toggle: PropTypes.func,
  isArrowed: PropTypes.bool,
};

export default Dropdown;
