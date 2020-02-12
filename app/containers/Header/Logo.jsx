import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LEFT_MENU_WIDTH } from 'containers/AppWrapper/constants';

const Logo = styled.div`
  display: flex;
  justify-content: left;
  width: ${LEFT_MENU_WIDTH}px;

  img {
    width: 180px;
    height: 40px;
    object-fit: contain;
    margin-top: 5px;
  }

  @media only screen and (max-width: 992px) {
    width: auto;

    img {
      width: 150px;
    }
  }
`.withComponent(Link);

export default Logo;
