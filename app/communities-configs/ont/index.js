import React from 'react';
import coinsBlueIcon from 'images/coinsBlue.svg?inline';
import OntLogo from 'images/communities-logos/ont.svg?inline';

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

import CustomSubHeader from 'components/CustomSubHeaders/CustomSubHeader';
import CustomMobileSubHeader from 'components/CustomSubHeaders/CustomMobileSubHeader';

export const CustomSubHeaderConfig = {
  styles: {
    header: {
      background: '#121212',
    },
  },
  links: [
    {
      text: 'Home',
      href: 'https://ont.io/',
    },
    {
      text: 'Developer',
      href: 'https://developer.ont.io/',
    },
    {
      text: 'dApps',
      href: 'https://oodapp.io/',
    },
    {
      text: 'Wallets',
      href: 'hhttps://onto.app/',
    },
    {
      text: 'Trust Ecosystem',
      href: 'https://ontid.ont.io/',
    },

    {
      text: 'Global Workshop',
      href: 'https://ont.io/global_uni_workshop',
    },
    {
      text: 'About',
      href: 'https://ont.io/aboutus',
    },
    {
      text: 'Consultation',
      href: 'https://ont.io/consultation',
    },
  ],
};

export const OntStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  poweredByPeeranha: true,
  withoutAdditionalLinks: true,
  coinsIcon: coinsBlueIcon,
  leftMenuLogo: OntLogo,
  mobileSubHeader: <CustomMobileSubHeader config={CustomSubHeaderConfig} />,
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
    black: '#02003D',
    warningLight: '#FF4026',
    darkBlue: '#4452C5',
    mainBackground: '#fafafa',
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
