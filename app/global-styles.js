import { injectGlobal } from 'styled-components';
import reset from './reset-css';
import { BG_PRIMARY_LIGHT, BG_LIGHT, APP_FONT } from 'style-constants';

import _get from 'lodash/get';

import { singleCommunityStyles, graphCommunityColors } from './utils/communityManagement';

const graphCommunity = graphCommunityColors();
const styles = singleCommunityStyles();

const getItalicFont = () => (/iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'normal' : 'italic');
export const italicFont = getItalicFont();

/* eslint no-unused-expressions: 0 */
injectGlobal`
  ${reset}

  ;

  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800');
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i');
  @import url('https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  @import url('https://fonts.cdnfonts.com/css/euclid-circular-a');
  ${_get(styles, 'fontFace', '')}
  html,
  body {
    width: 100%;
    scroll-behavior: smooth;
    min-height: 100%;
    position: relative;
    font-family: ${APP_FONT};
    background: ${BG_PRIMARY_LIGHT};
    word-break: break-all;

    @supports (word-break: break-word) {
      word-break: break-word;
    }

    word-wrap: break-word;
  }

  button, a {
    cursor: pointer;
    outline: none !important;
    text-decoration: none !important;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  #modal > div {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 900;
  }

  .container {
    max-width: 1360px;

    &.container-mobile {
      @media only screen and (max-width: 576px) {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }

  #landing-id {
    background: ${BG_LIGHT};

    .container {
      max-width: 1140px;
    }
  }

  .popover {
    z-index: 100000;

    @media only screen and (max-width: 576px) {
      width: 200px;
      font-size: 13px;
      line-height: 16px;
    }
  }

  .overflow-hidden {
    overflow: hidden;
  }

  .overflow-initial {
    overflow: initial;
  }

  @media only screen and (min-width: 576px) {
    .mb-from-sm-3 {
      margin-bottom: 15px !important;
    }
  }

  @media only screen and (max-width: 576px) {
    .mb-to-sm-0 {
      margin-bottom: 0px !important;
    }

    .mb-to-sm-2 {
      margin-bottom: 10px !important;
    }
  }

  @media only screen and (max-width: 768px) {
    .mb-to-md-2 {
      margin-bottom: 10px !important;
    }
  }

  .grecaptcha-badge {
    display: none;
  }


  .popover-body {
    background-color: ${graphCommunity ? '#6f4cff !important' : ''};
    border-radius: ${graphCommunity ? '3px' : ''};
    color: ${graphCommunity ? '#ffffff' : ''};
  }

  .arrow::after {
    border-top-color: ${graphCommunity ? '#6f4cff !important' : ''};
  }
`;
