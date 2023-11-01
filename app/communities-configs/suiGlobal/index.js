import React from 'react';
import { css } from 'styled-components';

const domainName = 'https://suiglobal.crew3.xyz/questboard';

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

export const SuiGlobalStyles = {
  name: 'suiGlobal',
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo: 'https://images.peeranha.io/communities/suiGlobal/logo.svg',

  colors: {
    appWindowsColor: '#2b5797',
    appSafarieColor: '#5bbad5',
    mainSubHeaderBgColor: 'rgb(255,255,255)',
    mainBackground: '#F5F5F5',
    linkColor: 'rgb(79,183,255)',
    linkCookieColor: 'rgb(16, 53, 244)',
    linkColorTransparent: 'rgb(79,183,255)',
    headerPrimary: 'rgb(79,183,255)',
    commentOption: 'rgb(79,183,255)',
    contentHeader: 'rgb(79,183,255)',
    transparentIconColor: '#FFFF',
    loaderColor: 'rgb(79,183,255)',
    votingIconColor: 'rgb(79,183,255)',
    linkColorSecondary: 'rgb(79,183,255)',
    walletButton: 'rgb(79,183,255)',
    btnColor: 'rgb(79,183,255)',
    btnHoverColor: 'rgb(79,183,255)',
    btnHeaderColor: 'rgb(79,183,255)',
    btnHeaderHoverColor: 'rgb(79,183,255)',
    tagColor: 'rgb(43,151,224)',
    localeArrowColor: '#F3F3F3',
    textColor: 'rgb(79,183,255)',
    textColorShadow: 'rgb(79,183,255)',
    commHeadElemColor: '#282828',
    darkBlue: '#1a1c20',
    border: '#D0DAE6',
  },
  cookieConsentPopupStyles: {
    background:
      'linear-gradient(90deg, rgba(174, 222, 255, 0.99) 6.03%, rgba(11, 120, 195, 0.99) 71.4%)',
    color: '#F3F3F3',

    button: {
      color: 'rgb(255,255,255)',
      borderColor: 'rgb(255,255,255)',

      background: 'none',
      ':hover': {
        background: 'rgb(255,255,255)',
        color: 'rgb(79,183,255)',
      },
    },
  },
  headerHeight: 80,
  projectBorderRadius: '20px',
  domainName,
  communityBorderStyle: '2px solid rgb(79, 183, 255)',
  dropDownIconStyles: css`
    path {
      stroke: rgb(79, 183, 255) !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: rgb(79, 183, 255);
      stroke-width: 1.5px;
      fill: none;
    }
  `,
  headerLoginButtonStyles: css`
    border: 2px solid rgb(79, 183, 255);
    color: rgb(79, 183, 255);
    :hover {
      background: rgb(79, 183, 255) !important;
    }
  `,
};
