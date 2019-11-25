import { css } from 'styled-components';
import { Link } from 'react-router-dom';

import Info from './Info';

const ButtonCss = css`
  padding: 12px 18px;
  min-width: 92px;
`;

export const InfoLink = Info.extend`
  ${ButtonCss};
`.withComponent(Link);

export default Info.extend`
  ${ButtonCss};
`;
