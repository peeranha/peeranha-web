import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import { getFormattedDate } from 'utils/datetime';
import styled from 'styled-components';

import { MONTH_3LETTERS__DAY_YYYY } from 'utils/constants';
import messages from 'containers/Profile/messages';

const Div = styled.div`
  display: ${({ profileSince, creationTime }) =>
    (profileSince === 'Invalid Date' ||
      profileSince === 'Jan 1, 1970' ||
      creationTime === 0) &&
    'none'};
`;

const Span = styled.span`
  @media only screen and (min-width: 1354px) {
    font-weight: 600;
  }
`;

export const ProfileSince = ({ creationTime, locale }) => {
  const profileSince = useMemo(
    () => getFormattedDate(creationTime, locale, MONTH_3LETTERS__DAY_YYYY),
    [],
  );

  return (
    <Div profileSince={profileSince} creationTime={creationTime}>
      <FormattedMessage id={messages.memberSince.id} />
      <div>
        <Span>{profileSince}</Span>
      </div>
    </Div>
  );
};

ProfileSince.propTypes = {
  creationTime: PropTypes.number,
  locale: PropTypes.string,
};

export default React.memo(injectIntl(ProfileSince));
