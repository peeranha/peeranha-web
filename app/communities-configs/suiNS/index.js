import React from 'react';
import { css } from 'styled-components';

const domainName = 'https://suins.io/';

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

export const SuiNSStyles = {
  name: 'SuiNS',
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo: 'https://images.peeranha.io/communities/suins/suins.svg',

  colors: {
    appWindowsColor: '#2b5797',
    appSafarieColor: '#5bbad5',
    mainSubHeaderBgColor: 'rgb(255,255,255)',

    mainBackground: 'rgba(232, 231, 236, 1)',

    linkColor: 'rgba(55, 101, 227, 1)',
    linkColorTransparent: 'rgba(55, 101, 227, 1)',
    headerPrimary: 'rgba(55, 101, 227, 1)',
    commentOption: 'rgba(55, 101, 227, 1)',
    contentHeader: 'rgba(55, 101, 227, 1)',
    transparentIconColor: '#FFFF',
    loaderColor: 'rgba(55, 101, 227, 1)',
    votingIconColor: 'rgba(55, 101, 227, 1)',
    linkColorSecondary: 'rgba(55, 101, 227, 1)',
    walletButton: 'rgba(55, 101, 227, 1)',
    btnColor: 'rgba(55, 101, 227, 1)',
    btnHoverColor: 'rgba(55, 101, 227, 1)',
    btnHeaderColor: 'rgba(55, 101, 227, 1)',
    btnHeaderHoverColor: 'rgba(55, 101, 227, 1)',
    tagColor: 'rgba(55, 101, 227, 1)',
    localeArrowColor: '#F3F3F3',
    linkCookieColor: 'rgba(85, 180, 208, 1)',
    textColor: 'rgba(55, 101, 227, 1)',
    textColorShadow: 'rgba(55, 101, 227, 1)',
    paginationButtonBackgroundColor: 'rgba(179, 174, 207, 1)',
    commHeadElemColor: '#282828',
    darkBlue: '#1a1c20',
  },
  cookieConsentPopupStyles: {
    background: 'rgba(33, 29, 52, 1)',
    color: 'rgba(255, 255, 255, 1)',

    button: {
      color: 'rgb(255,255,255)',
      borderColor: 'rgba(55, 101, 227, 1)',

      background: 'rgba(55, 101, 227, 1)',
      ':hover': {
        background: 'rgba(55, 101, 227, 0.8)',
        color: 'rgb(255,255,255)',
      },
    },
  },
  headerHeight: 80,
  projectBorderRadius: '3px',
  domainName,
  communityBorderStyle: '1px solid rgba(55, 101, 227, 1)',
  dropDownIconStyles: css`
    path {
      stroke: rgba(55, 101, 227, 1) !important;
      stroke-width: 1px;
      fill: none !important;
    }
    circle {
      stroke: rgba(55, 101, 227, 1);
      stroke-width: 1px;
      fill: none;
    }
  `,
  headerLoginButtonStyles: css`
    border: 1px solid rgba(55, 101, 227, 1);
    color: rgba(55, 101, 227, 1);
    :hover {
      background: rgba(55, 101, 227, 1) !important;
    }
  `,
};
