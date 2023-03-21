import React from 'react';
import { css } from 'styled-components';

const domainName = 'https://mintstatelabs.com/';

export const customSubHeaderConfig = {
  design: 'mintstatelabs_style',
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

export const MintStateLabsStyles = {
  name: 'mintStateLabs',
  documentationPosition: 'top',
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo:
    'https://images.peeranha.io/communities/mintStateLabs/logo-signUp.svg',

  colors: {
    appWindowsColor: '#2d89ef',
    appSafarieColor: '#5bbad5',
    mainSubHeaderBgColor: '#282828',
    mainBackground: '#F5F5F5',
    linkColor: '#53A6EC',
    linkCookieColor: '#5C23D4',
    linkColorTransparent: '#53A6EC',
    headerPrimary: '#53A6EC',
    commentOption: '#53A6EC',
    contentHeader: '#53A6EC',
    blockedInfoArea: '#DAEEFF',
    transparentIconColor: '#FFFF',
    loaderColor: '#53A6EC',
    votingIconColor: '#53A6EC',
    linkColorSecondary: '#53A6EC',
    walletButton: '#53A6EC',
    btnColor: '#53A6EC',
    btnHoverColor: '#5C23D4',
    btnHeaderColor: '#5C23D4',
    btnHeaderHoverColor: '#53A6EC',
    tagColor: '#53A6EC',
    localeArrowColor: '#F3F3F3',
    textColor: '#53A6EC',
    textColorShadow: '#53A6EC',
    commHeadElemColor: '#FFF',
  },
  cookieConsentPopupStyles: {
    background: '#53A6EC',
    color: '#F3F3F3',
    borderColor: '#FFF',
    button: {
      ':hover': {
        background: '#FFF',
        color: '#53A6EC',
      },
    },
  },
  headerHeight: 80,
  projectBorderRadius: '5px',
  domainName,
  communityBorderStyle: '2px solid rgb(0, 108, 208)',
  dropDownIconStyles: css`
    path {
      stroke: rgb(0, 108, 208) !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: rgb(0, 108, 208);
      stroke-width: 1.5px;
      fill: none;
    }
  `,
  headerLoginButtonStyles: css`
    background: #53a6ec;
    border: 2px solid #fff;
    color: #fff;
    :hover {
      background: #5c23d4 !important;
    }
  `,
};
