import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';
import { getLinks } from 'media-links';
import { TEXT_PRIMARY } from 'style-constants';
import * as routes from 'routes-config';

import mediumIcon from 'images/mediumsupport.svg?inline';
import twitterIcon from 'images/twittersupport.svg?inline';
import linkedinIcon from 'images/linkedinsupport.svg?inline';
import githubIcon from 'images/guthubsupport.svg?inline';
import facebookIcon from 'images/facebook.svg?inline';
import calendarIcon from 'images/calendar.svg?inline';

import Span from 'components/Span';
import H3 from 'components/H3';
import Base from 'components/Base/BaseRounded';
import Wrapper from 'components/Header/Simple';

import { CONTACTS_ID, FORM_ID } from './constants';

const MediaItem = Base.extend`
  display: ${x => (x.href ? 'flex' : 'none')};
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 25px;
    height: 25px;
    object-fit: contain;
    margin-bottom: 5px;
  }
`.withComponent('a');

const MediaList = styled.div`
  display: flex;

  ${MediaItem} :not(:last-child) {
    margin-right: 15px;
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;

    ${MediaItem} :not(:last-child) {
      margin-right: 0px;
      margin-bottom: 15px;
    }
  }
`;

const Contacts = ({ locale }) => (
  <div id={CONTACTS_ID}>
    <Wrapper className="mb-to-sm-0 mb-from-sm-3">
      <H3>
        <FormattedMessage {...commonMessages.contacts} />
      </H3>
    </Wrapper>

    <MediaList>
      <MediaItem href={getLinks(locale).facebook} target="_blank">
        <img src={facebookIcon} alt="facebook" />
        <Span bold>Facebook</Span>
      </MediaItem>

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

      <MediaItem href={routes.support(FORM_ID)}>
        <img src={calendarIcon} alt="calendar" />
        <Span color={TEXT_PRIMARY}>Support</Span>
      </MediaItem>
    </MediaList>
  </div>
);

Contacts.propTypes = {
  locale: PropTypes.string,
};

export default React.memo(Contacts);
