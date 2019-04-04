import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import arrowDownIcon from 'svg/arrowDown';
import Icon from 'components/Icon';

import Menu from './MenuStyled';

export const MenuStyled = Menu.extend`
  position: absolute;
  z-index: 2;
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
    ${({ isOpen }) /* istanbul ignore next */ => (isOpen ? '180deg' : '0deg')}
  );
  transition: 0.5s;
`;

const Dropdown /* istanbul ignore next */ = ({
  children,
  isOpen,
  target,
  onClose,
  isArrowed,
}) => (
  <div className="position-relative">
    <div className="d-flex align-items-center">
      {target}
      {isArrowed && (
        <Chevron isOpen={isOpen}>
          <Icon className="mx-3" icon={arrowDownIcon} />
        </Chevron>
      )}
    </div>

    {isOpen ? <MenuStyled>{children}</MenuStyled> : null}
    {isOpen ? <Blanket onClick={onClose} /> : null}
  </div>
);

Dropdown.propTypes = {
  children: PropTypes.any,
  isOpen: PropTypes.bool,
  target: PropTypes.any,
  onClose: PropTypes.func,
  isArrowed: PropTypes.bool,
};

export default Dropdown;
