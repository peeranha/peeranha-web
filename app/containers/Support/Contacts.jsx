import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';
import { getLinks } from 'media-links';
import { TEXT_PRIMARY } from 'style-constants';

import MediumSupportIcon from 'icons/MediumSupport';
import TwitterIcon from 'icons/Twitter';
import GithubSupportIcon from 'icons/GithubSupport';
import LinkedinIcon from 'icons/Linkedin';
import EmailIcon from 'icons/Email';
import TelegramIcon from 'icons/Telegram';

import Span from 'components/Span';
import H3 from 'components/H3';
import Base from 'components/Base/BaseRounded';
import Wrapper from 'components/Header/Simple';

import { CONTACTS_ID } from './constants';

const MediaItem = Base.extend`
  display: ${x => (x.href ? 'flex' : 'none')};
  flex-direction: column;
  flex-grow: 0;
  align-items: center;
  justify-content: center;
  padding: 20px;
  white-space: nowrap;

  svg {
    width: 25px;
    height: 25px;
    object-fit: contain;
    margin-bottom: 5px;
  }

  &:last-of-type {
    padding: 20px 15px;
    img {
      height: 15px;
    }
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
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 15px;

  @media only screen and (max-width: 1279px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const EmailSpan = Span.extend`
  color: ${TEXT_PRIMARY};
`;

const Contacts = ({ locale }) => (
  <div id={CONTACTS_ID}>
    <Wrapper className="mb-to-sm-0 mb-from-sm-3">
      <H3>
        <FormattedMessage {...commonMessages.contacts} />
      </H3>
    </Wrapper>

    <MediaList>
      <MediaItem href={getLinks(locale).twitter} target="_blank">
        <TwitterIcon fill="#05ADEE" />
        <Span bold>Twitter</Span>
      </MediaItem>

      <MediaItem href={getLinks(locale).github} target="_blank">
        <GithubSupportIcon fill="#435761" size={[35, 35]} />
        <Span bold>Github</Span>
      </MediaItem>

      <MediaItem href={getLinks(locale).linkedin} target="_blank">
        <LinkedinIcon fill="#0277B5" size={[29, 29]} />
        <Span bold>Linkedin</Span>
      </MediaItem>

      <MediaItem href={getLinks(locale).medium} target="_blank">
        <MediumSupportIcon fill="#313131" />
        <Span bold>Medium</Span>
      </MediaItem>

      <MediaItem href={getLinks(locale).telegram} target="_blank">
        <TelegramIcon fill="#32afed" />
        <Span bold>Telegram</Span>
      </MediaItem>

      <MediaItem href={getLinks(locale).email}>
        <EmailIcon stroke="#576FED" />
        <EmailSpan>hello@peeranha.io</EmailSpan>
      </MediaItem>
    </MediaList>
  </div>
);

Contacts.propTypes = {
  locale: PropTypes.string,
};

export default React.memo(Contacts);
