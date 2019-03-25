import Img, { CELL } from './index';

const SmallImage = Img.extend`
  width: ${CELL * 0.75}px;
  height: ${CELL * 0.75}px;
`;

export default SmallImage;
