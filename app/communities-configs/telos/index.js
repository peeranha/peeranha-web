import React from 'react';

import coinsBlueIcon from 'images/coinsBlue.svg?external';
import TelosLogo from './images/telos-logo-dark.svg?inline';
import TelosLogoLight from './images/telos-logo-light.svg?inline';
import favicon from '!file-loader?name=[name].[ext]!images/favicon-telos.ico';

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
  design: 'logo_center__menu_right',
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
      body: 'Neue Haas Grotesk Display Pro Light, Source Sans Pro, sans-serif',
    },
    header: {
      background: '#020038',
    },
    CustomSubHeader: `
      padding: 27px 0;

      font-weight: bolder;
    `,
    Highlighted: `
      align-self: baseline;
      padding: 12px 18px !important;
      margin-top: .618em;
      margin-bottom: .618em;

      background-color: rgb(79,7,233);
      border-radius: 300px;

      :hover {
        background-color: rgba(79,7,233,.8);
      }
    `,
  },
  links: [
    {
      text: 'HQ',
      href: 'https://www.telos.net/',
    },
    {
      text: 'Developers',
      href: 'https://www.telos.net/developers',
    },
    {
      text: 'Resources',
      href: 'https://www.telos.net/resources',
    },
    {
      text: 'News',
      href: 'https://www.telos.net/news',
    },
    {
      text: 'Explore',
      href: 'https://explore.telos.net/',
      isHighlighted: true,
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
  signUpPageLogo: TelosLogoLight,
  favicon: favicon,
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
    title: 'Neue Haas Grotesk Display Pro Medium, Source Sans Pro, sans-serif',
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
    darkBlue: '#5d6dfe',
    mainBackground: '#DFDFED',
    mainLinks: '#5463E8',
    linkColor: '#5463E8',
    btnColor: '#4f07e9',
    tagColor: '#FF422A',
    successColor: '#55C3B3',
    lightSuccessColor: 'rgba(85, 195, 179, 0.25)',
    secondaryLight: '#5D6DFE',
  },
  fontFace: `
    @font-face {
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
    }
  `,
  headerHeight: 182,
  buttonsBorderRadius: '20px',
  customSubHeaderConfig: CustomSubHeaderConfig,
};
