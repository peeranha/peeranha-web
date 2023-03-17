import { SECONDARY_SPECIAL_2, BORDER_RADIUS_L } from 'style-constants';
import { singleCommunityColors } from 'utils/communityManagement';

import Base from './index';

const colors = singleCommunityColors();

const BaseRounded = Base.extend`
  border-radius: ${({ notRoundedStyle }) => (notRoundedStyle ? 'none' : BORDER_RADIUS_L)};
  box-shadow: 0 2px 2px 0 ${colors.baseShadow || SECONDARY_SPECIAL_2};
  transition: 0.5s;

  :hover {
    box-shadow: 5px 5px 5px ${colors.baseShadow || 'rgba(40, 40, 40, 0.1)'};
  }
`;

export default BaseRounded;
