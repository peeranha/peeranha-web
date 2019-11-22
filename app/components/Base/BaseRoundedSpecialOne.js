import { css } from 'styled-components';
import { Link } from 'react-router-dom';

import BaseRounded from './BaseRounded';

const S = css`
  padding: 10px 20px 10px 20px;
  min-height: 84px;
  overflow: hidden;
  white-space: nowrap;
`;

export const BaseLink = BaseRounded.extend`
  ${S};
`.withComponent(Link);

export default BaseRounded.extend`
  ${S};
`;
