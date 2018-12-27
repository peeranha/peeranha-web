import { injectGlobal } from 'styled-components';
import reset from 'reset-css';
/* eslint no-unused-expressions: 0 */
injectGlobal`
  ${reset};

  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800');


  html,
  body {
    width: 100%;
    scroll-behavior: smooth;
  }

  html {
    min-height: 100%;
    position: relative;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  
  a {
    text-decoration: none;
    color: #07C;
  }

  a:visited {
    text-decoration: none;
    color: #005999;
  }

  a:hover {
    text-decoration: none;
    color: #3af;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;
