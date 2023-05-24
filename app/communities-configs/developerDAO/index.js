import React from 'react';
import { css } from 'styled-components';

const domainName = 'developerdao.peeranha.io';

export const customSubHeaderConfig = {
  design: 'orbis_style',
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

export const DeveloperDAOStyles = {
  name: 'communityDAO',
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo: 'https://images.peeranha.io/communities/communityDAO/logo.svg',
  colors: {
    appWindowsColor: 'rgba(210, 84, 189, 1)',
    appSafarieColor: 'rgba(210, 84, 189, 1)',
    mainSubHeaderBgColor: 'linear-gradient(111.12deg, #000000 41.3%, #D045B9 89.65%)',
    mainBackground: 'rgba(234, 236, 244, 1)',
    linkColor: 'rgba(210, 84, 189, 1)',
    linkCookieColor: 'rgba(210, 84, 189, 1)',
    linkColorTransparent: 'rgba(210, 84, 189, 1)',
    headerPrimary: 'rgba(210, 84, 189, 1)',
    commentOption: 'rgba(210, 84, 189, 1)',
    contentHeader: 'rgba(210, 84, 189, 1)',
    transparentIconColor: '#FFF',
    loaderColor: 'rgba(210, 84, 189, 1)',
    votingIconColor: 'rgba(210, 84, 189, 1)',
    linkColorSecondary: 'rgba(210, 84, 189, 1)',
    walletButton: 'rgba(210, 84, 189, 1)',
    btnColor: 'rgba(210, 84, 189, 1)',
    btnHoverColor: 'rgba(210, 84, 189, 1)',
    btnHeaderColor: 'rgb(255,255,255)',
    btnHeaderHoverOpacity: '0.75',
    newPostButtonText: 'rgba(0, 0, 0, 1)',
    tagColor: 'rgba(210, 84, 189, 1)',
    localeArrowColor: 'rgb(255,255,255)',
    textColor: 'rgba(210, 84, 189, 1)',
    textColorShadow: 'rgba(210, 84, 189, 1)',
    commHeadElemColor: '#FFF',
  },
  cookieConsentPopupStyles: {
    background: 'rgba(0, 0, 0, 1)',
    color: '#fff',
    button: {
      border: 'none',
      color: '#000',
      background: '#fff',
      ':hover': {
        color: '#000',
        background: '#fff',
        opacity: 0.75,
      },
    },
  },
  headerHeight: 80,
  projectBorderRadius: '4px',
  domainName,
  fullyTransparent: 'rgb(255, 255, 255)',
  communityBorderStyle: '2px solid rgba(0, 0, 0, 1)',
  dropDownIconStyles: css`
    path {
      stroke: rgba(0, 0, 0, 1) !important;
      stroke-width: 1.5px;
      fill: rgb(255, 255, 255) !important;
    }
    circle {
      stroke: rgb(255, 255, 255);
      stroke-width: 1.5px;
      fill: rgb(255, 255, 255);
    }
  `,
  headerLoginButtonStyles: css`
    border: 1px solid #fff;
    color: #fff;
    :hover {
      background: rgba(255, 255, 255, 1) !important;
      color: rgba(0, 0, 0, 1) !important;
    }
  `,
  newPostPopupButtonStyles: css`
    border: 1px solid #de73da;
    color: #de73da;
    :hover {
      background: linear-gradient(135deg, #f790bb 44.02%, #b971ee 90.66%) !important;
      color: #fff !important;
      border: 1px solid linear-gradient(135deg, #f790bb 44.02%, #b971ee 90.66%) !important;
    }
  `,
};
