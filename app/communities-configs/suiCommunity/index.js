import React from 'react';
import { css } from 'styled-components';

const domainName = 'https://suiCommunity.com/';
const fonts = 'Euclid Circular A, sans-serif;';

export const customSubHeaderConfig = {
  design: 'sui_style',
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

export const SuiCommunityStyles = {
  name: 'suiCommunity',
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  logoWhite: true,
  // fonts: {
  //   h3LetterSpacing: '0.5px',
  //   tagsLetterSpacing: '0.5px',
  //   questionTitleLetterSpacing: '0.5px',
  //   h3: `${fonts}`,
  //   main: `${fonts}`,
  //   questionItemTitle: `${fonts}`,
  //   questionTitleFont: `${fonts}`,
  // },
  signUpPageLogo: 'https://images.peeranha.io/communities/suiCommunity/logo.svg',
  colors: {
    mainSubHeaderBgColor: 'rgba(255, 255, 255, 1)',
    mainBackground: 'rgba(249, 252, 254, 1)',
    footerBackgroundColor: 'rgba(1, 24, 41, 1)',
    footerText: 'rgba(255, 255, 255, 1)',
    footerBorderColor: 'rgba(208, 213, 221, 0.2)',
    navMenuBackgroundColor: 'rgba(76, 162, 255, 0.1)',
    border: 'rgba(242, 249, 255, 1)',
    linkColor: 'rgba(76, 162, 255, 1)',
    linkCookieColor: 'rgba(76, 162, 255, 1)',
    linkColorTransparent: 'rgba(76, 162, 255, 1)',
    headerPrimary: 'rgba(76, 162, 255, 1)',
    commentOption: 'rgba(76, 162, 255, 1)',
    contentHeader: 'rgba(76, 162, 255, 1)',
    blockedInfoArea: 'rgba(242, 249, 255, 1)',
    transparentIconColor: 'rgba(242, 249, 255, 1)',
    loaderColor: 'rgba(76, 162, 255, 1)',
    votingIconColor: 'rgba(76, 162, 255, 1)',
    linkColorSecondary: 'rgba(76, 162, 255, 1)',
    walletButton: 'rgba(76, 162, 255, 1)',
    btnColor: 'rgba(76, 162, 255, 1)',
    btnHoverColor: 'rgba(76, 162, 255, 1)',
    btnHeaderColor: 'rgba(76, 162, 255, 1)',
    btnHeaderHoverColor: 'rgba(76, 162, 255, 1)',
    tagColor: 'rgba(76, 162, 255, 1)',
    localeArrowColor: 'rgba(76, 162, 255, 1)',
    textColor: 'rgba(76, 162, 255, 1)',
    textColorShadow: 'rgba(76, 162, 255, 0.4)',
    commHeadElemColor: '#282828',
    tooltipColor: '#282828',
    darkBlue: 'rgba(76, 162, 255, 1)',
    paginationButtonBackgroundColor: 'rgba(76, 162, 255, 1)',
    userInformation: 'rgba(76, 162, 255, 0.06)',
    pinnedPostBackground: 'rgba(76, 162, 255, 1)',
    pinnedPostTextHover: 'rgba(255, 255, 255, 1)',
    secondaryAdditional: 'rgba(76, 162, 255, 0.1)',
    newPostMediaBackgroundColor: 'rgba(76, 162, 255, 0.1)',
    // backgroundSpecial: 'rgba(247, 250, 253, 1)',
  },
  cookieConsentPopupStyles: {
    background: 'rgba(1, 24, 41, 1)',
    color: 'rgba(255, 255, 255, 1)',

    button: {
      color: 'rgba(255, 255, 255, 1)',
      borderColor: 'rgba(76, 162, 255, 1)',

      background: 'rgba(76, 162, 255, 1)',
      ':hover': {
        background: 'rgba(255, 255, 255, 1)',
        color: 'rgba(76, 162, 255, 1)',
        borderColor: 'rgba(255, 255, 255, 1)',
      },
    },
  },
  headerHeight: 80,
  // projectBorderRadius: '20px',
  domainName,
  communityBorderStyle: '2px solid rgba(76, 162, 255, 1)',
  dropDownIconStyles: css`
    path {
      stroke: rgba(76, 162, 255, 1) !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: rgba(76, 162, 255, 1);
      stroke-width: 1.5px;
      fill: none;
    }
  `,
  headerLoginButtonStyles: css`
    border: 2px solid rgba(76, 162, 255, 1);
    color: rgba(76, 162, 255, 1);
    :hover {
      background: rgba(76, 162, 255, 1) !important;
    }
  `,
  documentationColors: {
    headerBackground: 'rgba(76, 162, 255, 1)',
    headerText: 'rgba(255, 255, 255, 1)',
    buttonBackground: 'transparent',
    buttonText: 'rgba(255, 255, 255, 1)',
    buttonBorder: 'rgba(255, 255, 255, 1)',

    publishBackground: 'rgba(255, 255, 255, 1)',
    publishText: 'rgba(76, 162, 255, 1)',
    publishBackgroundHover: 'rgba(76, 162, 255, 0.06)',
    publishTextHover: 'rgba(76, 162, 255, 1)',

    linkColor: 'rgba(76, 162, 255, 1)',
    iconsFillColor: 'rgba(76, 162, 255, 1)',

    saveDraftButtonBackground: 'rgba(76, 162, 255, 1)',
    saveDraftButtonText: 'rgba(76, 162, 255, 1)',
    saveDraftButtonHover: 'rgba(76, 162, 255, 1)',
  },
};
