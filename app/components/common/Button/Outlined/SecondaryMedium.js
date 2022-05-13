import Secondary from './Secondary';
import { hover } from './Info';
import Medium from '../Medium';

export const SecondaryWithInfoHover = Secondary.extend`
  ${Medium};
  ${hover};
`;

export default Secondary.extend`
  ${Medium};
`;
