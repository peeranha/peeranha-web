import Img, { CELL } from './index';

const LargeImage = Img.extend`
  width: ${CELL * 5}px;
  height: ${CELL * 5}px;
`;

export default LargeImage;
