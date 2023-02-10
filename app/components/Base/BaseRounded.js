import { SECONDARY_SPECIAL_2, BORDER_RADIUS_L } from 'style-constants';

import Base from './index';

const BaseRounded = Base.extend`
  border-radius: ${({ notRoundedStyle }) =>
    notRoundedStyle ? 'none' : BORDER_RADIUS_L} !important;
  box-shadow: 0 2px 2px 0 ${SECONDARY_SPECIAL_2};
  transition: 0.5s;

  :hover {
    box-shadow: 5px 5px 5px rgba(40, 40, 40, 0.1);
  }
`;

export default BaseRounded;
