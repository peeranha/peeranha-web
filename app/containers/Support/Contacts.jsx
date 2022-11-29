import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';
import { getLinks } from 'media-links';
import { TEXT_PRIMARY } from 'style-constants';

import mediumIcon from 'images/mediumsupport.svg?inline';
import twitterIcon from 'images/twittersupport.svg?inline';
import linkedinIcon from 'images/linkedinsupport.svg?inline';
import githubIcon from 'images/guthubsupport.svg?inline';
import facebookIcon from 'images/facebook.svg?inline';
import emailIcon from 'images/ico_email_new.svg?inline';
import telegramIcon from 'images/telegramOfficialBlue.svg?inline';
import discordIcon from 'images/discord-icon.svg?inline';

import Span from 'components/Span';
import H3 from 'components/H3';
import Base from 'components/Base/BaseRounded';
import Wrapper from 'components/Header/Simple';

import { CONTACTS_ID } from './constants';

const MediaItem = Base.extend`
  display: ${(x) => (x.href ? 'flex' : 'none')};
  flex-direction: column;
  flex-grow: 0;
  align-items: center;
  justify-content: center;
  padding: 20px;
  white-space: nowrap;

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    margin-bottom: 5px;
  }

  @media only screen and (max-width: 379px) {
    &:last-of-type {
      span {
        font-size: 14px;
      }
    }
  }
`.withComponent('a');

const MediaList = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 15px;

  @media only screen and (max-width: 1279px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media only screen and (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Contacts = ({ locale }) => (
  <div id={CONTACTS_ID}>
    <Wrapper className="mb-to-sm-0 mb-from-sm-3">
      <H3>
        <FormattedMessage id={commonMessages.contacts.id} />
      </H3>
    </Wrapper>

    <MediaList>
      <MediaItem href={getLinks(locale).twitter} target="_blank">
        <img src={twitterIcon} alt="twitter" />
        <Span bold>Twitter</Span>
      </MediaItem>

      <MediaItem href={getLinks(locale).github} target="_blank">
        <img src={githubIcon} alt="github" />
        <Span bold>Github</Span>
      </MediaItem>

      <MediaItem href={getLinks(locale).linkedin} target="_blank">
        <img src={linkedinIcon} alt="linkedin" />
        <Span bold>Linkedin</Span>
      </MediaItem>

      <MediaItem href={getLinks(locale).medium} target="_blank">
        <img src={mediumIcon} alt="medium" />
        <Span bold>Medium</Span>
      </MediaItem>

      <MediaItem href={getLinks(locale).telegram} target="_blank">
        <img src={telegramIcon} alt="telegram" />
        <Span bold>Telegram</Span>
      </MediaItem>

      <MediaItem href={getLinks(locale).email}>
        <img src={emailIcon} alt="email" />
        <Span bold>E-mail</Span>
      </MediaItem>

      <MediaItem href={getLinks(locale).discord} target="_blank">
        <img src={discordIcon} alt="discord" />
        <Span bold>Discord</Span>
      </MediaItem>
    </MediaList>
  </div>
);

Contacts.propTypes = {
  locale: PropTypes.string,
};

export default React.memo(Contacts);
