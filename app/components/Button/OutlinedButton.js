import { transparent, pink } from 'style-constants';
import A from './A';

const OutlinedButton = A.extend`
  background: ${transparent};
  border: 1px solid ${pink};
  color: ${pink};
  padding: 4px 20px;
  box-shadow: none;
`;

export default OutlinedButton;
