import React from 'react';
import PropTypes from 'prop-types';

const SocialMediaShareLink = ({ link, icon, altText }) => (
  <a href={link} target="_blank">
    <img src={icon} alt={altText || ''} />
  </a>
);

SocialMediaShareLink.propTypes = {
  link: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  altText: PropTypes.string,
};

export default React.memo(SocialMediaShareLink);
