import React from 'react';
import { css } from 'styled-components';

import OrbisLogo from './images/Orbis-logo.svg?inline';
import favicon from '!file-loader?name=[name].[ext]!./images/Orbis-logo.ico';
const domainName = 'https://app.orbis.club/';

const fontSet = 'Roboto-Regular, Arial, sans-serif';

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
    font: {
      body: fontSet,
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

export const OrbisStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo: OrbisLogo,
  favicon,
  // Hided community fonts
  // fonts: {
  //   h3LetterSpacing: '3px',
  //   tagsLetterSpacing: '3px',
  //   questionTitleLetterSpacing: '2px',
  //   h3: 'Roboto-Regular, Arial, sans',
  //   main: 'Roboto-Regular, Arial, sans',
  //   questionItemTitle: 'Roboto-Regular, Arial, sans',
  //   questionTitleFont: 'Roboto-Regular, Arial, sans',
  // },
  // fontFace: `@font-face {
  //   font-family: 'Roboto-Regular';
  //   src:
  //     url(${RobotoRegularEOT}?#iefix) format('embedded-opentype'),
  //     url(${RobotoRegularWOFF}) format('woff'),
  //     url(${RobotoRegularTTF}) format('truetype');
  //   font-style: normal;
  // }`,

  colors: {
    mainSubHeaderBgColor: 'linear-gradient(90deg, #100D17 0%, #302763 100%)',
    mainBackground: 'rgba(234, 236, 244, 1)',
    linkColor: '#DE73DA',
    linkCookieColor: '#DE73DA',
    linkColorTransparent: '#DE73DA',
    headerPrimary: '#DE73DA',
    commentOption: '#DE73DA',
    contentHeader: '#DE73DA',
    blockedInfoArea: 'rgb(42 36 96 / 10%)',
    transparentIconColor: '#FFF',
    loaderColor: '#DE73DA',
    votingIconColor: '#DE73DA',
    linkColorSecondary: '#DE73DA',
    walletButton: '#DE73DA',
    btnColor: '#DE73DA',
    btnHoverColor: '#DE73DA',
    btnHeaderColor: 'linear-gradient( 135deg ,#f790bb 44.02%,#b971ee 90.66%)',
    btnHeaderHoverOpacity: '0.75',
    newPostButtonText: 'rgba(255, 255, 255, 1)',
    tagColor: '#DE73DA',
    localeArrowColor: '#DE73DA',
    textColor: '#DE73DA',
    textColorShadow: '#DE73DA',
    commHeadElemColor: '#FFF',
  },
  cookieConsentPopupStyles: {
    background: '#302763',
    color: '#fff',
    button: {
      color: '#101016',
      background: '#FFFFFF',
      border: '1px solid #FFF',
      ':hover': {
        opacity: '0.75',
        color: '#000',
        background: '#FFFFFF',
      },
    },
  },
  headerHeight: 80,
  projectBorderRadius: '8px', ////
  domainName,
  fullyTransparent: '#302763',
  communityBorderStyle: '2px solid #DE73DA',
  dropDownIconStyles: css`
    path {
      stroke: #de73da !important;
      stroke-width: 1.5px;
      fill: #302763 !important;
    }
    circle {
      stroke: #de73da;
      stroke-width: 1.5px;
      fill: #302763;
    }
  `,
  headerLoginButtonStyles: css`
    border: 1px solid #fff;
    color: #fff;
    :hover {
      background: linear-gradient(
        135deg,
        #f790bb 44.02%,
        #b971ee 90.66%
      ) !important;
      color: #fff !important;
      border: 1px solid linear-gradient(135deg, #f790bb 44.02%, #b971ee 90.66%) !important;
    }
  `,
};
