import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Communities from 'icons/Communities';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectFollowedCommunities } from 'containers/AccountProvider/selectors';
import {
  getFollowedCommunities,
  isSingleCommunityWebsite,
} from 'utils/communityManagement';

import Dropdown from 'components/common/Dropdown';

import ManageMyCommunities from './ManageMyCommunities';

const single = isSingleCommunityWebsite();

const CommunitySelector = ({
  Button,
  input = {},
  locale,
  communities = [],
  followedCommunities,
  showOnlyFollowed,
  toggle,
  isArrowed,
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState();

  useEffect(() => {
    if (input.onChange) {
      input.onChange(communities.find((comminity) => comminity.id === value));
    }
  }, [value]);

  const options = useMemo(() => {
    const followedFilteredCommunities = getFollowedCommunities(
      communities,
      followedCommunities || [],
    );
    let options = [];

    // My feed page
    if (followedCommunities && showOnlyFollowed) {
      options = followedFilteredCommunities;
    }

    // All questions page
    if (!showOnlyFollowed) {
      options = communities;
    }

    options = options.map((community) => ({
      label: community.label,
      value: community.id,
      icon: <img width={'24px'} src={community.avatar} alt={'avatar'} />,
    }));

    // Default option - All communities - if it is not from form field
    if (!input.name) {
      options = [
        {
          label: t('common.allCommunities'),
          value: 0,
          icon: <Communities />,
        },
        ...options,
      ];
    }

    options.push({
      label: t('common.selectCommunity'),
      value: options.length + 1,
      render: <ManageMyCommunities />,
    });

    return options;
  }, [communities]);

  const onSelect = (value) => {
    if (value !== options.length) {
      setValue(value);
      if (toggle) {
        toggle(value);
      }
    }
  };

  return (
    <Dropdown
      options={!single ? options : []}
      value={value}
      placeholder={t('common.selectCommunity')}
      onSelect={onSelect}
      isSearchable={!single}
      className="z-8"
      triggerClassName="full-width"
      isArrowed={!single ? isArrowed : false}
      trigger={
        <Button
          communityAvatar={
            communities.find((comminity) => comminity.id === value)?.avatar
          }
          communityLabel={
            communities.find((comminity) => comminity.id === value)?.name
          }
          placeholder={t('common.selectCommunity')}
        />
      }
      zIndex={'6'}
    />
  );
};

CommunitySelector.propTypes = {
  input: PropTypes.object,
  isArrowed: PropTypes.bool,
  showOnlyFollowed: PropTypes.bool,
  locale: PropTypes.string,
  communities: PropTypes.array,
  followedCommunities: PropTypes.array,
  selectedCommunityId: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  followedCommunities: makeSelectFollowedCommunities(),
});

export default connect(mapStateToProps, null)(CommunitySelector);
