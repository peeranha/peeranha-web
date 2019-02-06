import styled from 'styled-components';
import { LEFT_MENU_WIDTH } from 'containers/App/constants';

const Logo = styled.div`
  display: flex;
  flex-basis: ${LEFT_MENU_WIDTH}px;
  justify-content: left;

  img {
    width: 180px;
    position: relative;
    height: 40px;
    top: 5px;
    cursor: pointer;
  }
`;

export default Logo;
