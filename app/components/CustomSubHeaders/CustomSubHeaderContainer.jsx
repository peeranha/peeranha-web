import React from 'react';
import PropTypes from 'prop-types';

import TelosStyleTopNav from './CustomSubHeaderContainers/TelosStyleTopNav';
import LogoRightMenuRight from './CustomSubHeaderContainers/LogoRightMenuRight';

const CUSTOM_SUB_HEADER_CONTAINER = {
  telos_style: <TelosStyleTopNav />,
  logo_right__menu_right: <LogoRightMenuRight />,
};

const CustomSubHeaderContainer = ({ design }) => {
  return CUSTOM_SUB_HEADER_CONTAINER[design]
    ? CUSTOM_SUB_HEADER_CONTAINER[design]
    : '';
};

CustomSubHeaderContainer.propTypes = {
  design: PropTypes.string.isRequired,
};

export default CustomSubHeaderContainer;
