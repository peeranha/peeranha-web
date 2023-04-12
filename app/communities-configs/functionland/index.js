import React from 'react';
import { css } from 'styled-components';

const domainName = 'https://fx.land/';

export const customSubHeaderConfig = {
  design: 'functionland_style',
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

export const FunctionlandStyles = {
  name: 'functionland',
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo: 'https://images.peeranha.io/communities/functionland/logo.svg',
  colors: {
    appWindowsColor: '#da532c',
    appSafarieColor: '#86d55b',
    mainBackground: '#F3F3F3',
    linkColor: 'rgb(9, 147, 147)',
    linkColorTransparent: 'rgb(48, 103, 103)',
    headerPrimary: 'rgb(9, 147, 147)',
    commentOption: 'rgb(9, 147, 147)',
    contentHeader: 'rgb(9, 147, 147)',
    blockedInfoArea: 'rgb(209, 255, 255)',
    transparentIconColor: 'rgb(209, 255, 255)',
    loaderColor: 'rgb(9, 147, 147)',
    votingIconColor: 'rgb(9, 147, 147)',
    linkColorSecondary: 'rgb(9, 147, 147)',
    walletButton: 'rgb(9, 147, 147)',
    btnColor: 'rgb(9, 147, 147)',
    tagColor: 'rgb(9, 147, 147)',
    textColor: 'rgb(9, 147, 147)',
    textColorShadow: 'rgba(9, 147, 147, 0.4)',
    localeArrowColor: 'rgb(9, 147, 147)',
  },
  documentationColors: {
    headerBackground: 'rgb(9, 147, 147)',
    headerText: '#F3F3F3',
    buttonBackground: 'transparent',
    buttonText: '#F3F3F3',
    buttonBorder: '#F3F3F3',

    publishBackground: '#F3F3F3',
    publishText: 'rgb(9, 147, 147)',
    publishBackgroundHover: 'rgba(243,243,243,0.7)',
    publishTextHover: 'rgb(9, 147, 147)',

    linkColor: 'rgb(9, 147, 147)',
    iconsFillColor: 'rgb(36,199,199)',

    saveDraftButtonBackground: 'rgb(9, 147, 147)',
    saveDraftButtonText: 'rgb(9, 147, 147)',
    saveDraftButtonHover: 'rgb(9, 147, 147)',
  },
  headerHeight: 80,
  domainName,
  dropDownIconStyles: css`
    path {
      stroke: rgb(9, 147, 147) !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: rgb(9, 147, 147);
      stroke-width: 1.5px;
      fill: none;
    }
  `,
  communityBorderStyle: '2px solid rgb(9, 147, 147)',
};
