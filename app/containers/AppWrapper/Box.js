import styled from 'styled-components';

import { singleCommunityColors } from 'utils/communityManagement';

import {
  HEADER_HEIGHT,
  LOADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
} from 'containers/Header/constants';

import { LEFT_MENU_WIDTH } from './constants';

const colors = singleCommunityColors();

const Main = styled.div`
  background: ${colors.mainBackground
    ? colors.mainBackground
    : 'rgb(234, 236, 244)'};
  min-height: 100vh;
  padding-top: ${x => {
    if (x.isMenuVisible) {
      return 0;
    }

    if (x.transactionInitialised) {
      return HEADER_HEIGHT + LOADER_HEIGHT;
    }

    return HEADER_HEIGHT;
  }}px;
  padding-bottom: ${x => (!x.isMenuVisible ? 25 : 0)}px;

  @media only screen and (max-width: 991px) {
    padding-top: ${x => {
      if (x.isMenuVisible) {
        return 0;
      }

      if (x.transactionInitialised) {
        return MOBILE_HEADER_HEIGHT + LOADER_HEIGHT;
      }

      return MOBILE_HEADER_HEIGHT;
    }}px;
    padding-bottom: 15px;
  }
`;

const WrapStyled = styled.main`
  margin-top: 10px;
  width: calc(100% - ${LEFT_MENU_WIDTH}px - 17px);

  @media only screen and (max-width: 992px) {
    width: 100%;
  }

  @media only screen and (max-width: 576px) {
    margin-top: 0px;
  }
`;

export { Main, WrapStyled };
