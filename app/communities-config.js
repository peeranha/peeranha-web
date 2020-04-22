import React from 'react';
import OntLogo from 'images/communities-logos/ont.svg?inline';
import TelosLogo from 'images/communities-logos/telos.png';
import coinsBlueIcon from 'images/coinsBlue.svg?inline';

import MediumEOT from 'fonts/Telos/NeueHaasDisplay-Mediu.eot';
import MediumWOFF from 'fonts/Telos/NeueHaasDisplay-Mediu.woff';
import MediumTTF from 'fonts/Telos/NeueHaasDisplay-Mediu.ttf';

import LightEOT from 'fonts/Telos/NeueHaasDisplay-Light.eot';
import LightWOFF from 'fonts/Telos/NeueHaasDisplay-Light.woff';
import LightTTF from 'fonts/Telos/NeueHaasDisplay-Light.ttf';

import ThinEOT from 'fonts/Telos/NeueHaasDisplay-Thin.eot';
import ThinWOFF from 'fonts/Telos/NeueHaasDisplay-Thin.woff';
import ThinTTF from 'fonts/Telos/NeueHaasDisplay-Thin.ttf';

import RomanEOT from 'fonts/Telos/NeueHaasDisplay-Roman.eot';
import RomanWOFF from 'fonts/Telos/NeueHaasDisplay-Roman.woff';
import RomanTTF from 'fonts/Telos/NeueHaasDisplay-Roman.ttf';

import TelosSubHeader from './components/CustomSubHeaders/TelosSubHeader';
import TelosMobileSubHeader from './components/CustomSubHeaders/TelosMobileSubHeader';

const styles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  poweredByPeeranha: true,
  withoutAdditionalLinks: true,
  coinsIcon: coinsBlueIcon,
  leftMenuLogo: TelosLogo,
  mobileSubHeader: <TelosMobileSubHeader />,
  customSubHeader: <TelosSubHeader />,
  withoutFAQ: true,
  fonts: {
    h3LetterSpacing: '1px',
    tagsLetterSpacing: '1px',
    questionTitleLetterSpacing: '1px',
    h3: 'Neue Haas Grotesk Display Pro Medium, Source Sans Pro, sans-serif',
    main: 'Neue Haas Grotesk Display Pro Light, Source Sans Pro, sans-serif',
    questionItemTitle:
      'Neue Haas Grotesk Display Pro Medium, Source Sans Pro, sans-serif',
    questionTitleFont:
      'Neue Haas Grotesk Display Pro Medium, Source Sans Pro, sans-serif',
  },
  colors: {
    blue: '#5D6DFE',
    black: '#02003D',
    warningLight: '#FF4026',
    darkBlue: '#4452C5',
    mainBackground: '#DFDFEC',
    mainLinks: '#5463E8',
  },
  fontFace: `@font-face {
    font-family: 'Neue Haas Grotesk Display Pro Medium';
    src: url(${MediumEOT});
    src: local('Neue Haas Grotesk Display Pro 65 Medium'), local('NeueHaasDisplay-Mediu'),
      url(${MediumEOT}?#iefix) format('embedded-opentype'),
      url(${MediumWOFF}) format('woff'),
      url(${MediumTTF}) format('truetype');
    font-style: normal;
  }

  @font-face {
    font-family: 'Neue Haas Grotesk Display Pro Light';
    src: url(${LightEOT});
    src: local('Neue Haas Grotesk Display Pro 65 Light'), local('NeueHaasDisplay-Light'),
      url(${LightEOT}?#iefix) format('embedded-opentype'),
      url(${LightWOFF}) format('woff'),
      url(${LightTTF}) format('truetype');
    font-weight: 100 !important;
    font-style: normal;
  }

  @font-face {
    font-family: 'Neue Haas Grotesk Display Pro Thin';
    src: url(${ThinEOT});
    src: local('Neue Haas Grotesk Display Pro 65 Light'), local('NeueHaasDisplay-Thin'),
      url(${ThinEOT}?#iefix) format('embedded-opentype'),
      url(${ThinWOFF}) format('woff'),
      url(${ThinTTF}) format('truetype');
    font-weight: 100 !important;
    font-style: normal;
  }

  @font-face {
    font-family: 'Neue Haas Grotesk Display Pro Roman';
    src: url(${RomanEOT});
    src: local('Neue Haas Grotesk Display Pro 65 Roman'), local('NeueHaasDisplay-Thin'),
      url(${RomanEOT}?#iefix) format('embedded-opentype'),
      url(${RomanWOFF}) format('woff'),
      url(${RomanTTF}) format('truetype');
    font-weight: 100 !important;
    font-style: normal;
  }`,
};

const communitiesConfig = {
  prod: {
    2: {
      origin: 'https://telos.peeranha.io',
      src: TelosLogo,
      styles,
    },
    3: {
      origin: 'https://ont.peeranha.io',
      src: OntLogo,
    },
  },
  test: {
    1: {
      origin: 'https://blockchain-test.peeranha.io',
      src: TelosLogo,
      styles,
    },
  },
  dev: {
    1: {
      origin: 'http://localhost:3000',
      src: TelosLogo,
      styles,
    },
  },
};

export default communitiesConfig[process.env.ENV];
