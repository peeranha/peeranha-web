import React from 'react';
import { css } from 'styled-components';

import CustomSubHeader from 'components/CustomSubHeaders/CustomSubHeader';
import CustomMobileSubHeader from 'components/CustomSubHeaders/CustomMobileSubHeader';

import favicon from '!file-loader?name=[name].[ext]!images/favicon-kanda.ico';
import KandaLogoWithTitle from './images/kandaWithTitle.png';

import RobotoRegularEOT from './fonts/Roboto-Regular.eot';
import RobotoRegularWOFF from './fonts/Roboto-Regular.woff';
import RobotoRegularTTF from './fonts/Roboto-Regular.ttf';
import RobotoMediumEOT from './fonts/Roboto-Medium.eot';
import RobotoMediumWOFF from './fonts/Roboto-Medium.woff';
import RobotoMediumTTF from './fonts/Roboto-Medium.ttf';
import RobotoBoldEOT from './fonts/Roboto-Bold.eot';
import RobotoBoldWOFF from './fonts/Roboto-Bold.woff';
import RobotoBoldTTF from './fonts/Roboto-Bold.ttf';

const domainName = 'http://kandaweather.org/';

export const CustomSubHeaderConfig = {
  design: 'logo_right__menu_right',
  styles: {
    bg: {
      header: '#ffffff',
    },
    color: {
      a: '#262626',
    },
    font: {
      body: 'Roboto, Arial, sans-serif',
    },

    subHeaderLetterSpacing: 'normal',
    topContainerStyles: css`
      max-width: 1140px;
      width: 100%;
    `,
    subHeaderContainerStyles: css`
      display: flex;
      justify-content: center;
    `,

    mobileSubHeaderImgStyles: css`
      @media only screen and (max-width: 350px) {
        max-height: 40px;
      }
      @media only screen and (max-width: 319px) {
        max-height: 35px;
      }
    `,

    topLogoContainerStyles: css`
      width: fit-content;
      margin-left: 45px;
    `,
    subHeaderLogoStyles: css`
      display: flex;
      align-items: center;

      img {
        width: 38px;
        height: 43px;
        margin-left: 1px;
      }
    `,

    subHeaderItem: css`
      position: relative;

      font-size: 16px;
      font-weight: 500;

      margin-left: 20px;

      > div {
        font-weight: normal;
      }

      :hover {
        opacity: 1 !important;
        color: #eb4e1c !important;
      }

      &:after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 25px;
        height: 2px;
        width: 0;
        opacity: 0;
        background-color: #eb4e1c;
        transition: opacity 0.3s ease, width 0.3s ease, left 0.3s ease;
      }

      &:hover:after {
        width: 100%;
        opacity: 1;
        left: 0;
      }

      @media only screen and (max-width: 991px) {
        padding: 10px 0 10px 15px !important;
      }

      @media only screen and (min-width: 992px) {
        padding: 0;
        margin-left: 20px;

        :first-child {
          margin-left: 0;
        }
      }
    `,
  },

  links: [
    {
      text: 'Home',
      href: domainName,
    },
    {
      text: 'Solution',
      href: `${domainName}about-kandaweather`,
    },
    {
      text: 'Contact',
      href: `${domainName}kandaweather-contact`,
    },
  ],
};

export const KandaStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  poweredByPeeranha: true,
  withoutAdditionalLinks: true,
  withoutFAQ: true,
  signUpPageLogo: KandaLogoWithTitle,
  favicon,

  logoTitleText: 'Kanda Weather Balloons',
  logoTitleStyles: css`
    margin-left: 10px;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 1px;
  `,

  mobileSubHeader: (
    <CustomMobileSubHeader
      config={CustomSubHeaderConfig}
      logo={KandaLogoWithTitle}
    />
  ),
  customSubHeader: <CustomSubHeader config={CustomSubHeaderConfig} />,

  fonts: {
    h3LetterSpacing: '1px',
    tagsLetterSpacing: '1px',
    questionTitleLetterSpacing: '1px',
    h3: 'Roboto-Regular, Arial, sans-serif',
    main: 'Roboto-Regular, Arial, sans-serif',
    questionItemTitle: 'Roboto-Regular, Arial, sans-serif',
    questionTitleFont: 'Roboto-Regular, Arial, sans-serif',
  },
  fontFace: `
  @font-face {
    font-family: 'Roboto';
    src:
      url(${RobotoRegularEOT}?#iefix) format('embedded-opentype'),
      url(${RobotoRegularWOFF}) format('woff'),
      url(${RobotoRegularTTF}) format('truetype');
    font-style: normal;
    font-weight: normal;
  }
  @font-face {
    font-family: 'Roboto';
    src: 
      url(${RobotoMediumEOT}?#iefix) format('embedded-opentype'),
      url(${RobotoMediumWOFF}) format('woff'),
      url(${RobotoMediumTTF}) format('truetype');
    font-style: normal;
    font-weight: 500;
  }
  @font-face {
    font-family: 'Roboto';
    src:
      url(${RobotoBoldEOT}?#iefix) format('embedded-opentype'),
      url(${RobotoBoldWOFF}) format('woff'),
      url(${RobotoBoldTTF}) format('truetype');
    font-style: normal;
    font-weight: 600;
  }
  `,

  colors: {
    blue: '#007cba',
    blueRGB: '0, 124, 186',
    blue2: '#e8e8e8',
    black: '#262626',
    warningLight: '#eb4e1c',
    darkBlue: '#10768c',
    mainBackground: '#f5f5f2',
    mainLinks: '#007cba',
    linkColor: '#007cba',
    purple: 'rgba(5, 40, 47, .8)',
    btnColor: '#eb4e1c',
    attentionColor: 'red',
    primarySpecial: '#e0e0e0',
    localeArrowColor: '#7b7b7b',
  },

  customRatingIconColors: {
    strokeColor: '#ffffff',
    bannedFill: '#DC3545',
    strangerFill: '#576fed',
    residentFill: '#fc6655',
    superheroFill: '#FF8500',
  },

  mainSubHeaderBgColor: '#10768c',
  commHeadElemColor: '#ffffff',
  fullyTransparent: 'rgba(0,0,0,0)',
  bountyBgColor: '#007cba',
  bellStrokeBorderColor: '#ffffff !important',
  communityBorderStyle: '2px solid #ffffff',

  boostWalletBtnStyles: css`
    g {
      fill: #eb4e1c;
    }
  `,

  coinsIconStyles: css`
    ellipse {
      stroke: #eb4e1c;
      fill: #e8e8e8;
    }
  `,

  headerLoginButtonStyles: css`
    color: #ffffff;
    border: 2px solid #ffffff;
  `,

  achievIconStyles: css`
    circle {
      stroke: #ffffff;
      stroke-width: 1.5px;
    }
    polyline {
      stroke: #ffffff;
      stroke-width: 1.5px;
    }
    path {
      stroke: #ffffff;
      stroke-width: 1.5px;
      fill: none;
    }
  `,

  bannedIconStyles: css`
    circle {
      fill: #dc3545;
    }
  `,

  dropDownIconStyles: css`
    path {
      stroke: #ffffff !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: #ffffff;
      stroke-width: 1.5px;
      fill: none;
    }
  `,

  energyNumberStyles: css`
    font-size: 15px;
    letter-spacing: -1px;
    color: #ffffff;
  `,

  signUpLogoWidth: '280px',
  headerHeight: 159,
  isDropdownMenuArrow: false,
  customSubHeaderConfig: CustomSubHeaderConfig,
  buttonBorderRadius: '50px',
  domainName,
};
