import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { isSingleCommunityWebsite } from 'utils/communityManagement';
import OutlinedButton from 'components/Button/Outlined/InfoMedium';

import { TEXT_PRIMARY } from 'style-constants';
import Button from './index';
import messages from './messages';
import { FOLLOW_BUTTON, UNFOLLOW_BUTTON } from './constants';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';

const single = isSingleCommunityWebsite();

const CustomButton = styled.div`
  margin-top: 16px;
  color: ${TEXT_PRIMARY};
  font-size: 14px;
  cursor: pointer;

  @media only screen and (max-width: 576px) {
    max-width: 95px;
    margin-top: 9px;

    text-align: right;
  }
`;

const B = ({ isFollowed, onClick, id, disabled, profile }) => {
  if (single && !profile) {
    return null;
  }

  return single && profile ? (
    <CustomButton
      id={id}
      data-isfollowed={isFollowed}
      onClick={onClick}
      disabled={disabled}
      className={isFollowed ? 'd-none' : ''}
    >
      <FormattedMessage {...messages.subscribeToThisCommunity} />
    </CustomButton>
  ) : (
    <OutlinedButton
      id={id}
      data-isfollowed={isFollowed}
      onClick={onClick}
      disabled={disabled}
    >
      <FormattedMessage
        {...messages[isFollowed ? UNFOLLOW_BUTTON : FOLLOW_BUTTON]}
      />
    </OutlinedButton>
  );
};

B.propTypes = {
  isFollowed: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  profile: PropTypes.object,
};

const BWrapper = connect(state => ({
  profile: makeSelectProfileInfo()(state),
}))(B);

export const DefaultButton = ({ communityIdFilter }) => (
  <Button
    communityIdFilter={communityIdFilter}
    render={({ isFollowed, onClick, id, disabled }) => (
      <BWrapper
        id={id}
        isFollowed={isFollowed}
        onClick={onClick}
        disabled={disabled}
      />
    )}
  />
);

DefaultButton.propTypes = {
  communityIdFilter: PropTypes.number,
};

export default React.memo(DefaultButton);
