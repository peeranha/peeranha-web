import { injectGlobal } from 'styled-components';
import reset from 'reset-css';
import OpenSansRegular from 'fonts/OpenSansRegular.ttf';
import OpenSansSemiBold from 'fonts/OpenSansSemiBold.ttf';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  ${reset};

  @font-face {
   font-family: "OpenSans";
   src: url(${OpenSansRegular});
  }

  @font-face {
   font-family: "OpenSansBold";
   src: url(${OpenSansSemiBold});
  }

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
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;
