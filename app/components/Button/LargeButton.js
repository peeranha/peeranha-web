import { white, pink } from 'style-constants';
import A from './A';

const LargeButton = A.extend`
  padding: 9px 16px;
  background: ${pink};
  border: 1px solid ${pink};
  color: ${white};
`;

export default LargeButton;
