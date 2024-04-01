import React from 'react';
import { css } from 'styled-components';

const domainName = 'https://thegraph.com/';
const fonts = 'Euclid Circular A, sans-serif;';

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
    font: {
      body: `${fonts}`,
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
  fonts: {
    h3LetterSpacing: '0.5px',
    tagsLetterSpacing: '0.5px',
    questionTitleLetterSpacing: '0.5px',
    h3: `${fonts}`,
    main: `${fonts}`,
    questionItemTitle: `${fonts}`,
    questionTitleFont: `${fonts}`,
  },
  signUpPageLogo: 'https://images.peeranha.io/communities/graph/login-logo.svg',
  colors: {
    appWindowsColor: '#6F4CFF',
    appSafarieColor: '#6F4CFF',
    mainSubHeaderBgColor: '#0C0A1D',
    mainBackground: '#0C0A1D',
    border: '#3D3D54',
    baseShadow: '#3D3D54',
    linkColor: '#E1E1E4',
    linkCookieColor: '#6F4CFF',
    linkColorTransparent: '#6F4CFF',
    headerPrimary: '#6F4CFF',
    commentOption: '#6F4CFF',
    contentHeader: '#6F4CFF',
    transparentIconColor: '#E1E1E4',
    loaderColor: '#6F4CFF',
    votingIconColor: '#6F4CFF',
    linkColorSecondary: '#6F4CFF',
    walletButton: '#6F4CFF',
    btnColor: '#6F4CFF',
    btnHoverColor: '#6F4CFF',
    btnHeaderColor: '#6F4CFF',
    btnHeaderHoverColor: 'rgba(111,76,255,0.8)',
    tagColor: '#6F4CFF',
    localeArrowColor: '#A7A7AD',
    mobileLocaleTextColor: '#6F4CFF',
    textColor: '#6F4CFF',
    secondaryTextColor: '#515860',
    textColorShadow: '#6F4CFF',
    commHeadElemColor: '#E1E1E4',
    darkBlue: '#6F4CFF',
    paginationButtonBackgroundColor: '#6F4CFF',
    footerBackgroundColor: '#0C0A1D',
    footerText: '#E1E1E4',
    footerTextHoverColor: '#6F4CFF',
    footerBorderColor: '#3D3D54',
    userInformation: '#f4f3fa',
    pinnedPostBackground: '#6F4CFF',
    newPostButtonText: '#E1E1E4',
    secondaryAdditional: '#3D3D54',
    newPostMediaBackgroundColor: '#f4f3fa',
    navMenuBackgroundColor: '#c1bed8',
    tooltipColor: '#E1E1E4',
    tooltipSecondaryColor: '#A7A7AD',
    tooltipBackgroundColor: '#0C0A1D',
    administrationPopupBackgroundColor: '#221f35',
    administrationPopupTextColor: '#E1E1E4',
    administrationPopupCheckboxColor: '#2f2c41',
    administrationPopupCheckboxBorderColor: '#3D3D54',
    dividerColor: '#3D3D54',
    formColor: '#161426',
    formText: '#E1E1E4',
    headerShadow: '#3D3D54',
    sectionHeader: '#E1E1E4',
    white: '#E1E1E4',
  },
  cookieConsentPopupStyles: {
    background: '#0C0A1D',
    color: '#E1E1E4',

    button: {
      color: '#E1E1E4',
      borderColor: '#6F4CFF',
      background: '#6F4CFF',
      ':hover': {
        background: 'rgba(111, 76, 255, 0.8)',
        color: 'rgba(255, 255, 255, 1)',
        borderColor: 'rgba(111, 76, 255, 0.8)',
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
      stroke: #e1e1e4 !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: #e1e1e4;
      stroke-width: 1.5px;
      fill: none;
    }
  `,
  headerLoginButtonStyles: css`
    background: rgba(30, 28, 46, 1);
    border: 1px solid rgba(30, 28, 46, 1);
    color: rgba(225, 225, 228, 1);
    :hover {
      background: rgba(32, 31, 48, 1) !important;
      border: 1px solid rgba(32, 31, 48, 1) !important;
      color: rgba(255, 255, 255, 1) !important;
    }
  `,
  documentationColors: {
    headerBackground: '#6F4CFF',
    headerText: '#E1E1E4',
    buttonBackground: 'transparent',
    buttonText: '#E1E1E4',
    buttonBorder: '#E1E1E4',

    publishBackground: '#E1E1E4',
    publishText: '#6F4CFF',
    publishBackgroundHover: 'rgba(225, 225, 228, 0.7)',
    publishTextHover: '#6F4CFF',

    linkColor: '#6F4CFF',
    iconsFillColor: '#6F4CFF',

    saveDraftButtonBackground: '#6F4CFF',
    saveDraftButtonText: '#6F4CFF',
    saveDraftButtonHover: '#6F4CFF',
  },
};
