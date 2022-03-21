import React from 'react';
import { css } from 'styled-components';

import CustomSubHeader from 'components/CustomSubHeaders/CustomSubHeader';
import CustomMobileSubHeader from 'components/CustomSubHeaders/CustomMobileSubHeader';

import favicon from '!file-loader?name=[name].[ext]!images/favicon-telos.ico';
import polygonLogo from './images/polygon-logo.svg?inline';

import robotoRegularEOT from './fonts/Roboto-Regular.eot';
import robotoRegularWOFF from './fonts/Roboto-Regular.woff';
import robotoRegularTTF from './fonts/Roboto-Regular.ttf';

import {
  domainName,
  domainDocs,
  domainBlog,
} from './urls'


const fonts = 'Roboto-Regular, Arial, sans-serif';
const links = [
  {
    text: 'Scaling Solutions',
    subitems: [
      {
        text: 'Scaling Solutions',
        href: `${domainName}solutions/polygon-pos`,
      },
      {
        text: 'Polygon Edge',
        href: `${domainName}solutions/polygon-edge`,
      },
      {
        text: 'Polygon Avail',
        href: `${domainName}solutions/polygon-avail`,
      },
      {
        text: 'Polygon Zero',
        href: `${domainName}solutions/polygon-zero`,
      },
      {
        text: 'Polygon Miden',
        href: `${domainName}solutions/polygon-miden`,
      },
      {
        text: 'Polygon Hermez',
        href: `${domainName}solutions/polygon-Hermez`,
      },
      {
        text: 'Polygon Nightfall',
        href: `${domainName}solutions/polygon-nightfall`,
      },
    ],
  },
  {
    text: 'Developers',
    href: `${domainName}developers`,
  },
  {
    text: 'Ecosystem',
    href: `${domainName}ecosystem`,
  },
  {
    text: 'Community',
    href: `${domainName}community`,
  },
  {
    text: 'Blogs',
    href: `${domainBlog}`,
  },
  {
    text: 'Get Started',
    href: `${domainDocs}`,
    isHighlighted: true,
  },
];

export const customSubHeaderConfig = {
  design: 'polygonStyle',
  styles: {
    bg: {
      header: 'rgba(255,255,255,1)',
      dropdown: '#ffffff',
    },
    color: {
      a: 'rgba(41,41,52,1)',
      arrow: 'rgba(238,238,242,1)',
    },
    font: {
      body: `${fonts}`,
    },
    header: {
      background: '#020038',
    },
    CustomSubHeader: css`
      padding: 20px 0;
      background: radial-gradient(66.32% 66.32% at 54.13% 113.95%,rgba(108,38,255,.2) 0,rgba(242,89,255,0) 100%),linear-gradient(211.99deg,rgba(65,157,241,.2) -4.17%,rgba(45,143,234,0) 68.7%),radial-gradient(100% 100% at 28.65% 0,rgba(109,0,255,.25) 0,rgba(250,247,254,0) 100%);
      font-weight: 500;
    `,
    Highlighted: css`
      align-self: baseline;
      padding: 12px 18px !important;
      margin-top: .618em;
      margin-bottom: .618em;

      background-color: #7b3fe4 !important;
      color: rgba(255,255,255,1) !important;
      transition: background .22s ease-in-out;
      border-radius: 300px;

      :hover {
        border-color: rgba(100,51,185,1)
        background-color: rgba(100,51,185,1)
      }
    `,
    subitems: css`
      padding: 1em;

      border-top: none !important;
      border-radius: 0 !important;
      background: #rgba(255,255,255,1) !important;
      transition: background .22s ease-in-out;
      a {
        padding: .382em;

        line-height: 1.25;
      }

      @media only screen and (max-width: 991px) {
        left: 5px;
        top: -5px;

        padding: 0 !important;

        background: transparent !important;
      }
    `,
  },
  links: links,
};

export const PolygonStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  poweredByPeeranha: true,
  withoutAdditionalLinks: true,
  signUpPageLogo: polygonLogo,
  favicon,
  mobileSubHeader: (
    <CustomMobileSubHeader config={customSubHeaderConfig} logo={polygonLogo} />
  ),
  customSubHeader: <CustomSubHeader config={customSubHeaderConfig} />,
  withoutFAQ: true,
  fonts: {
    h3LetterSpacing: '0.5px',
    tagsLetterSpacing: '0.5px',
    questionTitleLetterSpacing: '0.5px',
    h3: `${fonts}`,
    main: `${fonts}`,
    questionItemTitle: `${fonts}`,
    questionTitleFont: `${fonts}`,
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
    btnColor: '#7b3fe4',
    tagColor: '#FF422A',
    successColor: '#55C3B3',
    lightSuccessColor: 'rgba(85, 195, 179, 0.25)',
    secondaryLight: '#5D6DFE',
  },
  fontFace: `@font-face {
    font-family: 'Roboto-Regular';
    src: 
      url(${robotoRegularEOT}?#iefix) format('embedded-opentype'),
      url(${robotoRegularWOFF}) format('woff'),
      url(${robotoRegularTTF}) format('truetype');
    font-style: normal;
  }`,
  coinsIconStyles: css`
    ellipse {
      stroke: #7b3fe4;
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
  customSubHeaderConfig: customSubHeaderConfig,
  domainName,
};
