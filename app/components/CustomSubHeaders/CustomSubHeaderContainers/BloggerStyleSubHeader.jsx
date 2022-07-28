import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { getSingleCommunityDetails } from 'utils/communityManagement';

import facebookIcon from 'images/logo-facebook.svg?inline';
import instagramIcon from 'images/logo-instagram.svg?inline';
import youtubeIcon from 'images/logo-youtube.svg?inline';
import pinterestIcon from 'images/logo-pinterest.svg?inline';
import vkIcon from 'images/logo-vk.svg?inline';

const SOCIAL_MEDIA_ICONS = {
  facebook: facebookIcon,
  instagram: instagramIcon,
  youtube: youtubeIcon,
  pinterest: pinterestIcon,
  vk: vkIcon,
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
  const { t } = useTranslation();
  const community = getSingleCommunityDetails();
  const { socialNetworks = {} } = community;
  const hasSocialNetworks = Object.values(socialNetworks).some(link => !!link);

  return (
    <Container>
      {hasSocialNetworks ? (
        <SubHeaderNav>
          {t('common.followSocialMedia')}
          {Object.keys(socialNetworks)
            .filter(key => socialNetworks[key])
            .map(key => (
              <a href={socialNetworks[key]} key={key}>
                <img src={SOCIAL_MEDIA_ICONS[key]} alt={key} />
              </a>
            ))}
        </SubHeaderNav>
      ) : null}
    </Container>
  );
};

export default BloggerStyleSubHeader;
