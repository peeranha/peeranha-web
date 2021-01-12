import React from 'react';
import styled from 'styled-components';

import { singleCommunityStyles } from 'utils/communityManagement';

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
  background-image: url('${({ bg }) => bg}');
  background-size: cover;
  background-position: center;
  height: 120px;
`;

const SubHeaderNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 0;

  > a {
    margin: 0 10px;
  }
`;

const BloggerStyleSubHeader = () => {
  const { links, banner } = singleCommunityStyles().customSubHeaderConfig;

  return (
    <Container bg={banner}>
      <SubHeaderNav>
        {!!links &&
          Object.keys(links).map(key => (
            <a href={links[key]} key={key}>
              <img src={SOCIAL_MEDIA_ICONS[key]} alt={key} />
            </a>
          ))}
      </SubHeaderNav>
    </Container>
  );
};

export default BloggerStyleSubHeader;
