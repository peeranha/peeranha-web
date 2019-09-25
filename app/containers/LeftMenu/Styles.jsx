import styled, { css } from 'styled-components';

import {
  BG_LIGHT,
  BORDER_SECONDARY,
  BORDER_TRANSPARENT,
  TEXT_PRIMARY,
  TEXT_PRIMARY_DARK,
} from 'style-constants';

import { LEFT_MENU_WIDTH } from 'containers/App/constants';

import {
  HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
} from 'containers/Header/constants';

import IconStyled, { IconHover } from 'components/Icon/IconStyled';

export const BasicLink = css`
  display: flex;
  align-items: center;
  padding: 10px 0 10px 15px;
  border-left: 3px solid ${BORDER_TRANSPARENT};
  cursor: pointer;

  @media only screen and (min-width: 992px) {
    :hover {
      color: ${TEXT_PRIMARY};

      ${IconStyled} {
        ${IconHover({ color: TEXT_PRIMARY })};
      }
    }
  }
`;

export const Aside = styled.aside`
  ${x =>
    x.isMenuVisible
      ? `
    width: 100%;
    min-height: 100vh;`
      : `
    width: ${LEFT_MENU_WIDTH}px;
    margin-top: 15px;
    margin-right: 15px;
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
  background: ${TEXT_PRIMARY_DARK}E6;
  justify-content: center;
  padding-top: 25px;
`;

export const ViewStyled = styled.nav`
  position: ${x => (x.isMenuVisible ? 'relative' : 'fixed')};
  width: ${x => (x.isMenuVisible ? '100%' : `${LEFT_MENU_WIDTH}px`)};
  transition: 0.4s;

  > div {
    padding: 12px 0 12px 12px;
    margin-bottom: 20px;

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

  @media only screen and (max-width: 576px) {
    &.sticky {
      transform: translate(0px, -${MOBILE_HEADER_HEIGHT}px);
    }
  }
`;
