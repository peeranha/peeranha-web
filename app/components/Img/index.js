import styled from 'styled-components';
import { BORDER_SECONDARY, BG_TRANSPARENT } from 'style-constants';

export const CELL = 24;

const Img = styled.img`
  border-radius: ${x => (x.notRounded ? 0 : 50)}%;
  border: ${x => (x.isBordered ? 1 : 0)}px solid ${BORDER_SECONDARY};
  padding: ${x => (x.isBordered ? '1' : '0')}px;

  width: ${x => (x.size ? Math.floor(x.size * CELL) : CELL)}px;
  height: ${x => (x.size ? Math.floor(x.size * CELL) : CELL)}px;

  background: ${x => (x.bg ? x.bg : BG_TRANSPARENT)};

  object-fit: ${x => (x.noScale ? '' : 'scale-down')};
  display: inline-block;
`;

export default Img;
