import React from 'react';

import PropTypes from 'prop-types';
import Icon from './index';

const IconSm = ({ icon, color, fill, rotate, className }) => (
  <Icon
    width="14"
    icon={icon}
    color={color}
    fill={fill}
    rotate={rotate}
    className={className}
  />
);
const IconXm = ({ icon, color, fill, rotate, className }) => (
  <Icon
    width="15"
    icon={icon}
    color={color}
    fill={fill}
    rotate={rotate}
    className={className}
  />
);
const IconMd = ({ icon, color, fill, rotate, className }) => (
  <Icon
    width="18"
    icon={icon}
    color={color}
    fill={fill}
    rotate={rotate}
    className={className}
  />
);
const IconEm = ({ icon, color, fill, rotate, className }) => (
  <Icon
    width="19"
    icon={icon}
    color={color}
    fill={fill}
    rotate={rotate}
    className={className}
  />
);
const IconLm = ({ icon, color, fill, rotate, className }) => (
  <Icon
    width="20"
    icon={icon}
    color={color}
    fill={fill}
    rotate={rotate}
    className={className}
  />
);
const IconLg = ({ icon, color, fill, rotate, className }) => (
  <Icon
    width="24"
    icon={icon}
    color={color}
    fill={fill}
    rotate={rotate}
    className={className}
  />
);

IconSm.propTypes = {
  icon: PropTypes.string.isRequired,
  rotate: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  fill: PropTypes.string,
};

IconXm.propTypes = {
  icon: PropTypes.string.isRequired,
  rotate: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  fill: PropTypes.string,
};

IconMd.propTypes = {
  icon: PropTypes.string.isRequired,
  rotate: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  fill: PropTypes.string,
};

IconEm.propTypes = {
  icon: PropTypes.string.isRequired,
  rotate: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  fill: PropTypes.string,
};

IconLm.propTypes = {
  icon: PropTypes.string.isRequired,
  rotate: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  fill: PropTypes.string,
};

IconLg.propTypes = {
  icon: PropTypes.string.isRequired,
  rotate: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  fill: PropTypes.string,
};

export { IconSm, IconXm, IconMd, IconEm, IconLm, IconLg };
