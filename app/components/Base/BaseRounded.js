import { SECONDARY_SPECIAL_2, BORDER_RADIUS_L } from 'style-constants';

import Base from './index';

const BaseRounded = Base.extend`
  border-radius: ${({ notRoundedStyle }) =>
    notRoundedStyle ? 'none' : BORDER_RADIUS_L} !important;
  box-shadow: 0 2px 2px 0 ${SECONDARY_SPECIAL_2};
  transition: 0.5s;

  :hover {
    box-shadow: 0 5px 5px 0 ${SECONDARY_SPECIAL_2};
    box-shadow: ${({ isExpert, isTutorial, isDiscussion }) =>
      isExpert
        ? `5px 5px 5px rgba(165, 188, 255, 0.6)`
        : isTutorial
        ? `5px 5px 5px rgba(135, 210, 151, 0.6)`
        : isDiscussion
        ? `5px 5px 5px rgba(242, 163, 159, 0.6)`
        : `0 5px 5px 0 ${SECONDARY_SPECIAL_2}`};}
  }
`;

export default BaseRounded;
