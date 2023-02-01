import React from 'react';
import { css } from 'styled-components';
import CustomSubHeader from 'components/CustomSubHeaders/CustomSubHeader';
import CustomMobileSubHeader from 'components/CustomSubHeaders/CustomMobileSubHeader';
import polygonLogo from 'communities-configs/polygon/images/polygon-logo.svg?inline';

import {
  domainName,
  domainDocs,
  domainBlog,
} from 'communities-configs/polygon/urls';
import favicon from '!file-loader?name=[name].[ext]!images/favicon-polygon.png';

const fonts = 'General Sans, sans-serif;';
const links = [
  {
    text: 'Scaling Solutions',
    subitems: [
      {
        text: 'Polygon PoS',
        href: `${domainName}solutions/polygon-pos`,
        logo: 'polygonPoS',
        description: 'An EVM enabled sidechain',
        mode: '',
      },
      {
        text: 'Polygon Edge',
        href: `${domainName}solutions/polygon-edge`,
        logo: 'polygonEdge',
        description: 'A modular and extensible framework',
        mode: '',
      },
      {
        text: 'Polygon Avail',
        href: `${domainName}solutions/polygon-avail`,
        logo: 'polygonAvail',
        description: 'A Scalable, data availability Blockchain',
        mode: 'Development',
      },
      {
        text: 'Polygon Zero',
        href: `${domainName}solutions/polygon-zero`,
        logo: 'polygonZero',
        description: 'A zk Rollup with the speed of Plonky2',
        mode: 'Development',
      },
      {
        text: 'Polygon Miden',
        href: `${domainName}solutions/polygon-miden`,
        logo: 'polygonMiden',
        description: 'A STARK-based, zk Rollup',
        mode: 'Development',
      },
      {
        text: 'Polygon Hermez',
        href: `${domainName}solutions/polygon-Hermez`,
        logo: 'polygonHermez',
        description: 'An open-source zk Rollup',
        mode: '',
      },
      {
        text: 'Polygon Nightfall',
        href: `${domainName}solutions/polygon-nightfall`,
        logo: 'polygonNightfall',
        description: 'A Privacy-focused Rollup for Enterprises',
        mode: 'Testnet',
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
      background: #ffffff;
      font-weight: 500;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #ded6ef;
    `,
    Highlighted: css`
      align-self: baseline;
      padding: 8px 20px !important;
      margin: 0.618em 0;
      font-size: 0.85rem;
      font-weight: 600;
      line-height: 1.5;
      background-color: #7b3fe4 !important;
      color: rgba(255, 255, 255, 1) !important;
      transition: background 0.22s ease-in-out;
      border-width: 1px;
      border-radius: 300px;
    `,
    subitems: css`
      width: 720px;
      height: 312;
      padding: 0;
      border: none !important;
      border-radius: 0 !important;
      background: rgba(255, 255, 255, 0) !important;
      font-size: 1rem;
      opacity: 1;
      ::before {
        content: '';
        position: relative;
        margin: auto;
        top: 15px;
        right: -180px;
        border: 5px solid transparent;
        border-bottom: 5px solid #7b3fe4;
      }
      div {
        opacity: 1;
        background-color: 'linear-gradient(180deg, #0F0E11 0%, #0A090D 21.76%)';
        border-top: 2px solid #7b3fe4;
        margin-top: 20px;
        padding: 1rem 2rem;
        display: flex;
        flex-flow: row wrap;
        white-space: normal;
        a {
          display: flex;
          max-width: 49%;
          width: 49%;
          word-break: normal;
          white-space: normal;
          text-align: left;
          padding: 1rem;
          color: #0a0a0d !important;
          line-height: 1.25;
          border-radius: 0.5rem !important;
          div {
            display: block;
            padding: 0px;
            margin-left: 0.75rem;
            width: 100%;
            max-width: 100%;
            margin-top: 0px;
            border: none;
            background: none;
            h5 {
              font-size: 1rem;
              font-weight: 400;
              line-height: 1.5;
              span {
                padding-left: 0.125rem;
                color: #f8943a !important;
              }
            }
            p {
              color: #52525d !important;
              font-size: 0.875rem;
              opacity: 0.9;
              font-weight: 400;
              line-height: 1.4;
            }
          }
          img {
            display: block;
          }
        }
        a:hover {
          opacity: 1;
          color: #0a0a0d;
          background-color: #eeeef2;
        }
      }
      @media only screen and (max-width: 991px) {
        left: 5px;
        top: -5px;
        padding: 0 !important;
        background: transparent !important;
        ::before {
          border: none;
        }
        div {
          border-top: none;

          margin-top: 10px;
          padding: 0;
          opacity: 0.9;
          a {
            max-width: 45%;
            width: 45%;
          }
        }
      }
    `,
  },
  links,
};

export const PolygonStyles = {
  documentationPosition: 'bottom',
  withoutCopyright: true,
  withoutSubHeader: true,
  poweredByPeeranha: true,
  logoWhite: true,
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
    mainSubHeaderBgColor: 'linear-gradient(180deg, #0F0E11 0%, #0A090D 21.76%)',
    blue: '#FFFFFF',
    blue2: '#141217',
    white: '#141217',
    sectionHeader: '#FFFFFF',
    formColor: '#FFFFFF',

    headerPrimary: '#141217',
    linkColorTransparent: '#141217',
    commentOption: '#141217',
    contentHeader: '#141217',
    linkColorSecondary: '#141217',

    secondarySpecial: 'rgba(20,18,23,0)',
    secondaryAdditional: '#7e8b97',
    additionalInfoBackground: '#212028',
    linkColor: '#843bed',
    pinnedPostBackground: 'rgb(123 63 228 / 30%)',
    blueRGB: '93,109,254',
    black: '#FFFFFF',
    warningLight: '#FF4026',
    darkBlue: 'rgb(123, 63, 228)',
    mainBackground: 'linear-gradient(180deg, #0F0E11 0%, #0A090D 21.76%)',
    blockedInfoArea: 'rgba(123, 63, 228, 0.1)',

    transparentIconColor: '#b19bdd',
    loaderColor: '#843bed',
    votingIconColor: '#843bed',
    walletButton: '#843bed',
    btnColor: '#843bed',
    tagColor: '#843bed',

    successColor: '#55C3B3',
    lightSuccessColor: 'rgba(85, 195, 179, 0.25)',
    secondaryLight: '#5D6DFE',
  },
  // fontFace: css`
  //   @font-face {
  //     font-family: 'Verdana-Regular';
  //     src: url(${verdanaRegularTTF}) format('truetype');
  //     font-style: normal;
  //   }
  // `,
  communityBorderStyle: '2px solid #843bed',
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

  dropDownIconStyles: css`
    path {
      stroke: #843bed !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: #843bed;
      stroke-width: 1.5px;
      fill: none;
    }
  `,
  headerLoginButtonStyles: css`
    background: rgba(255, 255, 255, 0);
    border: 2px solid #843bed;
    color: #843bed;

    :hover {
      background: '#843bed' !important;
      border: 2px solid #843bed;
    !important;
    }
  `,

  headerHeight: 80,
  projectBorderRadius: '50px',
  customSubHeaderConfig,
  domainName,
};
