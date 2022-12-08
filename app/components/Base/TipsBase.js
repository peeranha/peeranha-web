import { SECONDARY_SPECIAL_3, BORDER_RADIUS_L } from 'style-constants';

import BaseRoundedNoPadding from './BaseRoundedNoPadding';

export default BaseRoundedNoPadding.extend`
  display: flex;

  > *:nth-child(1) {
    flex: 0 0 100%;
    max-width: 100%;
  }

  @media only screen and (min-width: 1366px) {
    > *:nth-child(1) {
      flex: 0 0 calc(100% - 300px);
      max-width: calc(100% - 300px);
    }

    > *:nth-child(2) {
      flex: 0 0 300px;
      max-width: 300px;
      padding: 47px 31px;
      background: ${SECONDARY_SPECIAL_3};
      border-top-right-radius: ${BORDER_RADIUS_L};
      border-bottom-right-radius: ${BORDER_RADIUS_L};
    }
  }

  @media only screen and (max-width: 1365px) {
    align-items: baseline;
    > *:nth-child(2) {
      display: none;
    }
  }
`;
