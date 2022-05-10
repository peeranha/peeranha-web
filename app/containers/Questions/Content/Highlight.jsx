import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { PEER_PRIMARY_TRANSPARENT_COLOR } from 'style-constants';

const Span = styled.span`
  width: 100%;
  background: ${PEER_PRIMARY_TRANSPARENT_COLOR};
`;

export const Highlight = ({ filter, str }) => {
  const textArray = str.split(filter);
  return (
    <>
      {textArray.map((item, index) => (
        <Fragment key={item}>
          {item}
          {index !== textArray.length - 1 && <Span>{filter}</Span>}
        </Fragment>
      ))}
    </>
  );
};

Highlight.propTypes = {
  filter: PropTypes.string,
  str: PropTypes.string,
};
