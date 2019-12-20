import { SECONDARY_SPECIAL_3 } from 'style-constants';
import BaseRoundedNoPadding from './BaseRoundedNoPadding';

export default BaseRoundedNoPadding.extend`
  display: flex;

  > *:nth-child(1) {
    flex: 0 0 100%;
    max-width: 100%;
  }

  @media only screen and (min-width: 1200px) {
    > *:nth-child(1) {
      flex: 0 0 calc(100% - 340px);
      max-width: calc(100% - 340px);
    }

    > *:nth-child(2) {
      flex: 0 0 340px;
      max-width: 340px;
      padding: 47px 36px;
      background: ${SECONDARY_SPECIAL_3};
    }
  }

  @media only screen and (max-width: 992px) {
    align-items: baseline;
    > *:nth-child(2) {
      display: none;
    }
  }
`;
