import React from 'react';

import coinsBlueIcon from 'images/coinsBlack.svg?external';
import OntLogo from './images/ont.svg?inline';
import favicon from '!file-loader?name=[name].[ext]!images/favicon-ont.ico';

import RobotoRegularEOT from './fonts/Roboto-Regular.eot';
import RobotoRegularWOFF from './fonts/Roboto-Regular.woff';
import RobotoRegularTTF from './fonts/Roboto-Regular.ttf';

import CustomSubHeader from 'components/CustomSubHeaders/CustomSubHeader';
import CustomMobileSubHeader from 'components/CustomSubHeaders/CustomMobileSubHeader';

export const CustomSubHeaderConfig = {
  design: "logo_right__menu_right",
  styles: {
    bg: {
      header: '#ffffff',
      dropdown: '#ffffff',
    },
    color: {
      a: 'rgba(0,0,0,0.6)',
    },
    font: {
      body: 'Roboto-Regular, Arial, sans-serif',
    },
    header: {
      background: '#ffffff',
    },
    subHeader: `
      > div > div {
        float: left;
      }
    `,
    subitems: `
      @media only screen and (min-width: 992px) {
        background: #fafafa;
      }
    `,
    subHeaderItem: `
      font-size: 13px;

      @media only screen and (min-width: 992px) {
        :first-child {
          margin-left: 0;
        }
      }        
    `,
    CustomSubHeader: `
      
    `,
  },
  links: [
    {
      text: 'Home',
      href: 'https://ont.io/',
    },
    {
      text: 'Developer',
      subitems: [
        {
          text: 'Developer Center',
          href: 'https://developer.ont.io/',
        },
        {
          text: 'Bounty Program',
          href: 'https://bounty.ont.io/',
        },
      ],
    },
    {
      text: 'dApps',
      subitems: [
        {
          text: 'dApp List',
          href: 'https://oodapp.io/',
        },
        {
          text: 'Submit a dApp',
          href: 'https://submit.oodapp.io/',
        },
      ],
    },
    {
      text: 'Wallets',
      subitems: [
        {
          text: 'ONTO',
          href: 'https://onto.app/',
        },
        {
          text: 'OWallet',
          href: 'https://github.com/ontio/owallet',
        },
      ],
    },
    {
      text: 'Trust Ecosystem',
      subitems: [
        {
          text: 'ONT ID',
          href: 'https://ontid.ont.io/',
        },
        {
          text: 'Node',
          href: 'https://node.ont.io/',
        },
        {
          text: 'PAX',
          href: 'https://pax.ont.io/',
        },
      ],
    },

    {
      text: 'Global Workshop',
      subitems: [
        {
          text: 'University Workshop',
          href: 'https://ont.io/global_uni_workshop',
        },
        {
          text: 'Course',
          href: 'https://ont.io/global_uni_workshop/course',
        },
      ],
    },
    {
      text: 'About',
      subitems: [
        {
          text: 'About us',
          href: 'https://ont.io/aboutus',
        },
        {
          text: 'News',
          href: 'https://medium.com/ontologynetwork',
        },
        {
          text: 'Contact us',
          href: 'https://ont.io/contactUs',
        },
      ],
    },
    {
      text: 'Consultation',
      href: 'https://ont.io/consultation',
    },
  ],
};

export const OntStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  poweredByPeeranha: true,
  withoutAdditionalLinks: true,
  coinsIcon: coinsBlueIcon,
  leftMenuLogo: OntLogo,
  signUpPageLogo: OntLogo,
  favicon: favicon,
  mobileSubHeader: (
    <CustomMobileSubHeader config={CustomSubHeaderConfig} logo={OntLogo} />
  ),
  customSubHeader: <CustomSubHeader config={CustomSubHeaderConfig} />,
  withoutFAQ: true,
  fonts: {
    h3LetterSpacing: '1px',
    tagsLetterSpacing: '1px',
    questionTitleLetterSpacing: '1px',
    h3: 'Roboto-Regular, Arial, sans-serif',
    main: 'Roboto-Regular, Arial, sans-serif',
    questionItemTitle: 'Roboto-Regular, Arial, sans-serif',
    questionTitleFont: 'Roboto-Regular, Arial, sans-serif',
  },
  colors: {
    blue: 'rgba(0,0,0,.6)',
    blueRGB: '40,40,40',
    blue2: '#cccccc',
    secondarySpecial: 'rgba(0,0,0,.4)',
    black: '#000000',
    warningLight: '#000000',
    darkBlue: 'rgba(0,0,0,.6)',
    mainBackground: '#fafafa',
    mainLinks: 'rgba(0,0,0,.6)',
    attentionColor: '#2fa3f1',
    linkColor: '#2fa3f1',
    purple: 'rgba(0,0,0,.6)',
    btnColor: '#000000',
    tagColor: 'rgba(0,0,0,.6)',
  },
  fontFace: `@font-face {
    font-family: 'Roboto-Regular';
    src: 
      url(${RobotoRegularEOT}?#iefix) format('embedded-opentype'),
      url(${RobotoRegularWOFF}) format('woff'),
      url(${RobotoRegularTTF}) format('truetype');
    font-style: normal;
  }`,
  headerHeight: 150,
  customSubHeaderConfig: CustomSubHeaderConfig
};
