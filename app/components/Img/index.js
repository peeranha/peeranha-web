import styled from 'styled-components';
import { BORDER_SECONDARY } from 'style-constants';

export const CELL = 24;

/* istanbul ignore next */
const Img = styled.img`
  border-radius: ${props => (props.notRounded ? 0 : 50)}%;
  border: ${props => (props.isBordered ? 1 : 0)}px solid ${BORDER_SECONDARY};

  width: ${props => (props.size ? Math.floor(props.size * CELL) : CELL)}px;
  height: ${props => (props.size ? Math.floor(props.size * CELL) : CELL)}px;

  object-fit: scale-down;
  display: inline-block;
`;

export default Img;
