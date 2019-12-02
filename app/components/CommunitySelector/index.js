import React from 'react';
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
} from 'utils/communityManagement';

import Dropdown, { MenuStyled } from 'components/Dropdown/AllowedClickInside';
import { Select2 } from 'components/FormFields/SelectField';

import CustomOption from './CustomOption';
import Group from './Group';
import ManageMyCommunities from './ManageMyCommunities';

const Wrapper = styled.div`
  ${MenuStyled} {
    box-shadow: none;
  }
`;

export class CommunitySelector extends React.PureComponent {
  state = { isOpen: false };

  toggleOpen = () => {
    if (!this.props.disabled) {
      this.setState(state => ({ isOpen: !state.isOpen }));
    }
  };

  onSelectChange = x => {
    const { input, toggle } = this.props;

    this.toggleOpen();

    // change redux-form value
    if (input) {
      input.onChange(x);
    }

    // additional action
    if (toggle) {
      toggle(x.value);
    }
  };

  render() {
    const { isOpen } = this.state;
    const {
      input = {},
      Button,
      isArrowed,
      locale,
      communities,
      followedCommunities,
      showOnlyFollowed,
      selectedCommunityId,
      disabled,
    } = this.props;

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
    let optionsNumber = null;

    // My feed page
    if (followedCommunities && showOnlyFollowed) {
      optionsNumber = followedFilteredCommunities.length;
      options = [{ options: followedFilteredCommunities }];
    }

    // All questions page
    if (!showOnlyFollowed) {
      optionsNumber = communities.length;
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

    const selectedValue = getFollowedCommunities(communities, [
      selectedCommunityId,
    ])[0];

    return (
      <Dropdown
        isCommunitySelector
        isArrowed={optionsNumber > 0 && isArrowed}
        isOpen={isOpen}
        toggle={optionsNumber > 0 && this.toggleOpen}
        target={
          <Button
            communityAvatar={selectedValue ? selectedValue.avatar : null}
            communityLabel={selectedValue ? selectedValue.label : null}
          />
        }
      >
        <Wrapper>
          <Select2
            input={{
              ...input,
              optionsNumber,
              selectedValue,
              onChange: this.onSelectChange,
              onBlur: null,
              value: null,
            }}
            options={options}
            disabled={disabled}
            Group={Group}
            CustomOption={CustomOption}
            autoFocus
            menuIsOpen
          />
          <ManageMyCommunities />
        </Wrapper>
      </Dropdown>
    );
  }
}

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
