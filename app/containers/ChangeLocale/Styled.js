import styled from 'styled-components';
import { LANDING_FONT, BG_SECONDARY_LIGHT } from 'style-constants';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

const Flag = styled.img`
  margin-right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const Li = styled.li`
  font-weight: ${(x) => (x.isBold ? '700' : '400')};
  font-family: ${LANDING_FONT};
  font-size: 14px;
  padding: 8px 20px !important;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${(x) =>
    x.isBold
      ? colors.linkColor || 'var(--color-blue)'
      : graphCommunity
      ? '#E1E1E4'
      : 'var(--color-black)'};
  :hover {
    background: ${BG_SECONDARY_LIGHT};
  }
`;

export { Flag, Li };
