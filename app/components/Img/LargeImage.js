import Img, { CELL } from './index';

const LargeImage = Img.extend`
  width: ${CELL * 5}px;
  height: ${CELL * 5}px;

  @media only screen and (max-width: 576px) {
    width: ${CELL * 3}px;
    height: ${CELL * 3}px;
  }
`;

export default LargeImage;
