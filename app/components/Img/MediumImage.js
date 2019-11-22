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
  background: #dfe3f2;
  margin-right: 18px;
`;

export { MediumImageStyled, MediumSpecialImage };
export default MediumImage;
