import React from 'react';
import { css } from 'styled-components';

import FractalVisionsLogo from './images/Rectangle.svg?inline';
import favicon from '!file-loader?name=[name].[ext]!./images/Fractal.ico';
const domainName = 'https://guild.xyz/fractalvisions';

const fontSet = 'Roboto-Regular, Arial, sans-serif';

export const customSubHeaderConfig = {
  design: 'fractalVisions_styles',
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

export const FractalVisionsStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo: FractalVisionsLogo,
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
    mainSubHeaderBgColor: '#000000',
    mainBackground: 'rgba(234, 236, 244, 1)',
    linkColor: '#6D00B3',
    linkCookieColor: '#15EBFF',
    linkColorTransparent: '#6D00B3',
    headerPrimary: '#6D00B3',
    commentOption: '#6D00B3',
    contentHeader: '#6D00B3',
    blockedInfoArea: 'rgb(42 36 96 / 10%)',
    transparentIconColor: '#FFF',
    loaderColor: '#6D00B3',
    votingIconColor: '#6D00B3',
    linkColorSecondary: '#6D00B3',
    walletButton: '#6D00B3',
    btnColor: '#B800FF',
    btnHoverColor: '#B800FF',
    btnHeaderColor: '#B800FF',
    btnHeaderHoverOpacity: '0.75',
    newPostButtonText: 'rgba(255, 255, 255, 1)',
    tagColor: '#6D00B3',
    localeArrowColor: '#B800FF',
    textColor: '#6D00B3',
    textColorShadow: '#6D00B3',
    commHeadElemColor: '#FFF',
  },
  cookieConsentPopupStyles: {
    background: '#6D00B3',
    color: '#fff',
    button: {
      color: '#000',
      background: '#FFF',
      border: '1px solid #FFF',
      ':hover': {
        opacity: '0.75',
        color: '#000',
        background: '#FFF',
      },
    },
  },
  headerHeight: 80,
  projectBorderRadius: '5px',
  domainName,
  fullyTransparent: '#000',
  communityBorderStyle: '2px solid #B800FF',
  dropDownIconStyles: css`
    path {
      stroke: #b800ff !important;
      stroke-width: 1.5px;
      fill: #000 !important;
    }
    circle {
      stroke: #b800ff;
      stroke-width: 1.5px;
      fill: #000;
    }
  `,
  headerLoginButtonStyles: css`
    border: 1px solid #b800ff;
    color: #fff;
    :hover {
      background: #b800ff !important;
      color: #fff !important;
      border: 1px solid #b800ff !important;
    }
  `,
  newPostPopupButtonStyles: css`
    border: 1px solid #b800ff;
    color: #b800ff;
    :hover {
      background: #b800ff !important;
      color: #fff !important;
      border: 1px solid #b800ff !important;
    }
  `,
};
