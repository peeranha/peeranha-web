import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

const Wrapper = styled.div`
  * {
    font-family: OpenSans;
    text-transform: none;
    letter-spacing: -0.9px;
  }

  .contained-button {
    width: 100%;
    height: 48px;
    font-family: OpenSans;
    font-size: 18px;
    background-color: #fc6655;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;

    :hover {
      background-color: #fc6655;
    }
  }
`;

export const ContainedButton = ({
  content,
  type = 'button',
  onClick,
  disabled,
}) => (
  <Wrapper className="contained-button-wrapper">
    <Button
      type={type}
      onClick={onClick}
      variant="contained"
      className="contained-button"
      disabled={disabled}
    >
      {content}
    </Button>
  </Wrapper>
);

ContainedButton.propTypes = {
  content: PropTypes.object,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ContainedButton;
