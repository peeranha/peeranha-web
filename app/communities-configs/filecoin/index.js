import React from 'react';
import { css } from 'styled-components';

import FileiconLogo from './images/filecoin-logo.svg?inline';
import favicon from '!file-loader?name=[name].[ext]!images/favicon-filecoin.ico';

import RobotoRegularEOT from './fonts/Roboto-Regular.eot';
import RobotoRegularWOFF from './fonts/Roboto-Regular.woff';
import RobotoRegularTTF from './fonts/Roboto-Regular.ttf';

import CustomSubHeader from 'components/CustomSubHeaders/CustomSubHeader';
import CustomMobileSubHeader from 'components/CustomSubHeaders/CustomMobileSubHeader';

const domainName = 'https://filecoin.io/';

const fontSet = 'Roboto-Regular, Arial, sans-serif';

export const customSubHeaderConfig = {
  design: 'filecoin_style',
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
      border-bottom: 1px solid #CECECE;
      a, span {
        transition: all .3s ease-out;
      }
      a:hover, span:hover {
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

      animation: ani .3s both;
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
        content: "";
        width: 20px;
        height: 20px;
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        transition: background-color .3s;
        border-top: 1px solid #F2F2F2;
        border-left: 1px solid #F2F2F2;
        background: #FFFFFF;
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

      @media only screen and (min-width: 900px)
      {
        font-size: 14px;
      }
      @media only screen and (min-width: 1440px)
      {
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
    subHeaderContainerStyles: css`
    `,
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

    Highlighted: css`
    `,
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
          text: "Docs",
          href: `${domainName}/build/#benefits-banner`
        },
        {
          text: "Tools & services",
          href: `${domainName}/build/#tools-and-more`
        },
        {
          text: "Grants",
          href: `${domainName}/build/#grants`
        },
        {
          text: "Roadmap",
          href: `${domainName}/build/#usp`
        },
        {
          text: "Videos",
          href: `${domainName}/build/#videos`
        },
        {
          text: "Filecoin Community",
          href: `${domainName}/build/#community`
        },
        {
          text: "Events",
          href: `${domainName}/build/#events`
        },
      ]
    },
    {
      text: 'Blog',
      href: `${domainName}/provide/`,
    }
  ],
};

export const FilecoinStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  poweredByPeeranha: true,
  withoutAdditionalLinks: true,
  signUpPageLogo: FileiconLogo,
  favicon: favicon,
  mobileSubHeader: (
    <CustomMobileSubHeader config={customSubHeaderConfig} logo={FileiconLogo} />
  ),
  customSubHeader: <CustomSubHeader config={customSubHeaderConfig} />,
  withoutFAQ: true,
  projectBorderRadius: '25px',
  fonts: {
    h3LetterSpacing: '1px',
    tagsLetterSpacing: '1px',
    questionTitleLetterSpacing: '1px',
    h3: fontSet,
    main: fontSet,
    questionItemTitle: fontSet,
    questionTitleFont: fontSet,
  },
  colors: {
    blue: '#0090FF',
    blueRGB: '0,144,255',
    blue2: '#FFFFFF',
    secondarySpecial: 'rgba(12,60,89,0.16)', // wrapper mainSubheader shadow and lines
    black: '#000000', // text
    warningLight: '#000000',
    darkBlue: 'rgba(0,0,0,.6)', // menu line color ...
    mainBackground: '#FFFFFF',
    mainLinks: '#000000', // menu selected item text
    attentionColor: '#0090FF',
    linkColor: '#0090FF', // Q&A color
    linkColorSecondary: '#000000',
    purple: 'rgba(0,0,0,.6)',
    btnColor: '#0090FF',
    tagColor: '#000000',
    premium: '#2FA3F1',
    premiumLight: '#D8EBF8',
    premiumRGB: '47, 163, 241',
  },
  fontFace: css`@font-face {
    font-family: 'Roboto-Regular';
    src:
      url(${RobotoRegularEOT}?#iefix) format('embedded-opentype'),
      url(${RobotoRegularWOFF}) format('woff'),
      url(${RobotoRegularTTF}) format('truetype');
    font-style: normal;
  }`,
  bountyBgColor: '#000000',
  coinsIconStyles: css`
    ellipse {
      stroke: rgba(0, 0, 0, 0.6);
      fill: #CCCCCC;
    }
  `,
  boostWalletBtnStyles: css`
    g {
      fill: #000000;
    }
  `,
  headerHeight: 170,
  isDropdownMenuArrow: false,
  customSubHeaderConfig,
  domainName: domainName,
};
