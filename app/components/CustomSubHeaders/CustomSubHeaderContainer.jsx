import React from 'react';
import PropTypes from 'prop-types';

import PolygonStyleTopNav from './CustomSubHeaderContainers/PolygonStyleTopNav';
import LogoRightMenuRight from './CustomSubHeaderContainers/LogoRightMenuRight';
import FilecoinStyleSubHeader from './CustomSubHeaderContainers/FilecoinStyleSubHeader';

const CUSTOM_SUB_HEADER_CONTAINER = {
  polygonStyle: <PolygonStyleTopNav />,
  logo_right__menu_right: <LogoRightMenuRight />,
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
