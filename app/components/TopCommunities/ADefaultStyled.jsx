import styled from 'styled-components';
import BackSide from './BackSide';

const ADefaultStyled = styled.a`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &:hover ${BackSide} {
    display: block;
  }
`;

export default ADefaultStyled;
