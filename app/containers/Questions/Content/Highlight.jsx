import React from 'react';
import styled from 'styled-components';
import {
  PEER_PREMIUM_TRANSPARENT_COLOR,
  PEER_PRIMARY_TRANSPARENT_COLOR,
} from 'style-constants';

const Span = styled.span`
  width: 100%;
  background: ${PEER_PRIMARY_TRANSPARENT_COLOR};
`;

export const Highlight = ({ filter, str }) => {
  if (!filter) return str;
  const regex = new RegExp(filter, 'ig');
  const matchValue = str.match(regex);
  if (matchValue) {
    return str.split(regex).map((chunk, i, arr) => {
      if (i < arr.length - 1) {
        const head = matchValue.shift();
        return (
          <>
            {chunk}
            <Span>{head}</Span>
          </>
        );
      }
      return chunk;
    });
  }
  return str;
};
