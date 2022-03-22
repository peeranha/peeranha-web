import React from 'react';
import PropTypes from 'prop-types';

import TelosStyleTopNav from './CustomSubHeaderContainers/TelosStyleTopNav';
import LogoRightMenuRight from './CustomSubHeaderContainers/LogoRightMenuRight';
import BloggerStyleSubHeader from './CustomSubHeaderContainers/BloggerStyleSubHeader';
import FilecoinStyleSubHeader from './CustomSubHeaderContainers/FilecoinStyleSubHeader';

const CUSTOM_SUB_HEADER_CONTAINER = {
  telos_style: <TelosStyleTopNav />,
  logo_right__menu_right: <LogoRightMenuRight />,
  blogger_style: <BloggerStyleSubHeader />,
  filecoin_style: <FilecoinStyleSubHeader />,
};

const CustomSubHeaderContainer = ({ design }) =>
  CUSTOM_SUB_HEADER_CONTAINER[design]
    ? CUSTOM_SUB_HEADER_CONTAINER[design]
    : '';

CustomSubHeaderContainer.propTypes = {
  design: PropTypes.string.isRequired,
};

export default CustomSubHeaderContainer;
