import React from 'react';
import { css } from 'styled-components';

const domainName = 'launchpad.peeranha.io';

export const customSubHeaderConfig = {
  design: 'launchpad_style',
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

export const LaunchpadStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo: 'https://images.peeranha.io/communities/launchpad/logo.svg',
  favicon: 'https://images.peeranha.io/communities/launchpad/favicon.ico',

  colors: {
    mainSubHeaderBgColor:
      'linear-gradient(266.99deg, #4EF286 -7.91%, #1A74FC 70.58%, #1650A9 105.4%)',
    mainBackground: 'rgba(234, 236, 244, 1)',
    linkColor: '#1A74FC',
    linkCookieColor: '#4EF286',
    linkColorTransparent: '#1A74FC',
    headerPrimary: '#1A74FC',
    commentOption: '#1A74FC',
    contentHeader: '#1A74FC',
    blockedInfoArea: 'rgba(0, 0, 0, 10%)',
    transparentIconColor: '#FFF',
    loaderColor: '#1A74FC',
    votingIconColor: '#1A74FC',
    linkColorSecondary: '#1A74FC',
    walletButton: '#1A74FC',
    btnColor: '#1A74FC',
    btnHoverColor: '#1A74FC',
    btnHeaderColor: '#1A74FC',
    btnHeaderHoverOpacity: '0.75',
    newPostButtonText: '#FFF',
    tagColor: '#1A74FC',
    localeArrowColor: '#7B7B7B',
    textColor: '#1A74FC',
    textColorShadow: '#1A74FC',
    commHeadElemColor: '#282828',
  },
  cookieConsentPopupStyles: {
    background: '#185CC3',
    color: '#fff',
    button: {
      border: 'none',
      color: '#1650A9',
      background: '#fff',
      ':hover': {
        color: '#1650A9',
        background: '#fff',
        opacity: 0.75,
      },
    },
  },
  headerHeight: 80,
  projectBorderRadius: '4px',
  domainName,
  fullyTransparent: 'none',
  communityBorderStyle: '2px solid #1A74FC',
  dropDownIconStyles: css`
    path {
      stroke: #1a74fc !important;
      stroke-width: 1.5px;
    }
    circle {
      stroke: #1a74fc;
      stroke-width: 1.5px;
    }
  `,
  headerLoginButtonStyles: css`
    border: 1px solid #1a74fc;
    color: #1a74fc;
    :hover {
      background: rgba(255, 255, 255, 1) !important;
      color: #1a74fc !important;
    }
  `,
  newPostPopupButtonStyles: css`
    border: 1px solid #1a74fc;
    color: #1a74fc;
    :hover {
      background: #1a74fc !important;
      color: #fff !important;
      border: 1px solid #1a74fc !important;
    }
  `,
};
