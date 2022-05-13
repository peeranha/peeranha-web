import styled from 'styled-components';
import { TRANSPARENT_SPECIAL } from 'style-constants';

export default styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to ${(x) => x.toSide || 'bottom'},
    rgba(${TRANSPARENT_SPECIAL}, 0) 75%,
    rgba(${TRANSPARENT_SPECIAL}, 1) 100%
  );
`;
