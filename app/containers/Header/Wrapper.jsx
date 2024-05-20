import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import styled from 'styled-components';
import { BG_LIGHT, BORDER_SECONDARY, TEXT_SECONDARY } from 'style-constants';

import { HEADER_HEIGHT, LOADER_HEIGHT, MOBILE_HEADER_HEIGHT } from './constants';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

export const Wrapper = styled.header`
  position: fixed;
  width: 100%;
  height: ${(props) =>
    props.frozenSingleCommunity ? HEADER_HEIGHT + LOADER_HEIGHT : HEADER_HEIGHT}px;
  background: ${BG_LIGHT};
  z-index: 10;
  transform: translate(0px, 0px);
  display: flex;
  flex-direction: column;
  transition: all 0.4s ease;

  &.sticky {
    transform: translate(
      0px,
      -${(props) => (props.frozenSingleCommunity ? HEADER_HEIGHT + LOADER_HEIGHT : HEADER_HEIGHT)}px
    );
  }

  @media only screen and (max-width: 991px) {
    height: ${(props) =>
      props.frozenSingleCommunity ? MOBILE_HEADER_HEIGHT + LOADER_HEIGHT : MOBILE_HEADER_HEIGHT}px;

    &.sticky {
      transform: translate(
        0px,
        -${(props) => (props.isTransactionInPending ? MOBILE_HEADER_HEIGHT + LOADER_HEIGHT : MOBILE_HEADER_HEIGHT)}px
      );
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
  box-shadow: ${graphCommunity ? 'none' : `0 2px 4px 0 ${colors.headerShadow || BORDER_SECONDARY}`};
  flex: 2;
  background: ${(props) => (props.mainSubHeaderBgColor ? props.mainSubHeaderBgColor : '')};
  border-bottom: ${graphCommunity ? '1px solid #3d3d54' : ''};

  form {
    flex: 1;
  }
`;

export const WarningFrozenSingleCommunity = styled.div`
  background: ${graphCommunity ? 'rgba(237, 74, 109, 1)' : 'rgba(252, 102, 85, 1)'};
  color: rgba(255, 255, 255, 1);
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  animation: animation 0.5s forwards;
  @keyframes animation {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  }
`;
