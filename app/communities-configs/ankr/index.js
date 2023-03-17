import React from 'react';
import { css } from 'styled-components';

const domainName = 'https://valist.io/';

export const customSubHeaderConfig = {
  design: 'valist_style',
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

export const AnkrStyles = {
  name: 'ankr',
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo: 'https://images.peeranha.io/communities/ankr/ankrBlueLogo.svg',

  colors: {
    appMobileColor: '#FFF',
    appSafarieColor: '#5bbad5',
    mainSubHeaderBgColor: '#FFFFFF',
    mainBackground: '#F2F5FA',
    linkColor: '#356DF3',
    linkCookieColor: '#356DF3',
    linkColorTransparent: '#356DF3',
    headerPrimary: '#356DF3',
    commentOption: '#356DF3',
    contentHeader: '#356DF3',
    blockedInfoArea: '#356EF30C',
    transparentIconColor: '#fff',
    loaderColor: '#356DF3',
    votingIconColor: '#356DF3',
    linkColorSecondary: '#356DF3',
    walletButton: '#356DF3',
    btnColor: '#356DF3',
    btnHoverColor: '#FF9A9E',
    btnHeaderColor: '#356DF3',
    btnHeaderHoverColor: '#356EF3DA',
    tagColor: '#356DF3',
    localeArrowColor: '#356EF3DA',
    textColor: '#356EF3DA',
    textColorShadow: '#356DF3',
    commHeadElemColor: '#356DF3',
  },
  cookieConsentPopupStyles: {
    background: '#FFFFFF',
    color: '#2E343C',
    borderColor: '#356DF3',
    button: {
      color: '#fff',
      background: '#356DF3',
      ':hover': {
        borderColor: '#356DF3',
        background: '#FFFFFF',
        color: '#356DF3',
      },
    },
  },
  headerHeight: 80,
  projectBorderRadius: '20px',
  domainName,
  communityBorderStyle: '3px solid #356DF3',
  dropDownIconStyles: css`
    path {
      stroke: #356df3 !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: #356df3;
      stroke-width: 1.5px;
      fill: none;
    }
  `,
  headerLoginButtonStyles: css`
    background: #fff;
    border: 2px solid #356df3;
    color: #356df3;
    :hover {
      background: #356df3 !important;
      color: #fff !important;
      border: 2px solid #356df3 !important;
    }
  `,
};
