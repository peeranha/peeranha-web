import styled from 'styled-components';

import { singleCommunityColors } from 'utils/communityManagement';

import {
  HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
} from 'containers/Header/constants';

import { LEFT_MENU_WIDTH } from './constants';

const colors = singleCommunityColors();

const Main = styled.div`
  background: ${colors.mainBackground
    ? colors.mainBackground
    : 'rgb(234, 236, 244)'};
  min-height: 100vh;
  padding-top: ${x => (!x.isMenuVisible ? HEADER_HEIGHT : 0)}px;
  padding-bottom: ${x => (!x.isMenuVisible ? 75 : 0)}px;

  @media only screen and (max-width: 991px) {
    padding-top: ${x => (!x.isMenuVisible ? MOBILE_HEADER_HEIGHT : 0)}px;
    padding-bottom: 0px;
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
