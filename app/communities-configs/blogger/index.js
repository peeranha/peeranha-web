import React from 'react';

import CustomSubHeader from 'components/CustomSubHeaders/CustomSubHeader';
import CustomMobileSubHeader from 'components/CustomSubHeaders/CustomMobileSubHeader';

import bannerImage from './images/ivan-chai.jpg';

export const CustomSubHeaderConfig = {
  design: 'blogger_style',
  styles: {
    bg: {
      header: '#305d6e',
      burgerHeader: '#ffffff',
    },
  },
  banner: bannerImage,
};

export const BloggerStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  poweredByPeeranha: true,
  withoutAdditionalLinks: true,
  mobileSubHeader: (
    <CustomMobileSubHeader config={CustomSubHeaderConfig} />
  ),
  customSubHeader: <CustomSubHeader config={CustomSubHeaderConfig} />,
  withoutFAQ: true,
  headerHeight: 190,
  customSubHeaderConfig: CustomSubHeaderConfig,
};
