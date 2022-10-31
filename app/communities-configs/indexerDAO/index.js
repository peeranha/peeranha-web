import React from 'react';
import { css } from 'styled-components';

import IndexerDAOLogo from './images/indDao1.svg?inline';
import favicon from '!file-loader?name=[name].[ext]!./images/dao.ico';

const domainName = 'https://barracuda.io/indexerdao';

const fontSet = 'Roboto-Regular, Arial, sans-serif';

export const customSubHeaderConfig = {
  design: 'suiGlobal_style',
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

export const IndexerDAOStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo: IndexerDAOLogo,
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
    mainSubHeaderBgColor: '#5362e8',
    mainBackground: '#F5F5F5',
    linkColor: '#2c001e',
    linkCookieColor: '#5362e8',
    linkColorTransparent: '#2c001e',
    headerPrimary: '#2c001e',
    commentOption: '#2c001e',
    contentHeader: '#2c001e',
    blockedInfoArea: '#b5e853',
    transparentIconColor: '#FFFF',
    loaderColor: '#2c001e',
    votingIconColor: '#2c001e',
    linkColorSecondary: '#2c001e',
    walletButton: '#2c001e',
    btnColor: '#2c001e',
    btnHoverColor: '#2c001e',
    btnHeaderColor: '#2c001e',
    btnHeaderHoverColor: '#b5e853',
    tagColor: '#2c001e',
    localeArrowColor: '#b5e2c001e853',
    textColor: '#2c001e',
    textColorShadow: '#2c001e',
    commHeadElemColor: '#2c001e',
    darkBlue: '#1a1c20',
  },
  cookieConsentPopupStyles: {
    background: '#2c001e',
    color: '#F3F3F3',

    button: {
      color: 'rgb(255,255,255)',
      borderColor: 'rgb(255,255,255)',

      background: 'none',
      ':hover': {
        background: '#b5e853',
        color: '#2c001e',
      },
    },
  },
  headerHeight: 80,
  projectBorderRadius: '20px',
  domainName,
  communityBorderStyle: '2px solid #2c001e',
  dropDownIconStyles: css`
    path {
      stroke: #2c001e !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: #2c001e;
      stroke-width: 1.5px;
      fill: none;
    }
  `,
  headerLoginButtonStyles: css`
    border: 2px solid #2c001e;
    color: #fff;
    :hover {
      background: #b5e853 !important;
      color: #2c001e !important;
      border: 2px solid #2c001e !important;
    }
  `,
};
