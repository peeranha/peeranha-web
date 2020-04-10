import { css } from 'styled-components';
import { BORDER_SECONDARY, BORDER_PRIMARY } from 'style-constants';
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
  border-left: ${({ origin }) => (origin ? `1px solid ${BORDER_PRIMARY}` : 0)};
  border-right: ${({ origin }) => (origin ? `1px solid ${BORDER_PRIMARY}` : 0)};
  border-top: ${({ origin }) => (origin ? `1px solid ${BORDER_PRIMARY}` : 0)};
  border-bottom: ${({ last, origin, overOrigin }) => {
    if (overOrigin || last) {
      return 0;
    }

    if (origin) {
      return `1px solid ${BORDER_PRIMARY}`;
    }

    return `1px solid ${BORDER_SECONDARY}`;
  }};
  border-top-left-radius: ${({ first }) => (first ? 5 : 0)}px;
  border-top-right-radius: ${({ first }) => (first ? 5 : 0)}px;
  border-bottom-left-radius: ${({ last }) => (last ? 5 : 0)}px;
  border-bottom-right-radius: ${({ last }) => (last ? 5 : 0)}px;
`;

export const BaseSpecialOne = Base.extend`
  ${S};
  padding: 30px;
`;

export default Base.extend`
  ${S};
`;
