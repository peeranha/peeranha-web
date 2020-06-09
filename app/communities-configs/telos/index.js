import React from 'react';

import coinsBlueIcon from 'images/coinsBlue.svg?external';
import TelosLogo from './images/telos-logo-dark.svg?inline';

import MediumEOT from './fonts/NeueHaasDisplay-Mediu.eot';
import MediumWOFF from './fonts/NeueHaasDisplay-Mediu.woff';
import MediumTTF from './fonts/NeueHaasDisplay-Mediu.ttf';

import LightEOT from './fonts/NeueHaasDisplay-Light.eot';
import LightWOFF from './fonts/NeueHaasDisplay-Light.woff';
import LightTTF from './fonts/NeueHaasDisplay-Light.ttf';

import ThinEOT from './fonts/NeueHaasDisplay-Thin.eot';
import ThinWOFF from './fonts/NeueHaasDisplay-Thin.woff';
import ThinTTF from './fonts/NeueHaasDisplay-Thin.ttf';

import RomanEOT from './fonts/NeueHaasDisplay-Roman.eot';
import RomanWOFF from './fonts/NeueHaasDisplay-Roman.woff';
import RomanTTF from './fonts/NeueHaasDisplay-Roman.ttf';

import CustomSubHeader from 'components/CustomSubHeaders/CustomSubHeader';
import CustomMobileSubHeader from 'components/CustomSubHeaders/CustomMobileSubHeader';

export const CustomSubHeaderConfig = {
  styles: {
    bg: {
      header: '#020038',
      dropdown: '#ffffff',
    },
    color: {
      a: '#ffffff',
      arrow: 'white',
    },
    font: {
      body: 'Neue Haas Grotesk Display Pro Medium, Source Sans Pro, sans-serif'
    },
    header: {
      background: '#020038',
    },
  },
  links: [
    {
      text: 'HQ',
      href: 'https://www.telos.net/',
    },
    {
      text: 'Vision',
      href: 'https://www.telos.net/vision',
    },
    {
      text: 'Developers',
      href: 'https://www.telos.net/developers',
    },
    {
      text: 'Foundation',
      href: 'https://www.telos.net/foundation',
    },
    {
      text: 'Explore',
      href: 'https://explore.telos.net/',
    },
  ],
};

export const TelosStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  poweredByPeeranha: true,
  withoutAdditionalLinks: true,
  coinsIcon: coinsBlueIcon,
  leftMenuLogo: TelosLogo,
  mobileSubHeader: (
    <CustomMobileSubHeader config={CustomSubHeaderConfig} logo={TelosLogo} />
  ),
  customSubHeader: <CustomSubHeader config={CustomSubHeaderConfig} />,
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
    blueRGB: '93,109,254',
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
