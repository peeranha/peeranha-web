import { SECONDARY_SPECIAL_2, BORDER_RADIUS_L } from 'style-constants';
import { singleCommunityColors } from 'utils/communityManagement';

import Base from './index';

const colors = singleCommunityColors();

const BaseRounded = Base.extend`
  border-radius: ${({ notRoundedStyle }) => (notRoundedStyle ? 'none' : BORDER_RADIUS_L)};
  transition: 0.5s;
  border: 1px solid ${colors.border || '#fff'};
`;

export default BaseRounded;
