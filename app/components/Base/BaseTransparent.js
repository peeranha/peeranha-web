import { css } from 'styled-components';
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
`;

export const BaseSpecialOne = Base.extend`
  ${S};
  padding: 30px;
`;

export default Base.extend`
  ${S};
`;
