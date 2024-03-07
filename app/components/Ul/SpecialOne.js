import { css } from 'styled-components';
import { TEXT_PRIMARY } from 'style-constants';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import Ul from './index';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

const S = css`
  min-width: ${graphCommunity ? '220px' : '125px'};
  padding: ${graphCommunity ? '0 !important' : '12px 20px'};

  > a {
    padding: ${graphCommunity ? '5px 16px' : ''};
    font-size: ${graphCommunity ? '14px' : ''};

    :hover {
      background-color: ${graphCommunity ? 'rgba(35, 32, 55, 1)' : ''};
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
