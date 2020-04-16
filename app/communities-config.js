import React from 'react';
import OntLogo from 'images/communities-logos/ont.svg?inline';
import TelosLogo from 'images/communities-logos/telos.png';
import coinsBlueIcon from 'images/coinsBlue.svg?inline';

import TelosSubHeader from './components/CustomSubHeaders/TelosSubHeader';
import TelosMobileSubHeader from './components/CustomSubHeaders/TelosMobileSubHeader';

const styles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  poweredByPeeranha: true,
  withoutAdditionalLinks: true,
  coinsIcon: coinsBlueIcon,
  leftMenuLogo: TelosLogo,
  mobileSubHeader: <TelosMobileSubHeader />,
  customSubHeader: <TelosSubHeader />,
  fonts: {
    main: 'Neue Haas Grotesk Display Pro Light',
    questionItemTitle: 'Neue Haas Grotesk Display Pro Medium',
    h3: 'Neue Haas Grotesk Display Pro Medium',
    h3LetterSpacing: '1px',
  },
  colors: {
    blue: '#5D6DFE',
    black: '#02003D',
    warningLight: '#FF4026',
    darkBlue: '#4452C5',
    mainBackground: '#DFDFEC',
    mainLinks: '#5463E8',
  },
};

const communitiesConfig = {
  prod: {
    2: {
      origin: 'https://telos.peeranha.io',
      src: TelosLogo,
      styles,
    },
    3: {
      origin: 'https://ont.peeranha.io',
      src: OntLogo,
    },
  },
  test: {
    1: {
      origin: 'https://blockchain-test.peeranha.io',
      src: TelosLogo,
      styles,
    },
  },
  dev: {
    1: {
      origin: 'http://localhost:3000',
      src: TelosLogo,
      styles,
    },
  },
};

export default communitiesConfig[process.env.ENV];
