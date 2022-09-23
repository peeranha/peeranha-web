import { BORDER_PRIMARY, BORDER_TRANSPARENT } from 'style-constants';
import checked from 'images/okayBlueIcon.svg?inline';
import checkedBlack from 'images/okayBlackIcon.svg?inline';
import Li from './index';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

const CheckedItem = Li.extend`
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  border: 1px solid ${BORDER_TRANSPARENT};

  :before {
    content: '';
    background-image: url(${({ isActive }) =>
      isActive ? (colors ? checkedBlack : checked) : ''});
    display: inline-block;
    width: 20px;
    height: 10px;
  }

  :hover {
    border: 1px solid ${colors.textColor || BORDER_PRIMARY};
  }
`;

export default CheckedItem;
