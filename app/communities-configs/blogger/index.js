import React from 'react';
import { css } from 'styled-components';

import CustomSubHeader from 'components/CustomSubHeaders/CustomSubHeader';

import bannerImage from './images/create-and-go.png';

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
  customSubHeader: <CustomSubHeader config={CustomSubHeaderConfig} />,
  withoutFAQ: true,
  colors: {
    blue: '#5D6DFE',
    blueRGB: '93,109,254',
    black: '#02003D',
    warningLight: '#FF4026',
    tagColor: '#FF422A',
    successColor: '#55C3B3',
    lightSuccessColor: 'rgba(85, 195, 179, 0.25)',
    secondaryLight: '#5D6DFE',
  },
  coinsIconStyles: css`
    ellipse {
      stroke: #4f07e9;
      fill: #dfe3f2;
    }
  `,
  headerHeight: 185,
  customSubHeaderConfig: CustomSubHeaderConfig,
};
