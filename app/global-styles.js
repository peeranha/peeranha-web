import { injectGlobal } from 'styled-components';
import reset from 'reset-css';
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

  #landing-id .container {
    max-width: 1140px;
  }
`;
