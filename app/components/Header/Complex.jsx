import Base from 'components/Base';
import { C3 } from './Simple';

export default Base.extend`
  ${({ isColumnForSM }) => C3(isColumnForSM)};
`;
