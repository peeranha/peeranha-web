import { css } from 'styled-components';
import { TEXT_PRIMARY } from 'style-constants';
import Ul from './index';
import { singleCommunityColors } from 'utils/communityManagement';
const colors = singleCommunityColors();

const S = css`
  min-width: 220px;
  padding: 0 !important;

  > a {
    padding: 5px 16px;
    font-size: 14px;

    :hover {
      background-color: rgba(35, 32, 55, 1);
    }
  }

  > * {
    font-size: 16px;
    line-height: 30px;
    white-space: nowrap;
    display: flex;
    align-items: center;

    :hover {
      color: ${colors.linkColor || TEXT_PRIMARY};
    }
  }
`;

export const Ul1 = Ul.extend`
  ${S};
  padding: 15px 20px;

  > * {
    color: ${TEXT_PRIMARY};
  }
`;

export default Ul.extend`
  ${S};
`;
