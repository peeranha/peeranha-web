import styled from 'styled-components';
import { BG_PRIMARY_SPECIAL_2, BG_SECONDARY_LIGHT, TEXT_PRIMARY, TEXT_SECONDARY } from 'style-constants';

const SIZE_CONFIG = {
  sm: {
    height: 20,
    fontSize: 14,
  },
  md: {
    height: 30,
    fontSize: 16,
  },
};

const TYPE_CONFIG = {
  general: {
    background: BG_SECONDARY_LIGHT,
    color: TEXT_SECONDARY,
  },
  expert: {
    background: BG_PRIMARY_SPECIAL_2,
    color: TEXT_PRIMARY,
  },
};

export default styled.div`
  height: ${({ size }) => SIZE_CONFIG[size].height}px;
  font-size: ${({ size }) => SIZE_CONFIG[size].fontSize}px;
  background: ${({ isGeneral }) => TYPE_CONFIG[isGeneral ? 'general' : 'expert'].background};
  color: ${({ isGeneral }) => TYPE_CONFIG[isGeneral ? 'general' : 'expert'].color};
  padding: 0 9px;
  display: inline-flex;
  align-items: center;
`;
