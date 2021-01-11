import React from 'react';
import { css } from 'styled-components';

import CustomSubHeader from 'components/CustomSubHeaders/CustomSubHeader';
import CustomMobileSubHeader from 'components/CustomSubHeaders/CustomMobileSubHeader';

import bannerImage from './images/create-and-go.png';
import logo from './images/create-and-go-logo.png';
import logoLight from './images/create-and-go-logo-light.png';

export const CustomSubHeaderConfig = {
  design: 'blogger_style',
  styles: {
    bg: {
      header: '#305d6e',
      dropdown: '#ffffff',
    },
    color: {
      a: '#ffffff',
      arrow: 'white',
    },
    font: {
      body: 'Neue Haas Grotesk Display Pro Light, Source Sans Pro, sans-serif',
    },
    header: {
      background: '#305d6e',
    },
    CustomSubHeader: `
      font-weight: bolder;
    `,
    subitems: `
      padding: 1em;

      border: none !important;
      border-radius: 0 !important;
      background: #000 !important;

      a {
        padding: .382em;

        font-size: 15px;
        line-height: 1em;
      }

      @media only screen and (max-width: 991px) {
        left: 5px;
        top: -5px;

        padding: 0 !important;

        background: transparent !important;
      }
    `,
  },
  links: {
    facebook: '',
    instagram: '',
    youtube: '',
    pinterest: ''
  },
  banner: bannerImage,
};

export const BloggerStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  poweredByPeeranha: true,
  withoutAdditionalLinks: true,
  leftMenuLogo: logo,
  signUpPageLogo: logo,
  mobileSubHeader: (
    <CustomMobileSubHeader config={CustomSubHeaderConfig} logo={logoLight} />
  ),
  customSubHeader: <CustomSubHeader config={CustomSubHeaderConfig} />,
  withoutFAQ: true,
  colors: {
    blueRGB: '93,109,254',
    black: '#02003D',
    lightSuccessColor: 'rgba(85, 195, 179, 0.25)',
    secondaryLight: '#5D6DFE',
  },
  headerHeight: 190,
  customSubHeaderConfig: CustomSubHeaderConfig,
};
