import styled, { css } from 'styled-components';

import { singleCommunityColors } from 'utils/communityManagement';

import {
  BG_LIGHT,
  BORDER_SECONDARY,
  BORDER_TRANSPARENT,
  BG_PRIMARY_DARK_RGB,
} from 'style-constants';

import { LEFT_MENU_WIDTH } from 'containers/AppWrapper/constants';

import {
  HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
} from 'containers/Header/constants';

const colors = singleCommunityColors();

export const BasicLink = css`
  display: flex;
  align-items: center;
  padding: 10px 0 10px 15px;
  border-left: 3px solid ${BORDER_TRANSPARENT};
  cursor: pointer;
`;

export const Aside = styled.aside`
  position: relative;
  z-index: 1;
  ${x =>
    x.isMenuVisible
      ? `
    width: 100%;
    min-height: 100vh;`
      : `
    width: ${LEFT_MENU_WIDTH}px;
    min-width: ${LEFT_MENU_WIDTH}px;
    margin-top: 30px;
    margin-right: 17px;
  `};
`;

export const After = styled.div`
  position: relative;
  display: ${x => (x.isMenuVisible ? 'flex' : 'none')};
  top: 0;
  right: 0;
  width: 50px;
  height: 100%;
  z-index: 9999;
  background: ${colors.darkBlue
    ? colors.darkBlue
    : `rgba(${BG_PRIMARY_DARK_RGB}, 0.9)`};
  justify-content: center;
  padding-top: 25px;
`;

export const ViewStyled = styled.nav`
  position: ${x => (x.isMenuVisible ? 'relative' : 'fixed')};
  width: inherit;
  transition: 0.4s;

  > div:nth-child(${({ single }) => (single ? 2 : 1)}) {
    padding: ${x => (x.isMenuVisible ? '5px 10px' : '0 0 25px 0')};
    margin-bottom: ${x => (x.isMenuVisible ? '0px' : '50px')};
  }

  > div {
    &.lightbg {
      padding: 8px 0 8px 12px;
      background: ${BG_LIGHT};
      margin-bottom: 0;

      &.use-default-links {
        a,
        button {
          ${BasicLink};
        }
      }
    }
  }

  > div:not(:last-child) {
    border-bottom: 1px solid ${BORDER_SECONDARY};
  }

  &.sticky {
    transform: translate(0px, -${HEADER_HEIGHT}px);
  }

  @media only screen and (max-width: 991px) {
    > div.lightbg {
      padding: 2px 0 2px 5px;
    }

    &.sticky {
      transform: translate(0px, -${MOBILE_HEADER_HEIGHT}px);
    }
  }
`;
