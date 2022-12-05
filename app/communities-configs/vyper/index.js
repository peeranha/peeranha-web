import React from 'react';
import { css } from 'styled-components';

import VyperLogo from './images/vyperLogoFlat.svg?inline';

import CabinRegularTTF from './fonts/Cabin-Regular.ttf';

import favicon from '!file-loader?name=[name].[ext]!./images/vyper-favicon.ico';

const domainName = 'https://valist.io/';

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

export const VyperStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo: VyperLogo,
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
    mainSubHeaderBgColor: '#FAFAFD',
    mainBackground: '#6565651E',
    linkColor: '#3D4D3B',
    linkCookieColor: '#D9B379',
    linkColorTransparent: '#3D4D3B',
    headerPrimary: '#3D4D3B',
    commentOption: '#3D4D3B',
    contentHeader: '#3D4D3B',
    blockedInfoArea: '#35313113',
    transparentIconColor: '#fff',
    loaderColor: '#3D4D3B',
    votingIconColor: '#3D4D3B',
    linkColorSecondary: '#3D4D3B',
    walletButton: '#3D4D3B',
    btnColor: '#3D4D3B',
    btnHoverColor: '#3D4D3B',
    btnHeaderColor: '#3D4D3B',
    tagColor: '#3D4D3B',
    localeArrowColor: '#3D4D3B',
    textColor: '#3D4D3B',
    textColorShadow: '#3D4D3B',
    commHeadElemColor: '#3D4D3B',
    newPostButtonText: '#fff',
  },
  cookieConsentPopupStyles: {
    background: 'linear-gradient(82.09deg, #3D4D3B 56.19%, #B4B7B4 147.29%);',
    color: '#fff',
    borderColor: '#fff',
    button: {
      color: '#3D4D3B',
      background: '#fff',
      ':hover': {
        background: '#3D4D3B',
        color: '#fff',
        borderColor: '#fff',
      },
    },
  },
  headerHeight: 80,
  projectBorderRadius: '3px',
  domainName,
  communityBorderStyle: '2px solid #3D4D3B',
  dropDownIconStyles: css`
    path {
      stroke: #3d4d3b !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: #3d4d3b;
      stroke-width: 1.5px;
      fill: none;
    }
  `,
  headerLoginButtonStyles: css`
    background: #fff;
    border: 2px solid #3d4d3b;
    color: #3d4d3b;
    :hover {
      background: #3d4d3b !important;
      color: #fff !important;
      border: 2px solid #fff !important;
    }
  `,
};
