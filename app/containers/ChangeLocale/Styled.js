/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { BG_SECONDARY_LIGHT } from 'style-constants';
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
  font-family: ${graphCommunity ? 'Euclid Circular A, sans-serif' : 'Source Sans Pro, sans-serif'};
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
    background: ${graphCommunity ? 'rgba(35, 32, 55, 1)' : BG_SECONDARY_LIGHT};
    color: ${graphCommunity ? 'rgba(255, 255, 255, 1)' : colors.btnColor || 'var(--color-blue)'};
  }
`;

export { Flag, Li };
