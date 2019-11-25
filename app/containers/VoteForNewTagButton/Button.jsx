import Info from 'components/Button/Outlined/Info';
import { TEXT_SECONDARY_LIGHT, BORDER_SECONDARY } from 'style-constants';

const B = Info.extend`
  padding: 0 20px;
  height: 30px;
`;

export const DisagreeButton = B.extend`
  border-color: ${BORDER_SECONDARY};
  color: ${TEXT_SECONDARY_LIGHT};
`;

export default B;
