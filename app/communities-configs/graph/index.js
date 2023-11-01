import React from 'react';
import { css } from 'styled-components';

const domainName = 'https://thegraph.com/';

export const customSubHeaderConfig = {
  design: 'graph_style',
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

export const GraphStyles = {
  name: 'graph',
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  logoWhite: true,
  signUpPageLogo: 'https://images.peeranha.io/communities/graph/logo-signUp.svg',
  colors: {
    appWindowsColor: '#483AAA',
    appSafarieColor: '#483AAA',
    mainSubHeaderBgColor: '#0D0A1D',
    mainBackground: '#E0DFE5',
    border: '#D0DAE6',
    linkColor: '#483AAA',
    linkCookieColor: '#483AAA',
    linkColorTransparent: '#252535',
    headerPrimary: '#483AAA',
    commentOption: '#483AAA',
    contentHeader: '#483AAA',
    transparentIconColor: '#FFF',
    loaderColor: '#483AAA',
    votingIconColor: '#483AAA',
    linkColorSecondary: '#483AAA',
    walletButton: '#483AAA',
    btnColor: '#483AAA',
    btnHoverColor: '#483AAA',
    btnHeaderColor: '#483AAA',
    tagColor: '#483AAA',
    localeArrowColor: '#A7A7AD',
    mobileLocaleTextColor: '#483AAA',
    textColor: '#483AAA',
    secondaryTextColor: '#515860',
    textColorShadow: '#483AAA',
    commHeadElemColor: '#FFF',
    darkBlue: '#483AAA',
    paginationButtonBackgroundColor: '#483AAA',
    footerBackgroundColor: '#0D0A1D',
    footerText: '#FFF',
    footerTextHoverColor: '#483AAA',
    footerBorderColor: '#3D3D54',
    userInformation: '#f4f3fa',
    pinnedPostBackground: '#483AAA',
    newPostButtonText: '#FFF',
    secondaryAdditional: '#C1C1D7',
    newPostMediaBackgroundColor: '#f4f3fa',
    navMenuBackgroundColor: '#c1bed8',
    tooltipColor: '#FFF',
    tooltipSecondaryColor: '#A7A7AD',
    tooltipBackgroundColor: '#221F36',
    administrationPopupBackgroundColor: '#221f35',
    administrationPopupTextColor: '#FFF',
    administrationPopupCheckboxColor: '#2f2c41',
    administrationPopupCheckboxBorderColor: '#3D3D54',
    dividerColor: '#C1C1D7',
  },
  cookieConsentPopupStyles: {
    background: '#221F36',
    color: '#FFF',

    button: {
      color: '#FFF',
      borderColor: '#483AAA',
      background: '#483AAA',
      ':hover': {
        background: '#FFF',
        color: '#483AAA',
        borderColor: '#483AAA',
      },
    },
  },
  headerHeight: 80,
  // projectBorderRadius: '20px',
  domainName,
  fullyTransparent: '#2b2736',
  communityBorderStyle: '2px solid #3D3D54',
  dropDownIconStyles: css`
    path {
      stroke: #fff !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: #fff;
      stroke-width: 1.5px;
      fill: none;
    }
  `,
  headerLoginButtonStyles: css`
    border: 1px solid #483aaa;
    color: #483aaa;
    :hover {
      background: #483aaa !important;
    }
  `,
  documentationColors: {
    headerBackground: '#483AAA',
    headerText: '#F3F3F3',
    buttonBackground: 'transparent',
    buttonText: '#F3F3F3',
    buttonBorder: '#F3F3F3',

    publishBackground: '#F3F3F3',
    publishText: '#483AAA',
    publishBackgroundHover: 'rgba(243,243,243,0.7)',
    publishTextHover: '#483AAA',

    linkColor: '#483AAA',
    iconsFillColor: '#483AAA',

    saveDraftButtonBackground: '#483AAA',
    saveDraftButtonText: '#483AAA',
    saveDraftButtonHover: '#483AAA',
  },
};
