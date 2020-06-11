import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { translationMessages } from 'i18n';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';

import messages from 'common-messages';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import { makeSelectFollowedCommunities } from 'containers/AccountProvider/selectors';

import {
  getFollowedCommunities,
  getUnfollowedCommunities,
  isSingleCommunityWebsite,
} from 'utils/communityManagement';

import Dropdown, { MenuStyled } from 'components/Dropdown/AllowedClickInside';
import { Select2 } from 'components/FormFields/SelectField';

import CustomOption from './CustomOption';
import Group from './Group';
import ManageMyCommunities from './ManageMyCommunities';

const single = isSingleCommunityWebsite();

const Wrapper = styled.div`
  ${MenuStyled} {
    box-shadow: none;
  }
`;

const CommunitySelector = ({
  input = {},
  Button,
  isArrowed,
  locale,
  communities,
  followedCommunities,
  showOnlyFollowed,
  selectedCommunityId,
  disabled,
  toggle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [optionsNumber, options] = useMemo(
    () => {
      // To form options array I need to get 2 groups: communities where I AM and NOT
      const followedFilteredCommunities = getFollowedCommunities(
        communities,
        followedCommunities || [],
      );

      const unfollowedFilteredCommunities = getUnfollowedCommunities(
        communities,
        followedCommunities || [],
      );

      let options = [];

      // My feed page
      if (followedCommunities && showOnlyFollowed) {
        options = [{ options: followedFilteredCommunities }];
      }

      // All questions page
      if (!showOnlyFollowed) {
        options = [
          { options: followedFilteredCommunities },
          { options: unfollowedFilteredCommunities },
        ];
      }

      // Default option - All communities - if it is not from form field
      if (!input.name) {
        options = [
          {
            options: [
              {
                label: translationMessages[locale][messages.allCommunities.id],
                value: 0,
              },
            ],
          },
          ...options,
        ];
      }

      return [
        followedCommunities && showOnlyFollowed
          ? followedFilteredCommunities.length
          : communities.length ?? null,
        options,
      ];
    },
    [communities],
  );

  const toggleOpen = useCallback(
    () => {
      if (optionsNumber > 0 && !single && !disabled) {
        setIsOpen(!isOpen);
      }
    },
    [disabled, isOpen, optionsNumber],
  );

  const onSelectChange = useCallback(
    x => {
      toggleOpen();

      // change redux-form value
      if (input.onChange) {
        input.onChange(x);
      }

      // additional action
      if (toggle) {
        toggle(x.value);
      }
    },
    [toggleOpen, input, toggle],
  );

  const selectedValue = getFollowedCommunities(communities, [
    selectedCommunityId,
  ])[0];

  const isItArrowed = useMemo(() => optionsNumber > 0 && !single && isArrowed, [
    optionsNumber,
    isArrowed,
  ]);

  return (
    <Dropdown
      isCommunitySelector
      isArrowed={isItArrowed}
      isOpen={isOpen}
      toggle={toggleOpen}
      target={
        <Button
          communityAvatar={selectedValue?.avatar}
          communityLabel={selectedValue?.label}
        />
      }
    >
      <Wrapper>
        <Select2
          input={{
            ...input,
            optionsNumber,
            selectedValue,
            onChange: onSelectChange,
            onBlur: null,
            value: null,
          }}
          options={options}
          disabled={disabled}
          Group={Group}
          CustomOption={CustomOption}
          autoFocus
          menuIsOpen
          isWrapped
        />
        <ManageMyCommunities/>
      </Wrapper>
    </Dropdown>
  );
};

CommunitySelector.propTypes = {
  Button: PropTypes.any,
  toggle: PropTypes.func,
  disabled: PropTypes.bool,
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
  communities: selectCommunities(),
  followedCommunities: makeSelectFollowedCommunities(),
});

export default connect(
  mapStateToProps,
  null,
)(CommunitySelector);
