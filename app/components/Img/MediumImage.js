import { BG_PRIMARY_SPECIAL_2 } from 'style-constants';
import Img, { CELL } from './index';

const MediumImage = Img.extend`
  width: ${CELL * 1.75}px;
  height: ${CELL * 1.75}px;
`;

const MediumSpecialImage = Img.extend`
  width: 47px;
  height: 47px;
`;

const MediumImageStyled = MediumImage.extend`
  background: ${BG_PRIMARY_SPECIAL_2};
  margin-right: 18px;
  border-width: 1px;
  border-radius: 50%;
  padding: 1px;
  flex-shrink: 0;
  font-size: 8px;
  line-height: 8px;
`;

export { MediumImageStyled, MediumSpecialImage };
export default MediumImage;
