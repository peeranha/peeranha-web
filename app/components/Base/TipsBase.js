import { singleCommunityColors } from 'utils/communityManagement';
import { SECONDARY_SPECIAL_3, BORDER_RADIUS_L } from 'style-constants';

import BaseRoundedNoPadding from './BaseRoundedNoPadding';

const colors = singleCommunityColors();
export default BaseRoundedNoPadding.extend`
  display: flex;

  > *:nth-child(1) {
    flex: 0 0 100%;
    max-width: 100%;
  }

  @media only screen and (min-width: 1366px) {
    > *:nth-child(1) {
      flex: 0 0 calc(100% - 295px);
      max-width: calc(100% - 295px);
    }

    > *:nth-child(2) {
      flex: 0 0 295px;
      max-width: 295px;
      padding: 47px 31px;
      background: ${SECONDARY_SPECIAL_3};
      border-top-right-radius: ${BORDER_RADIUS_L};
      border-bottom-right-radius: ${BORDER_RADIUS_L};
      background: ${colors.backgroundSpecial || ''};
      color: ${colors.black || ''};
    }

    > *:only-child {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }

  @media only screen and (max-width: 1365px) {
    align-items: baseline;
    > *:nth-child(2) {
      display: none;
    }
  }
`;
