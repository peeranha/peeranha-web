import React from 'react';
import { css } from 'styled-components';

import favicon from './images/favicon-koii.svg?inline';
import koiiLogo from 'communities-configs/koii/images/koii-logo.svg?inline';
const domainName = 'https://www.koii.network/';

const fontSet = 'Roboto-Regular, Arial, sans-serif';

export const customSubHeaderConfig = {
  design: 'koii_style',
  styles: {
    bg: {
      header: '#FFFFFF',
      dropdown: '#FFFFFF',
    },
    color: {
      a: '#999999',
    },
    font: {
      body: `${fontSet}`,
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

export const KoiiStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo: koiiLogo,
  favicon,
  colors: {
    mainSubHeaderBgColor: 'rgb(236,251,250)',
    mainBackground: 'rgb(245 245 245)',
    linkColor: 'rgb(8,121,128)',
    linkColorTransparent: 'rgb(94,217,209)',
    headerPrimary: 'rgb(190,240,237)',
    commentOption: 'rgb(94,217,209)',
    contentHeader: 'rgb(94,217,209)',
    blockedInfoArea: 'rgb(209, 255, 255)',
    transparentIconColor: 'rgb(117,211,211)',
    loaderColor: 'rgb(94,217,209)',
    votingIconColor: 'rgb(94,217,209)',
    linkColorSecondary: 'rgb(94,217,209)',
    walletButton: 'rgb(94,217,209)',
    btnColor: 'rgb(94,217,209)',
    tagColor: 'rgb(8,121,128)',
    newPostButtonText: 'rgb(34,40,98)',
    textColor: 'rgb(94,217,209)',
    textColorShadow: 'rgb(42,192,167)',
  },

  cookieConsentPopupStyles: {
    background: 'rgb(53,53,112)',
    color: 'rgb(255,199,143)',
  },

  dropDownIconStyles: css`
    path {
      stroke: rgb(94, 217, 209) !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: rgb(94, 217, 209);
      stroke-width: 1.5px;
      fill: none;
    }
  `,

  headerLoginButtonStyles: css`
    color: rgb(34, 40, 98);
  `,
  
  headerHeight: 80,
  projectBorderRadius: '24px',
  domainName,
  communityBorderStyle: '2px solid rgb(94, 217, 209)',
};
