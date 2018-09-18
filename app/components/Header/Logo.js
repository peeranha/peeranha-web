import styled from 'styled-components';
import * as img from './images/header-logo.png';

const height = 50;
const Logo = styled.img`
  height: ${height}px;
  width: 160px;
  background: url(${img}) no-repeat;
  background-size: cover;
  cursor: pointer;
  border-radius: 3px;
  padding: ${height / 2}px;
`;

export default Logo;
