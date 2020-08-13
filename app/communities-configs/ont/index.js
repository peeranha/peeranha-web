import React from 'react';

import coinsBlueIcon from 'images/coinsBlack.svg?external';
import OntLogo from './images/ont.svg?inline';
import favicon from '!file-loader?name=[name].[ext]!images/favicon-ont.ico';

import RobotoRegularEOT from './fonts/Roboto-Regular.eot';
import RobotoRegularWOFF from './fonts/Roboto-Regular.woff';
import RobotoRegularTTF from './fonts/Roboto-Regular.ttf';

import CustomSubHeader from 'components/CustomSubHeaders/CustomSubHeader';
import CustomMobileSubHeader from 'components/CustomSubHeaders/CustomMobileSubHeader';

const domainName = 'https://ont.io/';

export const CustomSubHeaderConfig = {
  design: 'logo_right__menu_right',
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
      
    `,
    subitems: `
      @media only screen and (max-width: 991px) {
        a {
          padding: 0 0 0 30px  !important;
        }
      }
    `,
    subHeaderItem: `
      position: relative;

      font-size: 13px;
      font-weight: bold;

      > div {
        font-weight: normal;
      }

      @media only screen and (max-width: 991px) {
        padding: 10px 0 10px 15px !important;
      }

      @media only screen and (min-width: 992px) {
        padding: 0;
        margin-left: 30px;

        :first-child {
          margin-left: 0;
        }
      }        
    `,
    CustomSubHeader: `
      
    `,
    Highlighted: `
      color: #48a3ff !important;
    `,
  },
  links: [
    {
      text: 'HOME',
      href: domainName,
    },
    {
      text: 'ABOUT',
      subitems: [
        {
          text: 'About us',
          href: `${domainName}about`,
        },
        {
          text: 'Join us',
          href: `${domainName}join`,
        },
        {
          text: 'Contact us',
          href: 'mailto:contact@ont.io',
        },
        {
          text: 'Branding',
          href: `${domainName}branding`,
        },
      ],
    },
    {
      text: 'NEWS',
      href: 'https://medium.com/ontologynetwork',
    },
    {
      text: 'SOLUTIONS',
      subitems: [
        {
          text: 'Automotive Solutions',
          href: `${domainName}automotive`,
        },
        {
          text: 'Data Marketplace',
          href: `${domainName}marketplace`,
        },
        {
          text: 'Data Attestation',
          href: `${domainName}attestation`,
        },
        {
          text: 'Digital Finance',
          href: `${domainName}finance`,
        },
      ],
    },
    {
      text: 'DECENTRALIZATION',
      subitems: [
        {
          text: 'ONT',
          href: 'https://app.flipsidecrypto.com/cooperative/ontology',
        },
        {
          text: 'ONG',
          href: 'https://app.flipsidecrypto.com/cooperative/ontologygas',
        },
        {
          text: 'Nodes',
          href: 'https://node.ont.io/',
        },
        {
          text: 'Explorer',
          href: 'https://explorer.ont.io/',
        },
        {
          text: 'GCC Program',
          href:
            'https://medium.com/ontologynetwork/ontology-gcc-global-community-contributor-program-is-coming-e4be768f17e3',
        },
        {
          text: 'Community',
          href: `${domainName}community`,
        },
      ],
    },
    {
      text: 'DEVELOPERS',
      subitems: [
        {
          text: 'Developer Center',
          href: 'https://developer.ont.io/',
        },
        {
          text: 'Bounty Program',
          href: 'https://bounty.ont.io/#/home',
        },
        {
          text: 'Global University Workshop',
          href: `${domainName}guw`,
        },
      ],
    },
    {
      text: 'GET ONT & ONG',
      href: `${domainName}get`,
      isHighlighted: true,
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
    linkColorSecondary: 'rgba(0,0,0,.6)',
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
  headerHeight: 170,
  isDropdownMenuArrow: false,
  customSubHeaderConfig: CustomSubHeaderConfig,
  domainName: domainName,
};
