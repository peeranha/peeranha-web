import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { TEXT_SECONDARY } from 'style-constants';

import Span from 'components/Span';
import { Header } from 'components/ExistingCommunities/Aside';
import { Tag } from 'components/TagsList';

import messages from './messages';

const Aside = ({ existingTags }) => (
  <div>
    <Header className="mb-4" fontSize="24" bold>
      <FormattedMessage {...messages.topTagsInCommunity} />
    </Header>

    <ul>
      {existingTags.slice(0, 10).map(x => (
        <li key={x.id}>
          <div className="d-flex align-items-center mb-3">
            <Tag>{x.name}</Tag>

            <Span fontSize="14" color={TEXT_SECONDARY}>
              <span>x </span>
              <span>{x.popularity}</span>
            </Span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

Aside.propTypes = {
  existingTags: PropTypes.array,
};

export default React.memo(Aside);
