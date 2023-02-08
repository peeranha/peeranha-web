import React from 'react';
import { css } from 'styled-components';

const domainName = 'https://forcecommunity.io/';

const fonts = 'Roboto, sans-serif';

export const customSubHeaderConfig = {
  design: 'force_style',
  styles: {
    bg: {
      header: '#FFFFFF',
      dropdown: '#FFFFFF',
    },
    color: {
      a: '#999999',
    },
    font: {
      body: fonts,
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

export const ForceStyles = {
  name: 'force',
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo: 'https://images.peeranha.io/communities/force/Group.svg',
  colors: {
    appWindowsColor: '#ffc40d',
    appSafarieColor: '#000000',
    mainSubHeaderBgColor: '#FFF',
    mainBackground: 'rgba(27,32,48,0.02)',
    linkColor: '#251E67',
    linkCookieColor: '#FFFF',
    linkColorTransparent: '#251E67',
    headerPrimary: '#251E67',
    commentOption: '#251E67',
    contentHeader: '#251E67',
    blockedInfoArea: 'rgb(42 36 96 / 10%)',
    transparentIconColor: '#FFF',
    loaderColor: '#251E67',
    votingIconColor: '#251E67',
    linkColorSecondary: '#251E67',
    walletButton: '#251E67',
    btnColor: '#251E67',
    btnHoverColor: '#251E67',
    btnHeaderColor: '#FFAF00',
    btnHeaderHoverOpacity: '0.75',
    newPostButtonText: '#000',
    tagColor: '#251E67',
    localeArrowColor: '#251E67',
    textColor: '#251E67',
    textColorShadow: '#251E67',
    commHeadElemColor: '#251E67',
  },
  fonts: {
    h3: `${fonts}`,
    main: `${fonts}`,
    questionItemTitle: `${fonts}`,
    questionTitleFont: `${fonts}`,
    mainLinksSelected: `${fonts}`,
    mainLinksNotSelected: `${fonts}`,
  },
  cookieConsentPopupStyles: {
    background: '#2A2460',
    color: '#fff',
    button: {
      color: '#000',
      background: '#FFAF00',
      ':hover': {
        opacity: '0.75',
        color: '#000',
        background: '#FFAF00',
      },
    },
  },
  headerHeight: 80,
  projectBorderRadius: '10px',
  domainName,
  communityBorderStyle: '1px solid #251E67',
  dropDownIconStyles: css`
    path {
      stroke: #251e67 !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: #251e67;
      stroke-width: 1.5px;
      fill: none;
    }
  `,
  headerLoginButtonStyles: css`
    background: #fff;
    border: 2px solid #ffaf00;
    color: #000;
    :hover {
      background: #ffaf00 !important;
      color: #000 !important;
      border: 2px solid #ffaf00 !important;
    }
  `,
};
