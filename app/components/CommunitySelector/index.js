import React from 'react';
import PropTypes from 'prop-types';
import { translationMessages } from 'i18n';

import messages from 'common-messages';
import { gray, black, white, APP_FONT } from 'style-constants';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import { makeSelectFollowedCommunities } from 'containers/AccountProvider/selectors';

import {
  getFollowedCommunities,
  getUnfollowedCommunities,
} from 'utils/communityManagement';

import Select from 'react-select';

import Dropdown from 'components/Dropdown/AllowedClickInside';

import CustomOption from './CustomOption';
import DropdownIndicator from './DropdownIndicator';
import Group from './Group';
import ManageMyCommunities from './ManageMyCommunities';

export class CommunitySelector extends React.PureComponent {
  state = { isOpen: false };

  toggleOpen = /* istanbul ignore next */ () => {
    if (!this.props.disabled) {
      this.setState(state => ({ isOpen: !state.isOpen }));
    }
  };

  onSelectChange = /* istanbul ignore next */ x => {
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

  render() /* istanbul ignore next */ {
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
      followedCommunities,
    );

    const unfollowedFilteredCommunities = getUnfollowedCommunities(
      communities,
      followedCommunities,
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

    // Default option - All communities
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

    const selectedValue = getFollowedCommunities(communities, [
      selectedCommunityId,
    ])[0];

    return (
      <Dropdown
        isArrowed={isArrowed}
        isOpen={isOpen}
        onClose={this.toggleOpen}
        target={
          <Button
            toggleOpen={this.toggleOpen}
            communityAvatar={selectedValue ? selectedValue.avatar : null}
            communityLabel={selectedValue ? selectedValue.label : null}
          />
        }
      >
        <Select
          {...input}
          onBlur={() => input.onBlur && input.onBlur(input.value)}
          optionsNumber={optionsNumber}
          selectedValue={selectedValue}
          onChange={this.onSelectChange}
          isDisabled={disabled}
          controlShouldRenderValue={false}
          backspaceRemovesValue={false}
          hideSelectedOptions={false}
          tabSelectsValue={false}
          isClearable={false}
          menuIsOpen
          autoFocus
          options={options}
          components={{
            Group,
            DropdownIndicator,
            IndicatorSeparator: null,
            Option: CustomOption,
          }}
          styles={{
            control: base => ({
              ...base,
              border: `1px solid ${gray}`,
              borderRadius: '3px',
              color: black,
              fontFamily: APP_FONT,
              fontSize: '16px',
              background: `${white} !important`,
              minWidth: 300,
              margin: '5px',
              padding: '0 5px',
            }),
            menu: base => ({
              ...base,
              color: black,
              fontFamily: APP_FONT,
              fontSize: '16px',
              position: 'relative',
              margin: 0,
              boxShadow: 'none',
            }),
            menuList: base => ({
              ...base,
              paddingBottom: 0,
            }),
          }}
        />
        <ManageMyCommunities />
      </Dropdown>
    );
  }
}

CommunitySelector.propTypes = {
  Button: PropTypes.any,
  options: PropTypes.array,
  optionsNumber: PropTypes.number,
  selectedValue: PropTypes.number,
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
