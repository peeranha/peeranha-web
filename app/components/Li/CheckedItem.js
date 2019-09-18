import { BORDER_PRIMARY, BORDER_TRANSPARENT } from 'style-constants';
import checked from 'images/okayBlueIcon.svg?inline';

import Li from './index';

const CheckedItem = Li.extend`
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  border: 1px solid ${BORDER_TRANSPARENT};

  :before {
    content: '';
    background-image: url(${({ isActive }) => (isActive ? checked : '')});
    display: inline-block;
    width: 20px;
    height: 10px;
  }

  :hover {
    border: 1px solid ${BORDER_PRIMARY};
  }
`;

export default CheckedItem;
