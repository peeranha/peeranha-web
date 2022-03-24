import React from 'react';
import PropTypes from 'prop-types';

import TelosStyleTopNav from './CustomSubHeaderContainers/TelosStyleTopNav';
import PolygonStyleTopNav from './CustomSubHeaderContainers/PolygonStyleTopNav';
import LogoRightMenuRight from './CustomSubHeaderContainers/LogoRightMenuRight';
import BloggerStyleSubHeader from './CustomSubHeaderContainers/BloggerStyleSubHeader';

const CUSTOM_SUB_HEADER_CONTAINER = {
  telos_style: <TelosStyleTopNav />,
  polygonStyle: <PolygonStyleTopNav/>,
  logo_right__menu_right: <LogoRightMenuRight />,
  blogger_style: <BloggerStyleSubHeader />,
};

const CustomSubHeaderContainer = ({ design }) =>
  CUSTOM_SUB_HEADER_CONTAINER[design]
    ? CUSTOM_SUB_HEADER_CONTAINER[design]
    : '';

CustomSubHeaderContainer.propTypes = {
  design: PropTypes.string.isRequired,
};

export default CustomSubHeaderContainer;
