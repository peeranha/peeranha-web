import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { blue, transparent, white, black } from 'style-constants';

const Div = styled.div`
  background: ${x => (x.choice ? blue : transparent)};
  color: ${x => (x.choice ? white : black)};
  border-radius: 3px;
  padding: 5px 20px;
  text-align: center;

  > *:nth-child(1) {
    font-weight: ${x => (x.choice ? '600' : 'normal')};
    margin-bottom: 5px;
  }

  > *:nth-child(2) {
    font-size: 14px;
    color: ${x => (x.choice ? white : black)};
  }
`;

const AlreadyVoted = ({ choice, children }) => (
  <Div choice={choice}>{children}</Div>
);

AlreadyVoted.propTypes = {
  choice: PropTypes.bool,
  children: PropTypes.any,
};

export default React.memo(AlreadyVoted);
