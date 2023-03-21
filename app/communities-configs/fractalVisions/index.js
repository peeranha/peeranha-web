import React from 'react';
import { css } from 'styled-components';

const domainName = 'https://guild.xyz/fractalvisions';

export const customSubHeaderConfig = {
  design: 'fractalVisions_styles',
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

export const FractalVisionsStyles = {
  name: 'fractalVisions',
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo:
    'https://images.peeranha.io/communities/fractalVisions/logo.svg',

  colors: {
    appWindowsColor: '#6D00B3',
    appSafarieColor: '#6D00B3',
    mainSubHeaderBgColor:
      'linear-gradient(117.73deg, #FFFFFF -12.53%, #A52565 56.31%, #6D00B3 123.73%);',
    mainBackground: 'rgba(234, 236, 244, 1)',
    linkColor: '#6D00B3',
    linkCookieColor: '#15EBFF',
    linkColorTransparent: '#6D00B3',
    headerPrimary: '#6D00B3',
    commentOption: '#6D00B3',
    contentHeader: '#6D00B3',
    blockedInfoArea: 'rgb(42 36 96 / 10%)',
    transparentIconColor: '#FFF',
    loaderColor: '#6D00B3',
    votingIconColor: '#6D00B3',
    linkColorSecondary: '#6D00B3',
    walletButton: '#6D00B3',
    btnColor: '#6D00B3',
    btnHoverColor: '#6D00B3',
    btnHeaderColor: '#FFF',
    btnHeaderHoverOpacity: '0.75',
    newPostButtonText: '#6D00B3',
    tagColor: '#6D00B3',
    localeArrowColor: '#6D00B3',
    textColor: '#6D00B3',
    textColorShadow: '#6D00B3',
    commHeadElemColor: '#FFF',
  },
  cookieConsentPopupStyles: {
    background: '#6D00B3',
    color: '#fff',
    button: {
      color: '#000',
      background: '#FFF',
      border: '1px solid #FFF',
      ':hover': {
        opacity: '0.75',
        color: '#000',
        background: '#FFF',
      },
    },
  },
  headerHeight: 80,
  projectBorderRadius: '5px',
  domainName,
  fullyTransparent: '#FFF',
  communityBorderStyle: '2px solid #6D00B3',
  dropDownIconStyles: css`
    path {
      stroke: #6d00b3 !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: #6d00b3;
      stroke-width: 1.5px;
      fill: none !important;
    }
  `,
  headerLoginButtonStyles: css`
    border: 1px solid #531c67;
    color: #fff;
    :hover {
      background: #fff !important;
      color: #531c67 !important;
      border: 1px solid #531c67 !important;
    }
  `,
  newPostPopupButtonStyles: css`
    border: 1px solid #6d00b3;
    color: #6d00b3;
    :hover {
      background: #6d00b3 !important;
      color: #fff !important;
      border: 1px solid #6d00b3 !important;
    }
  `,
};
