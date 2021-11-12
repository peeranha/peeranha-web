import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import orderBy from 'lodash/orderBy';

import { TEXT_SECONDARY } from 'style-constants';

import Span from 'components/Span';
import { Header } from 'components/ExistingCommunities/Aside';
import { Tag } from 'components/TagsList';

import messages from './messages';

const Aside = ({ currentCommunity }) => (
  <div>
    <Header className="mb-4" fontSize="24" bold>
      <FormattedMessage {...messages.topTagsInCommunity} />
    </Header>

    <ul>
      {orderBy(currentCommunity.tags, y => y.postCount, ['desc'])
        .slice(0, 10)
        .map(x => (
          <li key={x.id}>
            <div className="d-flex align-items-center mb-3">
              <Tag>{x.name}</Tag>

              <Span fontSize="14" color={TEXT_SECONDARY}>
                <span>x </span>
                <span>{`${x.postCount}`}</span>
              </Span>
            </div>
          </li>
        ))}
    </ul>
  </div>
);

Aside.propTypes = {
  currentCommunity: PropTypes.object,
};

export default React.memo(Aside);
