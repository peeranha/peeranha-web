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
    mainSubHeaderBgColor: '#2C001E',
    mainBackground: '#F5F5F5',
    linkColor: '#5362e8',
    linkCookieColor: '#5362e8',
    linkColorTransparent: '#2c001e',
    headerPrimary: '#5362e8',
    commentOption: '#2c001e',
    contentHeader: '#2c001e',
    blockedInfoArea: 'rgba(181, 232, 83, 0.4)',
    transparentIconColor: '#FFFF',
    loaderColor: '#2c001e',
    votingIconColor: '#2c001e',
    linkColorSecondary: '#2c001e',
    walletButton: '#2c001e',
    btnColor: '#2c001e',
    btnHoverColor: '#2c001e',
    btnHeaderColor: '#5362E8',
    btnHeaderHoverColor: '#2c001e',
    btnHeaderHoverBorder: '#fff',
    tagColor: '#2c001e',
    localeArrowColor: '#5362E8',
    textColor: '#2c001e',
    textColorShadow: '#2c001e',
    commHeadElemColor: '#5362E8',
    darkBlue: '#1a1c20',
  },
  cookieConsentPopupStyles: {
    background: 'linear-gradient(90deg, #2C001E, #6c3d60)',
    color: '#F3F3F3',

    button: {
      color: '#5362E8',
      borderColor: '#5362E8',

      background: 'none',
      ':hover': {
        background: '#5362E8',
        color: '#fff',
      },
    },
  },
  headerHeight: 80,
  projectBorderRadius: '20px',
  domainName,
  communityBorderStyle: '2px solid #5362E8',
  dropDownIconStyles: css`
    path {
      stroke: #5362e8 !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: #5362e8;
      stroke-width: 1.5px;
      fill: none;
    }
  `,
  headerLoginButtonStyles: css`
    border: 2px solid #5362e8;
    color: #5362e8;
    :hover {
      background: #5362e8 !important;
      color: #fff !important;
      border: 2px solid #5362e8 !important;
    }
  `,
};