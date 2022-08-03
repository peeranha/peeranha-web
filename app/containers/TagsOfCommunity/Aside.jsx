import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TEXT_PRIMARY } from 'style-constants';

import * as routes from 'routes-config';

import moreVotingIcon from 'images/moreVoting.svg?external';

import Span from 'components/Span';
import P from 'components/P';
import A from 'components/A';

import VoteUpButton from 'containers/VoteForNewTagButton/VoteUpButton';
import VoteDownButton from 'containers/VoteForNewTagButton/VoteDownButton';
import { IconMd } from 'components/Icon/IconWithSizes';
import { Header, Item } from 'components/ExistingCommunities/Aside';

const Aside = ({ suggestedTags, communityId }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Header className="mb-4" fontSize="24" bold>
        {t('tags.voteForNewTags')}
      </Header>

      {suggestedTags.slice(0, 3).map(x => (
        <Item key={x.id}>
          <div className="d-flex align-items-center mb-2">
            <A
              to={routes.suggestedTags(communityId)}
              href={routes.suggestedTags(communityId)}
              bold
            >
              {x.name}
            </A>
          </div>

          <P className="mb-3" fontSize="14">
            {x.description}
          </P>

          <div>
            <VoteUpButton
              className="mr-2"
              communityId={communityId}
              tagId={x.id}
            />

            <VoteDownButton communityId={communityId} tagId={x.id} />
          </div>
        </Item>
      ))}

      <footer>
        <A
          className="d-flex align-items-center"
          to={routes.suggestedTags(communityId)}
          href={routes.suggestedTags(communityId)}
        >
          <IconMd
            className="mr-2"
            icon={moreVotingIcon}
            fill={TEXT_PRIMARY}
            isColorImportant={true}
          />
          <Span color={TEXT_PRIMARY}>{t('common.moreVoting')}</Span>
        </A>
      </footer>
    </div>
  );
};

Aside.propTypes = {
  suggestedTags: PropTypes.array,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default React.memo(Aside);
