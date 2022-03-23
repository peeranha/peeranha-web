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

const colors = {
  firm: '#0090FF',
  elText: '#000000',
  mainText: '#7A7A7A',
  link: '#7A7AF0',
  bg: '#FFFFFF',
  extraBg: '#F3F3F3',
  menuItemText: '#999999',
  selectedMenuItemText: '#000000',
};

export const CustomSubHeaderConfig = {
  design: 'filecoin_style',
  styles: {
    bg: {
      header: colors.bg ?? '#FFFFFF',
      dropdown: colors.bg ?? '#FFFFFF',
    },
    color: {
      a: colors.menuItemText ?? 'rgba(0,0,0,0.6)',
    },
    font: {
      body: 'Roboto-Regular, Arial, sans-serif',
    },
    header: {
      background: colors.bg ?? '#ffffff',
    },
    subHeader: `
      border-bottom: 1px solid #CECECE;
      a, span {
        transition: all .3s ease-out;
      }
      a:hover, span:hover {
        color: ${colors.selectedMenuItemText}!important;
        opacity: 1!important;
      }
    `,
    subitems: `
      left: 50%!important;
      top: 100%!important;
      /*transform:translate(-50%, -5%)!important;*/
      padding: 25px 30px !important;
      border-radius: 3px!important;
      min-width: 100%!important;
      transform:translate(-50%, -5%)!important;

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
        border-top: 1px solid #f2f2f2;
        border-left: 1px solid #f2f2f2;
        background: ${colors.bg};
        z-index: 9999;
      }

      /*> div:last-child::after {
        content: "These explorers were built by community members and may have inaccuracies";
        font-weight: lighter;
        font-style: italic;
        opacity: 75%;
        font-size: smaller;
        overflow-wrap: break-word;
        white-space: normal;
        margin-top: 10px;
        line-height: 1.4;
      }*/

      @media only screen and (max-width: 991px) {
        a {
          padding: 0 0 0 30px  !important;
        }
      }

      @media only screen and (min-width: 992px) {
        a {
          padding: 5px 0 !important;
          line-height: 1.6!important;
        }
        > div > :last-child {
          margin: 0!important;
          padding: 5px 0 !important;
        }
      }
    `,
    subHeaderItem: `
      position: relative;

      font-size: 15px;
      font-weight: bold;

      > div {
        font-weight: normal;
      }

      padding: 10px 15px !important;

      @media only screen and (max-width: 991px) {
        padding: 10px 0 10px 15px !important;
      }

      @media only screen and (min-width: 992px) {
        padding: 0;
        margin-left: 30px;

        :first-child {
          margin-left: 0;
        }

        :last-child {
          margin-left: auto!important;
          padding: 0!important;
        }
      }

      margin: 0 !important;
    `,
    CustomSubHeader: `
      margin: 0 !important;
    `,
    subHeaderContainerStyles: `
      // margin: 0 !important;
    `,
    topLogoContainerStyles: `
      width: 80px!important;
      margin: 0!important;
      margin-right: 60px!important;
      display: flex;
      justify-content: center;
      align-content: center;
    `,
    subHeaderLogoStyles: `
      height: 40px;

      > img {
        height: 100%;
      }
    `,

    Highlighted: `
      color: #000000 !important;
      border: solid 1px rgba(0,0,0,.15);
      border-radius: 15px;
      padding: 5px 15px !important;
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
    },
    {
      text: 'Explore the Network',
      isHighlighted: true,
      subitems: [
        {
          text: 'Filfox.info',
          href: 'https://filfox.info/en',
        },
        {
          text: 'Filscan.io',
          href: 'https://filscan.io/#/tipset/chain',
        },
        {
          text: 'Filscout.io',
          href: 'https://filscout.io/en/',
        },
        {
          text: 'Spacegap',
          href: 'https://spacegap.github.io/',
        },
      ],
    },
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
    <CustomMobileSubHeader config={CustomSubHeaderConfig} logo={FileiconLogo} />
  ),
  customSubHeader: <CustomSubHeader config={CustomSubHeaderConfig} />,
  withoutFAQ: true,
  fonts: {
    h3LetterSpacing: '1px',
    tagsLetterSpacing: '1px',
    questionTitleLetterSpacing: '1px',
    h3: 'Roboto-Regular, Arial, sans-serif',
    main: 'Roboto-Regular, Arial, sans-serif',
    questionItemTitle: 'Roboto-Regular, Arial, sans-serif',
    questionTitleFont: 'Roboto-Regular, Arial, sans-serif',
  },
  colors: {
    blue: colors.mainText ?? 'rgba(0,0,0,.6)',
    blueRGB: '40,40,40',
    blue2: colors.extraBg ?? '#cccccc',
    secondarySpecial: 'rgba(0,0,0,.2)', // wrapper mainSubheader shadow and lines
    black: '#000000', // text
    warningLight: '#000000',
    darkBlue: 'rgba(0,0,0,.6)', // menu line color ...
    mainBackground: colors.bg ?? '#fafafa',
    mainLinks: colors.elText ?? 'rgba(0,0,0,.6)', // menu selected item text
    attentionColor: colors.linkColor ?? '#2fa3f1',
    linkColor: colors.linkColor ?? '#2fa3f1', // Q&A color
    linkColorSecondary: colors.elText ?? 'rgba(0,0,0,.6)',
    purple: 'rgba(0,0,0,.6)',
    btnColor: colors.elText ?? '#000000',
    tagColor: colors.elText ?? 'rgba(0,0,0,.6)',
    premium: '#2fa3f1',
    premiumLight: '#d8ebf8',
    premiumRGB: '47, 163, 241',
  },
  fontFace: `@font-face {
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
      fill: #cccccc;
    }
  `,
  boostWalletBtnStyles: css`
    g {
      fill: #000000;
    }
  `,

  headerHeight: 170,
  isDropdownMenuArrow: false,
  customSubHeaderConfig: CustomSubHeaderConfig,
  domainName: domainName,
};
