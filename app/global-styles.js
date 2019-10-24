import { injectGlobal } from 'styled-components';
import reset from 'reset-css';
import { BG_PRIMARY_LIGHT, BG_LIGHT } from 'style-constants';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  ${reset};

  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800');
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i');

  html,
  body {
    width: 100%;
    scroll-behavior: smooth;
    min-height: 100%;
    position: relative;
    font-family: Source Sans Pro, sans-serif;
    background: ${BG_PRIMARY_LIGHT};
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
    z-index: 10100;
  }

  .container {
    max-width: 1320px;

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
  }

  .overflow-hidden {
    overflow: hidden;
  }

  .word-break-all {
    word-break: break-all;
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
`;
