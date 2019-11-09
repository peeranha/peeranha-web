import Img, { CELL } from './index';

const MediumImage = Img.extend`
  width: ${CELL * 1.75}px;
  height: ${CELL * 1.75}px;
`;

const MediumImageStyled = MediumImage.extend`
  background: #dfe3f2;
  margin-right: 18px;
`;

export { MediumImageStyled };
export default MediumImage;
