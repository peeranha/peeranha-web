import { css } from 'styled-components';

import { BORDER_SECONDARY, BORDER_RADIUS_L } from 'style-constants';

import Base from './index';

export const S = css`
  background: none;
  box-shadow: none;
  border: none;

  :hover {
    box-shadow: none;
  }
`;

export const BaseSpecial = Base.extend`
  ${S};
  padding: 15px 30px;
  border-bottom: 1px solid ${BORDER_SECONDARY};
  border-top-left-radius: ${({ first }) => (first ? BORDER_RADIUS_L : 0)}px;
  border-top-right-radius: ${({ first }) => (first ? BORDER_RADIUS_L : 0)}px;
  border-bottom-left-radius: ${({ last }) => (last ? BORDER_RADIUS_L : 0)}px;
  border-bottom-right-radius: ${({ last }) => (last ? BORDER_RADIUS_L : 0)}px;
`;

export const BaseSpecialOne = Base.extend`
  ${S};
  padding: 30px;
`;

export default Base.extend`
  ${S};
`;
