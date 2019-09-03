import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { TEXT_PRIMARY, BORDER_SECONDARY } from 'style-constants';

import * as routes from 'routes-config';
import commonMessages from 'common-messages';

import moreVotingIcon from 'images/moreVoting.svg?inline';

import Img from 'components/Img';
import Span from 'components/Span';
import P from 'components/P';
import A from 'components/A';

import VoteUpButton from 'containers/VoteForNewCommunityButton/VoteUpButton';
import VoteDownButton from 'containers/VoteForNewCommunityButton/VoteDownButton';

import messages from './messages';

const Item = styled.div`
  word-break: break-word;
  border-bottom: 1px solid ${BORDER_SECONDARY};
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const Header = Span.extend`
  word-break: break-word;
`.withComponent('header');

const Aside = /* istanbul ignore next */ ({ suggestedCommunities }) => (
  <div>
    <Header className="mb-4" fontSize="24" bold>
      <FormattedMessage {...messages.voteForNewCommunities} />
    </Header>

    {suggestedCommunities.slice(0, 3).map(x => (
      <Item key={x.id}>
        <div className="d-flex align-items-center mb-2">
          <Img className="mr-1" src={x.avatar} alt="commAvatar" />
          <Span bold>{x.name}</Span>
        </div>
        <P className="mb-3" fontSize="14">
          {x.description}
        </P>
        <div className="d-flex justify-content-between">
          <VoteUpButton
            className="mr-2"
            id={`voteup_${x.id}`}
            communityId={x.id}
          />
          <VoteDownButton id={`downvote_${x.id}`} communityId={x.id} />
        </div>
      </Item>
    ))}

    <footer>
      <A
        className="d-flex align-items-center"
        to={routes.suggestedCommunities()}
        href={routes.suggestedCommunities()}
      >
        <img className="mr-2" src={moreVotingIcon} alt="moreVotingIcon" />
        <Span color={TEXT_PRIMARY}>
          <FormattedMessage {...commonMessages.moreVoting} />
        </Span>
      </A>
    </footer>
  </div>
);

Aside.propTypes = {
  suggestedCommunities: PropTypes.array,
};

export { Item, Header };
export default React.memo(Aside);
