import styled from 'styled-components';
import { BG_LIGHT, BG_TRANSPARENT } from 'style-constants';

export default styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to ${(x) /* istanbul ignore next */ => x.toSide || 'bottom'},
    ${BG_TRANSPARENT} 75%,
    ${BG_LIGHT}
  );
`;
