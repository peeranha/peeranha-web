import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ArrowDownFillIcon from 'icons/ArrowDownFill';

import Menu from './MenuStyled';

export const MenuStyled = Menu.extend`
  position: absolute;
  z-index: 9;
  width: auto;
`;

const TargetButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Blanket = styled.div`
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  position: fixed;
  z-index: 8;
`;

const Chevron = styled.span`
  padding-left: 15px;

  img {
    transform: rotate(${({ isOpen }) => (isOpen ? '180deg' : '0deg')});
    transition: 0.5s;
  }

  @media only screen and (max-width: 576px) {
    padding-left: 5px;
  }
`;

const Dropdown = ({ children, isOpen, target, toggle, isArrowed }) => (
  <div className="position-relative">
    <TargetButton onClick={toggle}>
      {target}
      {isArrowed && (
        <>
          <Chevron isOpen={isOpen}>
            <ArrowDownFillIcon
              fill="#7B7B7B"
              className={isOpen && 'transform180'}
            />
          </Chevron>
        </>
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
