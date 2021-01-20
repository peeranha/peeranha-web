import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { singleCommunityStyles } from 'utils/communityManagement';

import messages from 'common-messages';

import facebookIcon from 'images/logo-facebook.svg?inline';
import instagramIcon from 'images/logo-instagram.svg?inline';
import youtubeIcon from 'images/logo-youtube.svg?inline';
import pinterestIcon from 'images/logo-pinterest.svg?inline';

const SOCIAL_MEDIA_ICONS = {
  facebook: facebookIcon,
  instagram: instagramIcon,
  youtube: youtubeIcon,
  pinterest: pinterestIcon,
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 120px;
`;

const SubHeaderNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 7px 0;
  letter-spacing: normal;
  text-align: center;

  > span {
    width: 100%;
    margin-bottom: 5px;
  }

  > a {
    margin: 0 10px;
  }
`;

const BloggerStyleSubHeader = () => {
  const { links } = singleCommunityStyles().customSubHeaderConfig;

  return (
    <Container>
      {!!links && (
        <SubHeaderNav>
          <FormattedMessage {...messages.followSocialMedia} />
          {Object.keys(links).map(key => (
            <a href={links[key]} key={key}>
              <img src={SOCIAL_MEDIA_ICONS[key]} alt={key} />
            </a>
          ))}
        </SubHeaderNav>
      )}
    </Container>
  );
};

export default BloggerStyleSubHeader;
