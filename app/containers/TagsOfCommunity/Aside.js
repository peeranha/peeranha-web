import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { TEXT_PRIMARY } from 'style-constants';

import * as routes from 'routes-config';
import commonMessages from 'common-messages';

import moreVotingIcon from 'images/moreVoting.svg';

import Span from 'components/Span';
import P from 'components/P';
import A from 'components/A';

import VoteUpButton from 'containers/VoteForNewTagButton/VoteUpButton';
import VoteDownButton from 'containers/VoteForNewTagButton/VoteDownButton';

import { Header, Item } from 'components/ExistingCommunities/Aside';

import messages from './messages';

const suggestTagRoute = routes.suggestedTags();

const Aside = /* istanbul ignore next */ ({ suggestedTags, communityId }) => (
  <div>
    <Header className="mb-4" fontSize="24" bold>
      <FormattedMessage {...messages.voteForNewTags} />
    </Header>

    {suggestedTags.slice(0, 3).map(x => (
      <Item key={x.id}>
        <div className="d-flex align-items-center mb-2">
          <A to={suggestTagRoute} href={suggestTagRoute} bold>
            {x.name}
          </A>
        </div>

        <P className="mb-3" fontSize="14">
          {x.description}
        </P>

        <div className="d-flex justify-content-between">
          <VoteUpButton
            className="mr-2"
            id={`voteup_${x.id}`}
            communityId={communityId}
            tagId={x.id}
          />

          <VoteDownButton
            id={`downvote_${x.id}`}
            communityId={communityId}
            tagId={x.id}
          />
        </div>
      </Item>
    ))}

    <footer>
      <A
        className="d-flex align-items-center"
        to={suggestTagRoute}
        href={suggestTagRoute}
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
  suggestedTags: PropTypes.array,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default React.memo(Aside);
