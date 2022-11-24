import React from 'react';
import { css } from 'styled-components';

import AaveLogo from './images/aaveLogoWhite.svg?inline';
import AaveGhostGradient from './images/aaveGhostGradient.svg?inline';
import favicon from '!file-loader?name=[name].[ext]!./images/favicon-aave.ico';
import RobotoRegularEOT from './fonts/Roboto-Regular.eot';
import RobotoRegularWOFF from './fonts/Roboto-Regular.woff';
import RobotoRegularTTF from './fonts/Roboto-Regular.ttf';
const domainName = 'https://aave.io/';

const fontSet = 'Roboto-Regular, Arial, sans-serif';

export const customSubHeaderConfig = {
  design: 'valist_style',
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

export const AaveStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo: AaveLogo,
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
    mainSubHeaderBgColor:
      'linear-gradient(90deg, rgba(59,182,197,1) 0%, rgba(58,32,115,1) 31%, rgba(179,84,159,1) 100%)',
    mainBackground: 'rgba(27,32,48,0.02)',
    linkColor: '#1b2030',
    linkCookieColor: '#1b2030',
    linkColorTransparent: '#1b2030',
    headerPrimary: '#1b2030',
    commentOption: '#1b2030',
    contentHeader: '#1b2030',
    blockedInfoArea: '#764A8931',
    transparentIconColor: '#fff', ////
    loaderColor: '#1b2030',
    votingIconColor: '#1b2030',
    linkColorSecondary: '#1b2030',
    walletButton: '#1b2030',
    btnColor: '#1b2030',
    btnHoverColor: '#FF9A9E',
    btnHeaderColor: '#1b2030',
    btnHeaderHoverColor: 'rgba(27,32,48,0.56)',
    tagColor: '#1b2030',
    localeArrowColor: '#1b2030',
    textColor: '#1b2030',
    textColorShadow: '#1b2030',
    commHeadElemColor: '#1b2030',
  },
  cookieConsentPopupStyles: {
    background:
      'linear-gradient(90deg, rgba(47,17,78,1) 0%, rgba(108,32,110,1) 32%, rgba(83,147,159,1) 75%, rgba(108,32,110,1) 99%)',
    color: '#fff',
    borderColor: '#fff',
    button: {
      color: '#fff',
      background: '#1b2030',
      ':hover': {
        background: '#fff',
        color: '#1b2030',
      },
    },
  },
  headerHeight: 80,
  projectBorderRadius: '10px',
  domainName,
  communityBorderStyle: '3px solid #1b2030',
  dropDownIconStyles: css`
    path {
      stroke: #1b2030 !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: #1b2030;
      stroke-width: 1.5px;
      fill: none;
    }
  `,
  headerLoginButtonStyles: css`
    background: #fff;
    border: 2px solid #1b2030;
    color: #1b2030;
    :hover {
      background: #1b2030 !important;
      color: #fff !important;
      border: 2px solid #fff !important;
    }
  `,
};