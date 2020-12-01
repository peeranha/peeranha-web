import styled from 'styled-components';

import { BG_PRIMARY_SPECIAL_2, BG_LIGHT, BG_BLACK } from 'style-constants';

import Img, { CELL } from './index';

export const LABEL_SIZE_LG = 'lg';

const MediumImage = Img.extend`
  width: ${CELL * 1.75}px;
  height: ${CELL * 1.75}px;
`;

export const MediumSpecialImage = Img.extend`
  width: 47px;
  height: 47px;
`;

export const MediumImageStyled = MediumImage.extend`
  background: ${BG_PRIMARY_SPECIAL_2};
  margin-right: 18px;
  border-width: 1px;
  border-radius: 50%;
  padding: 1px;
  flex-shrink: 0;
  font-size: 8px;
  line-height: 8px;
`;

export const MediumImageWrapper = styled.div`
  position: relative;
`;

export const MediumImageLabel = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ size }) =>
    size === LABEL_SIZE_LG
      ? 'width: 30px; height: 30px; padding: 4px 6px 2px 4px;'
      : 'width: 18px; height: 18px; padding: 2px 3px 1px 2px;'} border-radius: 50%;
  background-color: ${BG_LIGHT};
  box-shadow: 0 0 2px 0 ${BG_BLACK};
`;

export const MediumImageLabelImage = styled.img`
  width: 100%;
`;

export default MediumImage;
