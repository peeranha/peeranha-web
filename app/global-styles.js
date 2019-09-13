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

  @media only screen and (min-width: 320px) {
    .mt-xs-1 {
      margin-top: 5px !important;
    }
  }

  @media only screen and (min-width: 768px) {
    .mt-md-0 {
      margin-top: 0px !important;
    }
  }
`;
