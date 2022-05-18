import {
  SECONDARY_SPECIAL_2,
  BORDER_RADIUS_L,
  EXPERT_BACKLIGHT,
  TUTORIAL_BACKLIGHT,
} from 'style-constants';

import Base from './index';

const BaseRounded = Base.extend`
  border-radius: ${({ notRoundedStyle }) =>
    notRoundedStyle ? 'none' : BORDER_RADIUS_L};
  box-shadow: 0 2px 2px 0 ${SECONDARY_SPECIAL_2};
  transition: 0.5s;

  :hover {
    box-shadow: 0 5px 5px 0 ${SECONDARY_SPECIAL_2};
    box-shadow: ${({ isExpert, isTutorial }) => {
      if (isExpert) {
        return `6px 6px 5px ${EXPERT_BACKLIGHT}`;
      }
      if (isTutorial) {
        return `6px 6px 5px ${TUTORIAL_BACKLIGHT}`;
      }
      return `0 5px 5px 0 ${SECONDARY_SPECIAL_2}`;
    }}
`;

export default BaseRounded;
