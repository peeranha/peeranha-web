import Img, { CELL } from './index';

const SmallImage = Img.extend`
  width: ${CELL * 0.75}px;
  height: ${CELL * 0.75}px;
`;

export const SmallSpecialImage = Img.extend`
  width: 27px;
  height: 27px;
`;

export default SmallImage;
