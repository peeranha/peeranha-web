import styled from 'styled-components';

import { BG_PRIMARY_SPECIAL_2, BORDER_SECONDARY, BORDER_PRIMARY } from 'style-constants';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

const MediumIcon = styled.span`
  .stroke {
    stroke: ${BORDER_PRIMARY};
  }

  .fill {
    fill: ${BG_PRIMARY_SPECIAL_2};
  }
`;

const MediumIconStyled = MediumIcon.extend`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;

  border: 1px solid ${colors.secondaryAdditional || BORDER_SECONDARY};

  background: ${graphCommunity ? '#161425' : colors.userInformation || BG_PRIMARY_SPECIAL_2};
  margin-right: 18px;
  border-radius: 50%;
  padding: 1px;
  flex-shrink: 0;
  font-size: 8px;
  line-height: 8px;
`;

export { MediumIconStyled };
export default MediumIcon;
