import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TEXT_PRIMARY } from 'style-constants';

import GlobeIcon from 'icons/Globe';

import { ADefault } from 'components/A';

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
  color: ${TEXT_PRIMARY};
  margin-top: 4px;
`;

const getShortUrl = url => {
  if (/^https?:\/\//.test(url)) return url.replace(/https?:\/\//, '');
  return url;
};

const getFullUrl = url => {
  if (/^https?:\/\//.test(url)) return url;
  return `https://${url}`;
};

const OfficialSiteLink = ({ website }) => (
  <SiteLink
    href={getFullUrl(website)}
    target="_blank"
    rel="noopener noreferrer"
  >
    <GlobeIcon size={[12, 12]} stroke={TEXT_PRIMARY} className="mr4" />
    <SiteText>{getShortUrl(website)}</SiteText>
  </SiteLink>
);

OfficialSiteLink.propTypes = {
  website: PropTypes.string,
};

export default OfficialSiteLink;
