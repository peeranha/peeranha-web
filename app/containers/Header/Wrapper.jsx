import styled from 'styled-components';
import { BG_LIGHT, BORDER_SECONDARY, TEXT_SECONDARY } from 'style-constants';

import { HEADER_HEIGHT, MOBILE_HEADER_HEIGHT } from './constants';

export const Wrapper = styled.header`
  position: fixed;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  background: ${BG_LIGHT};
  z-index: 10;
  transform: translate(0px, 0px);
  display: flex;
  flex-direction: column;
  transition: all 0.4s ease;

  &.sticky {
    transform: translate(0px, -${HEADER_HEIGHT}px);
  }

  @media only screen and (max-width: 991px) {
    height: ${MOBILE_HEADER_HEIGHT}px;

    &.sticky {
      transform: translate(0px, -${MOBILE_HEADER_HEIGHT}px);
    }
  }
`;

export const SingleModeSubHeader = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${BORDER_SECONDARY};
  box-shadow: 0 0 1px 0 ${BORDER_SECONDARY};

  > div {
    display: flex;
    align-items: center;

    @media only screen and (max-width: 576px) {
      overflow-x: auto;
    }
  }

  #peeranha-logo {
    width: 100px;
    margin-top: 10px;
  }

  div > a {
    font-size: 14px;
    line-height: 18px;
    color: ${TEXT_SECONDARY};
    margin-right: 25px;
    white-space: nowrap;
  }

  @media only screen and (max-width: 991px) {
    display: none;
  }
`;

export const MainSubHeader = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px 0 ${BORDER_SECONDARY};
  flex: 2;
  background-color: ${props =>
    props.mainSubHeaderBgColor ? props.mainSubHeaderBgColor : ''};

  form {
    flex: 1;
  }
`;
