import { css } from 'styled-components';
import { Link } from 'react-router-dom';

import Info from './Info';
import Large from '../Large';

const ButtonCss = css`
  ${Large};
`;

export const InfoLink = Info.extend`
  ${ButtonCss};
`.withComponent(Link);

export default Info.extend`
  ${ButtonCss};
`;
