import React from 'react';
import { css } from 'styled-components';

import SolidityLogo from './images/solidity-logo.svg?inline';
import favicon from './images/favicon-solidity.svg?inline';

const domainName = 'https://solidity.peeranha.io/';

const fontSet = 'Roboto-Regular, Arial, sans-serif';

export const customSubHeaderConfig = {
  design: 'solidity_style',
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

export const SolidityStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo: SolidityLogo,
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
    mainSubHeaderBgColor: '#FAFAFA',
    mainBackground: '#EAECF4',
    linkColor: 'rgba(25, 68, 176, 1)',
    linkCookieColor: '#fff',
    linkColorTransparent: 'rgba(25, 68, 176, 1)',
    headerPrimary: 'rgba(25, 68, 176, 1)',
    commentOption: 'rgba(25, 68, 176, 1)',
    contentHeader: 'rgba(25, 68, 176, 1)',
    blockedInfoArea: 'rgba(0, 47, 167,0.11)',
    transparentIconColor: '#fff',
    loaderColor: 'rgba(25, 68, 176, 1)',
    votingIconColor: 'rgba(25, 68, 176, 1)',
    linkColorSecondary: 'rgba(25, 68, 176, 1)',
    walletButton: 'rgba(25, 68, 176, 1)',
    textColorShadow: 'rgba(25, 68, 176, 1)',
    btnColor: 'rgba(25, 68, 176, 1)',
    btnHoverColor: 'rgba(25, 68, 176, 1)',
    btnHeaderColor: 'rgba(25, 68, 176, 1)',
    btnHeaderHoverColor: 'rgba(25, 68, 176, 0.8)',
    tagColor: 'rgba(25, 68, 176, 1)',
    localeArrowColor: 'rgba(25, 68, 176, 1)',
    textColor: 'rgba(25, 68, 176, 1)',
    commHeadElemColor: 'rgba(25, 68, 176, 1)',
  },
  cookieConsentPopupStyles: {
    background: 'linear-gradient(92.71deg, #0A37AA 32.07%, #6688E0 101.8%)',
    color: 'rgba(255, 255, 255, 1)',
    borderColor: '#fff',
    button: {
      background: '#fff',
      color: 'rgba(25, 68, 176, 1)',
      border: '1px solid #FFFFFF',

      ':hover': {
        color: '#FFFFFF',
        backgroundColor: 'rgba(25, 68, 176, 1)',
        border: '1px solid #FFFFFF',
      },
    },
  },
  headerHeight: 80,
  projectBorderRadius: '5px',
  domainName,
  communityBorderStyle: '1px solid rgba(25, 68, 176, 1)',
  dropDownIconStyles: css`
    path {
      stroke: rgba(25, 68, 176, 1) !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: rgba(25, 68, 176, 1);
      stroke-width: 1.5px;
      fill: none;
    }
  `,
  headerLoginButtonStyles: css`
    border: 1px solid rgba(25, 68, 176, 1);
    color: rgba(25, 68, 176, 1);
    :hover {
      background: rgba(25, 68, 176, 1) !important;
      color: #fff !important;
      border: 1px solid rgba(25, 68, 176, 1) !important;
    }
  `,
};
