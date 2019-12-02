import styled from 'styled-components';
import { LANDING_FONT, BG_SECONDARY_LIGHT } from 'style-constants';

const Flag = styled.img`
  margin-right: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
`;

const Li = styled.li`
  font-weight: ${x => (x.isBold ? '700' : '400')};
  font-family: ${LANDING_FONT};
  font-size: 14px;
  padding: 8px 20px !important;
  display: flex;
  align-items: center;
  cursor: pointer;

  :hover {
    background: ${BG_SECONDARY_LIGHT};
  }
`;

export { Flag, Li };
