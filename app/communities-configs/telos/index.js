import React from 'react';
import { css } from 'styled-components';

import CustomSubHeader from 'components/CustomSubHeaders/CustomSubHeader';
import CustomMobileSubHeader from 'components/CustomSubHeaders/CustomMobileSubHeader';

import favicon from '!file-loader?name=[name].[ext]!images/favicon-telos.ico';
import TelosLogo from './images/telos-logo-dark.svg?inline';
import TelosLogoLight from './images/telos-logo-light.svg?inline';

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

const domainName = 'https://www.telos.net/';
const domainDocs = 'https://docs.telos.net';
const domainStudio = 'https://studio.telos.net';
const domainBloks = 'https://telos.bloks.io';
const domainExplore = 'https://explore.telos.net';
const domainStaker = 'https://telos.staker.one';

export const CustomSubHeaderConfig = {
  design: 'telos_style',
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
      padding: 20px 0;

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
    subitems: `
      padding: 1em;

      border: none !important;
      border-radius: 0 !important;
      background: #000 !important;

      a {
        padding: .382em;

        font-size: 15px;
        line-height: 1em;
      }

      @media only screen and (max-width: 991px) {
        left: 5px;
        top: -5px;

        padding: 0 !important;

        background: transparent !important;
      }
    `,
  },
  links: [
    {
      text: 'Developers',
      href: `${domainName}dev`,
      subitems: [
        {
          text: 'Why Telos',
          href: `${domainName}developers`,
        },
        {
          text: 'Getting Started',
          href: `${domainName}developers-get-started`,
        },
        {
          text: 'Service Layer',
          href: `${domainName}telos-micro-services`,
        },
        {
          text: 'Documentation',
          href: domainDocs,
        },
        {
          text: 'Studio IDE',
          href: domainStudio,
        },
        {
          text: 'Block Explorer',
          href: domainBloks,
        },
        {
          text: 'Developer Updates',
          href: `${domainName}dev-signup-for-updates`,
        },
      ],
    },
    {
      text: 'Use Cases',
      href: `${domainName}use-cases-1`,
      subitems: [
        {
          text: 'Social Media',
          href: `${domainName}social`,
        },
        {
          text: 'Gaming',
          href: `${domainName}gaming`,
        },
      ],
    },
    {
      text: 'Products',
      href: `${domainName}products`,
      subitems: [
        {
          text: 'Blockchain',
          href: `${domainName}dev`,
        },
        {
          text: 'Decide',
          href: `${domainName}decide`,
        },
        {
          text: 'EVM',
          href: `${domainName}telos-evm`,
        },
        {
          text: 'Gamify',
          href: `${domainName}gamify`,
        },
      ],
    },
    {
      text: 'Resources',
      href: `${domainName}resources-2`,
      subitems: [
        {
          text: 'Resources Overview',
          href: `${domainName}resources`,
        },
        {
          text: 'Wallets',
          href: `${domainName}wallets`,
        },
        {
          text: 'Governance',
          href: `${domainName}governance-docs`,
        },
        {
          text: 'Branding',
          href: `${domainName}branding-and-guidelines`,
        },
        {
          text: 'Foundation',
          href: `${domainName}foundation`,
        },
        {
          text: 'FAQ',
          href: '/',
          target: '_self',
        },
      ],
    },
    {
      text: 'News',
      href: `${domainName}news`,
    },
    {
      text: 'FAQ',
      href: '/',
      target: '_self',
    },
    {
      text: 'Explore',
      href: `${domainName}explore-1`,
      isHighlighted: true,
      subitems: [
        {
          text: 'Ecosystem',
          href: domainExplore,
        },
        {
          text: 'Works',
          href: `${domainName}works`,
        },
        {
          text: 'Staking for Resources',
          href: domainStaker,
        },
        {
          text: 'Staking for Rewards',
          href: `${domainStaker}rewards`,
        },
        {
          text: 'Create Account',
          href: `${domainExplore}/create-account`,
        },
      ],
    },
  ],
};

export const TelosStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  poweredByPeeranha: true,
  withoutAdditionalLinks: true,
  signUpPageLogo: TelosLogoLight,
  favicon,
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

  coinsIconStyles: css`
    ellipse {
      stroke: #4f07e9;
      fill: #dfe3f2;
    }
  `,
  boostWalletBtnStyles: css`
    g {
      fill: #ff422a;
    }
  `,

  headerHeight: 182,
  projectBorderRadius: '20px',
  customSubHeaderConfig: CustomSubHeaderConfig,
  domainName,
};
