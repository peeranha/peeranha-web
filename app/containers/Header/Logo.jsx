import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LEFT_MENU_WIDTH } from 'containers/App/constants';

const Logo = styled.div`
  display: flex;
  width: ${LEFT_MENU_WIDTH}px;

  justify-content: left;
  img {
    width: 180px;
    position: relative;
    height: 40px;
    top: 5px;
    cursor: pointer;
  }

  @media only screen and (max-width: 992px) {
    width: auto;

    img {
      width: 150px;
    }
  }
`.withComponent(Link);

export default Logo;
