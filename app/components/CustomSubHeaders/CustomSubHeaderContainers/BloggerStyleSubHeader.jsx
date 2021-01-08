import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import communitiesConfig from 'communities-config';

import {
  singleCommunityStyles,
} from 'utils/communityManagement';

import peeranhaLogo from 'images/LogoBlack.svg?inline';
// import facebookIcon from 'images/logo-facebook.svg?external';
// import instagramIcon from 'images/logo-instagram.svg?external';
// import youtubeIcon from 'images/logo-youtube.svg?external';
// import pinterestIcon from 'images/logo-pinterest.svg?external';
import facebookIcon from 'images/logo-facebook.svg?inline';
import instagramIcon from 'images/logo-instagram.svg?inline';
import youtubeIcon from 'images/logo-youtube.svg?inline';
import pinterestIcon from 'images/logo-pinterest.svg?inline';

// import { IconLg } from 'components/Icon/IconWithSizes';

const SOCIAL_MEDIA_ICONS = {
  facebook: facebookIcon,
  instagram: instagramIcon,
  youtube: youtubeIcon,
  pinterest: pinterestIcon,
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-image: url('${({ bg }) => bg}');
  background-size: contain;
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
        {!!links && Object.keys(links).map(key => (
          <a href={links[key]} key={key}>
            <img src={SOCIAL_MEDIA_ICONS[key]} alt={key} />
            {/* <IconLg icon={SOCIAL_MEDIA_ICONS[key]} />             */}
          </a>
        ))}
      </SubHeaderNav>
    </Container>
  );
};

export default BloggerStyleSubHeader;
