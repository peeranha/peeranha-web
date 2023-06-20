import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TEXT_PRIMARY } from 'style-constants';

import globe from 'images/globe-outline-16.svg?external';
import Icon from 'components/Icon';

import { ADefault } from 'components/A';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

const SiteIcon = styled(Icon)`
  display: flex;
  align-items: center;
  margin-right: 4px;
  .globeStroke {
    stroke: ${colors.linkColor || TEXT_PRIMARY};
  }
`;

const SiteText = styled.span`
  max-width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 16px;
  font-size: 14px;
`;

const SiteLink = styled(ADefault)`
  display: inline-flex;
  align-items: center;
  color: ${colors.linkColor || TEXT_PRIMARY};
  margin-top: 4px;
`;

const getShortUrl = (url) => {
  if (/^https?:\/\//.test(url)) return url.replace(/https?:\/\//, '');
  return url;
};

const getFullUrl = (url) => {
  if (/^https?:\/\//.test(url)) return url;
  return `https://${url}`;
};

const OfficialSiteLink = ({ website }) => (
  <SiteLink href={getFullUrl(website)} target="_blank" rel="noopener noreferrer">
    <SiteIcon icon={globe} width="12" height="12" />
    <SiteText>{getShortUrl(website)}</SiteText>
  </SiteLink>
);

OfficialSiteLink.propTypes = {
  website: PropTypes.string,
};

export default OfficialSiteLink;
