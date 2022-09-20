import React from 'react';
import { css } from 'styled-components';

import MintStateLabsLogo from './images/mintStateLabsIcon.svg?inline';
import favicon from '!file-loader?name=[name].[ext]!./images/favicon-mintStateLabs.ico';
import RobotoRegularEOT from './fonts/Roboto-Regular.eot';
import RobotoRegularWOFF from './fonts/Roboto-Regular.woff';
import RobotoRegularTTF from './fonts/Roboto-Regular.ttf';
import RobotoMediumEOT from './fonts/Roboto-Medium.eot';
import RobotoMediumWOFF from './fonts/Roboto-Medium.woff';
import RobotoMediumTTF from './fonts/Roboto-Medium.ttf';
import RobotoBoldEOT from './fonts/Roboto-Bold.eot';
import RobotoBoldWOFF from './fonts/Roboto-Bold.woff';
import RobotoBoldTTF from './fonts/Roboto-Bold.ttf';

const domainName = 'https://mintstatelabs.com/';

const fontSet = 'Roboto-Regular, Arial, sans-serif';

export const customSubHeaderConfig = {
  design: 'mintstatelabs_style',
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

export const MintStateLabsStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo: MintStateLabsLogo,
  favicon,
  fonts: {
    h3LetterSpacing: '3px',
    tagsLetterSpacing: '3px',
    questionTitleLetterSpacing: '2px',
    h3: 'Roboto-Regular, Arial, sans',
    main: 'Roboto-Regular, Arial, sans',
    questionItemTitle: 'Roboto-Regular, Arial, sans',
    questionTitleFont: 'Roboto-Regular, Arial, sans',
  },
  fontFace: `@font-face {
    font-family: 'Roboto-Regular';
    src: 
      url(${RobotoRegularEOT}?#iefix) format('embedded-opentype'),
      url(${RobotoRegularWOFF}) format('woff'),
      url(${RobotoRegularTTF}) format('truetype');
    font-style: normal;
  }`,

  colors: {
    mainSubHeaderBgColor: '#1a1c20',
    mainBackground: '#f6f6f6',
    linkColor: '#006cd0',
    linkColorTransparent: '#006cd0',
    headerPrimary: '#006cd0',
    commentOption: '#006cd0',
    contentHeader: '#006cd0',
    blockedInfoArea: '#006cd0',
    transparentIconColor: '#006cd0',
    loaderColor: '#006cd0',
    votingIconColor: '#006cd0',
    linkColorSecondary: '#006cd0',
    walletButton: '#006cd0',
    btnColor: '#006cd0',
    tagColor: '#006cd0',
    localeArrowColor: '#F3F3F3',
    textColor: '#006cd0',
    textColorShadow: '#006cd0',
    commHeadElemColor: '#FFF',
    darkBlue: '#1a1c20',
  },
  cookieConsentPopupStyles: {
    background: '#1a1c20',
    color: '#F3F3F3',
  },
  headerHeight: 80,
  projectBorderRadius: '5px',
  domainName,
  communityBorderStyle: '2px solid rgb(0, 108, 208)',
  dropDownIconStyles: css`
    path {
      stroke: rgb(0, 108, 208) !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: rgb(0, 108, 208);
      stroke-width: 1.5px;
      fill: none;
    }
  `,
};
