import React from 'react';
import { css } from 'styled-components';
import CustomSubHeader from 'components/CustomSubHeaders/CustomSubHeader';
import CustomMobileSubHeader from 'components/CustomSubHeaders/CustomMobileSubHeader';
import favicon from '!file-loader?name=[name].[ext]!images/favicon-telos.ico';
import polygonLogo from './images/polygon-logo.svg?inline';
import verdanaRegularTTF from './fonts/verdana.ttf';
import peeranhaPoS from './images/polygon-pos.svg?inline';
import {
  domainName,
  domainDocs,
  domainBlog,
} from './urls';
const fonts = 'Verdana-Regular, Arial, sans-serif';
const logot = <img src={peeranhaPoS}/>
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
      background: '#ffffff';
      font-weight: 500;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #ded6ef;
    `,
    Highlighted: css`
      align-self: baseline;
      padding: 8px 20px !important;
      margin: .618em 0;
      font-size: 0.85rem;
      font-weight: 600;
      line-height: 1.5;
      background-color: #7b3fe4 !important;
      color: rgba(255,255,255,1) !important;
      transition: background .22s ease-in-out;
      border-width: 1px;
      border-radius: 300px;
    `,
    subitems: css`
      width: 820px;
      height: 312;
      padding: 0;
      border: none !important;
      border-radius: 0 !important;
      background: rgba(255,255,255,0) !important;
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
        background-color:rgba(255,255,255,1);
        border-top: 2px solid #7b3fe4;
        margin-top: 20px;
        padding: 1rem 2rem;
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: repeat(4, auto);
        a {
          display: flex;
          text-align: left;
          padding: 1rem;
          color: #0a0a0d !important;
          line-height: 1.25;
          border-radius: 0.5rem !important;
          a {
            display: block;
            padding: 0px;
            margin-left: 0.75rem;
            h5 {
              font-size: 1rem;
              font-weight: 400;
              line-height: 1.5;
              span {
                padding-left: 0.125rem;
                color: #f8943a !important;
              }
            }
            span {
              color: #52525d !important;
              font-size: .875rem;
              font-weight: 400;
              line-height: 1.4;
            }
          }
          img {
            display: block;
          }
        }
        a:hover{
          opacity: 1;
          color: #0a0a0d;
          background-color: #eeeef2;
        }
      }
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
    darkBlue: '#5D6DFE',
    mainBackground: 'radial-gradient(66.32% 66.32% at 54.13% 113.95%,rgba(108,38,255,.2) 0,rgba(242,89,255,0) 100%),linear-gradient(211.99deg,rgba(65,157,241,.2) -4.17%,rgba(45,143,234,0) 68.7%),radial-gradient(100% 100% at 28.65% 0,rgba(109,0,255,.25) 0,rgba(250,247,254,0) 100%);',
    mainLinks: '#5463E8',
    linkColor: '#5463E8',
    btnColor: '#7b3fe4',
    tagColor: '#FF422A',
    successColor: '#55C3B3',
    lightSuccessColor: 'rgba(85, 195, 179, 0.25)',
    secondaryLight: '#5D6DFE',
  },
  fontFace: css`@font-face {
    font-family: 'Verdana-Regular';
    src: 
      url(${verdanaRegularTTF}) format('truetype');
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
  customSubHeaderConfig,
  domainName,
};
