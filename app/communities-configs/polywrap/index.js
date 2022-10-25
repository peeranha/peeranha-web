import React from 'react';
import { css } from 'styled-components';

import PolywrapLogo from './images/polywrap-horizontal.svg?inline';
import favicon from '!file-loader?name=[name].[ext]!./images/logopoly.ico';
import RobotoRegularEOT from './fonts/Roboto-Regular.eot';
import RobotoRegularWOFF from './fonts/Roboto-Regular.woff';
import RobotoRegularTTF from './fonts/Roboto-Regular.ttf';

const domainName = 'https://polywrap.io/';

const fontSet = 'Roboto-Regular, Arial, sans-serif';

export const customSubHeaderConfig = {
  design: 'polywrap_style',
  styles: {
    bg: {
      header: '#FFFFFF',
      dropdown: '#FFFFFF',
    },
    color: {
      a: '#999999',
    },
    font: {
      body: fontSet,
    },
    header: {
      background: '#FFFFFF',
    },
    subHeader: css`
      border-bottom: 1px solid #cecece;
      a,
      span {
        transition: all 0.3s ease-out;
      }
      a:hover,
      span:hover {
        color: #000000 !important;
        opacity: 1 !important;
      }
    `,
    subitems: css`
      left: 50% !important;
      top: 100% !important;
      padding: 25px 30px !important;
      border-radius: 3px !important;
      min-width: 100% !important;
      transform: translate(-50%, -5%) !important;
      animation: ani 0.3s both;
      @keyframes ani {
        0% {
          opacity: 0;
          transform: translate(-50%, -10%);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -5%);
        }
      }
      ::before {
        content: '';
        width: 20px;
        height: 20px;
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        transition: background-color 0.3s;
        border-top: 1px solid #f2f2f2;
        border-left: 1px solid #f2f2f2;
        background: #ffffff;
        z-index: 9999;
      }
      @media only screen and (max-width: 991px) {
        a {
          padding: 0 0 0 30px !important;
        }
      }
      @media only screen and (min-width: 992px) {
        a {
          padding: 5px 0 !important;
          line-height: 1.6 !important;
        }
      }
    `,
    subHeaderItem: css`
      position: relative;
      @media only screen and (min-width: 900px) {
        font-size: 14px;
      }
      @media only screen and (min-width: 1440px) {
        font-size: 15px;
      }
      font-weight: bold;
      > div {
        font-weight: normal;
      }
      padding: 10px 15px !important;
      @media only screen and (min-width: 992px) {
        padding: 0;
        margin-left: 30px;
        :first-child {
          margin-left: 0;
        }
      }
      margin: 0 !important;
    `,
    CustomSubHeader: css`
      margin: 0 !important;
    `,
    subHeaderContainerStyles: css``,
    topLogoContainerStyles: css`
      width: 80px !important;
      margin: 0 !important;
      margin-right: 60px !important;
      display: flex;
      justify-content: center;
      align-content: center;
    `,
    subHeaderLogoStyles: css`
      height: 40px;
      > img {
        height: 100%;
      }
    `,

    Highlighted: css``,
  },
  links: [
    {
      text: 'Store',
      href: `${domainName}/store/`,
    },
    {
      text: 'Provide',
      href: `${domainName}/provide/`,
    },
    {
      text: 'Build',
      href: `${domainName}/build/`,
      subitems: [
        {
          text: 'Docs',
          href: `${domainName}/build/#benefits-banner`,
        },
        {
          text: 'Tools & services',
          href: `${domainName}/build/#tools-and-more`,
        },
        {
          text: 'Grants',
          href: `${domainName}/build/#grants`,
        },
        {
          text: 'Roadmap',
          href: `${domainName}/build/#usp`,
        },
        {
          text: 'Videos',
          href: `${domainName}/build/#videos`,
        },
        {
          text: 'Sui Community',
          href: `${domainName}/build/#community`,
        },
        {
          text: 'Events',
          href: `${domainName}/build/#events`,
        },
      ],
    },
    {
      text: 'Blog',
      href: `${domainName}/provide/`,
    },
  ],
};

export const PolywrapStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo: PolywrapLogo,
  favicon,
  // Hided community fonts
  // fonts: {
  //   h3LetterSpacing: '3px',
  //   tagsLetterSpacing: '3px',
  //   questionTitleLetterSpacing: '2px',
  //   h3: 'Roboto-Regular, Arial, sans',
  //   main: 'Roboto-Regular, Arial, sans',
  //   questionItemTitle: 'Roboto-Regular, Arial, sans',
  //   questionTitleFont: 'Roboto-Regular, Arial, sans',
  // },
  // fontFace: `@font-face {
  //   font-family: 'Roboto-Regular';
  //   src:
  //     url(${RobotoRegularEOT}?#iefix) format('embedded-opentype'),
  //     url(${RobotoRegularWOFF}) format('woff'),
  //     url(${RobotoRegularTTF}) format('truetype');
  //   font-style: normal;
  // }`,

  colors: {
    mainSubHeaderBgColor: '#1D2B45',
    mainBackground: '#F9FAFB',
    linkColor: '#4ED39F',
    linkCoolieColor: '#FFC372',
    linkColorTransparent: '#4ED39F',
    headerPrimary: '#4ED39F',
    commentOption: '#4ED39F',
    contentHeader: '#4ED39F',
    blockedInfoArea: 'rgba(255, 154, 158 ,0.11)',
    transparentIconColor: '#fff',
    loaderColor: '#4ED39F',
    votingIconColor: '#4ED39F',
    linkColorSecondary: '#4ED39F',
    walletButton: '#4ED39F',
    btnColor: '#4ED39F',
    btnHoverColor: '#FF9A9E',
    btnHeaderColor: '#4ED39F',
    btnHeaderHoverColor: '#FFC372',
    tagColor: '#4ED39F',
    localeArrowColor: '#4ED39F',
    textColor: '#4ED39F',
    textColorShadow: '#4ED39F',
    commHeadElemColor: '#fff',
  },
  cookieConsentPopupStyles: {
    background: '#263751',
    // background: 'linear-gradient(90deg, #263751, #FFC372)',
    color: '#fff',
    borderColor: '#fff',
    button: {
      color: '#FFC372',
      background: '#263751',
      borderColor: '#FFC372',
      ':hover': {
        background: '#4ED39F',
        color: '#fff',
        border: '3px solid #4ED39F',
      },
    },
  },
  headerHeight: 80,
  projectBorderRadius: '25px',
  domainName,
  communityBorderStyle: '3px solid #4ED39F',
  dropDownIconStyles: css`
    path {
      stroke: #4ed39f !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: #4ed39f;
      stroke-width: 1.5px;
      fill: none;
    }
  `,
  headerLoginButtonStyles: css`
    background: #1d2b45;
    border: 2px solid #ffc372;
    color: #ffc372;
    :hover {
      background: #fff !important;
      color: #4ed39f !important;
      border: 2px solid #4ed39f !important;
    }
  `,
};
