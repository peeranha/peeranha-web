import React from 'react';

import CustomSubHeader from 'components/CustomSubHeaders/CustomSubHeader';
import CustomMobileSubHeader from 'components/CustomSubHeaders/CustomMobileSubHeader';

import bannerImage from './images/create-and-go.png';
import logo from './images/create-and-go-logo.png';

export const CustomSubHeaderConfig = {
  design: 'blogger_style',
  styles: {
    bg: {
      header: '#305d6e',
      burgerHeader: '#ffffff',
    },
  },
  links: {
    facebook: '',
    instagram: '',
    youtube: '',
    pinterest: ''
  },
  banner: bannerImage,
  logo: logo,
  name: 'Create and Go',
  description: <p>Be positive & helpful to other viewers.<br />Be respectful to moderators.<br />Do not self promote!<br />Do not ask to play with Ninja.<br />Do not ask Ninja to play with other streamers.<br />Do not disrespect other streamers or create drama between streamers.<br />Do not ask Ninja to play a clip, song, or game.<br />Jokes about mental disorders will result in a ban.<br />Racism or discrimination will result in a ban.<br />English only.<br />Avoid religious & political discussions.<br />No trading or selling of online accounts or currency.</p>,
  questionsAmount: 345,
  followersAmount: 568,
};

export const BloggerStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  poweredByPeeranha: true,
  withoutAdditionalLinks: true,
  signUpPageLogo: logo,
  mobileSubHeader: (
    <CustomMobileSubHeader config={CustomSubHeaderConfig} logo={logo} />
  ),
  customSubHeader: <CustomSubHeader config={CustomSubHeaderConfig} />,
  withoutFAQ: true,
  headerHeight: 190,
  customSubHeaderConfig: CustomSubHeaderConfig,
};
