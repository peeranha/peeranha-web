import BaseTransparent from 'components/Base/BaseTransparent';
import { C3 } from './Simple';

export default BaseTransparent.extend`
  ${({ isColumnForSM }) => C3(isColumnForSM)};
`;
