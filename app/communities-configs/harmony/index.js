import React from 'react';
import { css } from 'styled-components';

const domainName = 'https://www.koii.network/';

export const customSubHeaderConfig = {
  design: 'harmony_style',
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

export const HarmonyStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo:
    'https://images.peeranha.io/communities/harmony/harmony-logo1.svg',
  favicon: 'https://images.peeranha.io/communities/harmony/favicon-harmony.ico',
  colors: {
    mainSubHeaderBgColor: 'rgba(2, 10, 45, .9)',
    mainBackground: 'rgba(0, 85, 249, 0.08)',

    linkColor: 'rgb(36,95,226)',
    linkColorTransparent: 'rgb(36,95,226)',
    linkCookieColor: 'rgba(2, 10, 45, .9)',
    headerPrimary: 'rgb(36,95,226)',
    commentOption: 'rgb(36,95,226)',
    contentHeader: 'rgb(36,95,226)',
    blockedInfoArea: 'rgb(170,224,255)',
    transparentIconColor: 'rgb(170,224,255)',
    loaderColor: 'rgb(36,95,226)',
    votingIconColor: 'rgb(36,95,226)',
    linkColorSecondary: 'rgb(36,95,226)',
    textColorShadow: 'rgb(36,95,226)',
    commHeadElemColor: '#FFF',
    walletButton: 'rgb(36,95,226)',
    btnColor: 'rgb(36,95,226)',
    tagColor: 'rgb(36,95,226)',
  },

  cookieConsentPopupStyles: {
    background: '#4163a5',
    color: 'rgb(254, 254, 254)',
    borderColor: 'rgb(254, 254, 254)',
    button: {
      ':hover': {
        background: '#FFF',
        color: '#4163a5',
      },
    },
  },

  dropDownIconStyles: css`
    path {
      stroke: rgb(36, 95, 226) !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: rgb(36, 95, 226);
      stroke-width: 1.5px;
      fill: none;
    }
  `,

  headerHeight: 80,
  projectBorderRadius: '5px',
  domainName,
  communityBorderStyle: '2px solid rgb(36,95,226)',
};
