import styled from 'styled-components';

import {
  LANDING_FONT,
  TEXT_DARK,
  TEXT_SECONDARY,
  TEXT_PRIMARY,
  BORDER_SECONDARY,
  BG_SECONDARY_LIGHT,
} from 'style-constants';

const Box = styled.div`
  button {
    cursor: pointer;
    outline: none;
    display: flex;
    align-items: center;

    .locale {
      color: ${TEXT_DARK};
      font-size: 16px;
      padding: 0 5px;
      letter-spacing: -0.6px;
      vertical-align: 1px;
    }

    .caret {
      color: ${TEXT_SECONDARY};
      font-size: 12px;
      display: inline-block;
      transition: 0.5s;
      transform: rotate(180deg);
      vertical-align: 2px;
      margin-left: 5px;
    }

    :hover .locale {
      color: ${TEXT_PRIMARY};
    }
  }

  button[aria-expanded='true'] .caret {
    transform: rotate(180deg);
  }

  button[aria-expanded='false'] .caret {
    transform: rotate(0deg);
  }

  ul {
    box-shadow: -2px 2px 5px ${BORDER_SECONDARY};
  }
`;

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
  padding: 0 10px;

  :hover {
    background: ${BG_SECONDARY_LIGHT};
  }
`;

export { Box, Flag, Li };
