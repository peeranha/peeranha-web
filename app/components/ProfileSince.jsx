import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import { getFormattedDate } from 'utils/datetime';
import styled from 'styled-components';

import { MONTH_3LETTERS__DAY_YYYY } from 'utils/constants';
import messages from 'containers/Profile/messages';

const Div = styled.div`
  display: ${({ view }) => view === 'Invalid Date' && 'none'};
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
      <FormattedMessage {...messages.memberSince} />
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
