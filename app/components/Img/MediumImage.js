import Img, { CELL } from './index';

const MediumImage = Img.extend`
  width: ${CELL * 1.75}px;
  height: ${CELL * 1.75}px;
`;

export default MediumImage;
