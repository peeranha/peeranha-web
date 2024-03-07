/* eslint-disable no-nested-ternary */
import { BORDER_PRIMARY, BORDER_TRANSPARENT } from 'style-constants';
import checked from 'images/okayBlueIcon.svg?inline';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import checkedBlack from 'images/okayBlackIcon.svg?inline';
import Li from './index';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

const CheckedItem = Li.extend`
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  border: 1px solid ${BORDER_TRANSPARENT};

  :before {
    content: '';
    background-image: url(${({ isActive }) =>
      isActive ? (colors && !graphCommunity ? checkedBlack : checked) : ''});
    display: inline-block;
    width: 20px;
    height: 10px;
  }

  :hover {
    border: ${graphCommunity ? 'none' : `1px solid ${colors.textColor || BORDER_PRIMARY}`};
    background-color: ${graphCommunity ? 'rgba(35, 32, 55, 1)' : 'none'};
  }
`;

export default CheckedItem;
