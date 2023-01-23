import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import orderBy from 'lodash/orderBy';

import { TEXT_SECONDARY } from 'style-constants';

import Span from 'components/Span';
import { Header } from 'components/ExistingCommunities/Aside';
import { Tag } from 'components/TagsList';

const Aside = ({ currentCommunity }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Header className="mb-4" fontSize="24" bold>
        {t('tags.suggested.topTagsInCommunity')}
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
};

Aside.propTypes = {
  currentCommunity: PropTypes.object,
};

export default React.memo(Aside);
