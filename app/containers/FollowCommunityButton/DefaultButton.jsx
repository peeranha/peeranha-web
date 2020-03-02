import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { isSingleCommunityWebsite } from 'utils/communityManagement';
import OutlinedButton from 'components/Button/Outlined/InfoMedium';

import { TEXT_PRIMARY } from 'style-constants';
import Button from './index';
import messages from './messages';
import { FOLLOW_BUTTON, UNFOLLOW_BUTTON } from './constants';

const single = isSingleCommunityWebsite();

const CustomButton = styled.div`
  margin-top: 16px;
  color: ${TEXT_PRIMARY};
  font-size: 14px;
  cursor: pointer;

  @media only screen and (max-width: 576px) {
    margin-top: 12px;
  }
`;

const B = ({ isFollowed, onClick, id, disabled }) =>
  single ? (
    <CustomButton
      id={id}
      data-isfollowed={isFollowed}
      onClick={onClick}
      disabled={disabled}
    >
      <FormattedMessage
        {...messages[isFollowed ? UNFOLLOW_BUTTON : FOLLOW_BUTTON]}
      />
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

export const DefaultButton = ({ communityIdFilter }) => (
  <Button
    communityIdFilter={communityIdFilter}
    render={({ isFollowed, onClick, id, disabled }) => (
      <B
        id={id}
        isFollowed={isFollowed}
        onClick={onClick}
        disabled={disabled}
      />
    )}
  />
);

B.propTypes = {
  isFollowed: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
};

DefaultButton.propTypes = {
  communityIdFilter: PropTypes.number,
};

export default React.memo(DefaultButton);
