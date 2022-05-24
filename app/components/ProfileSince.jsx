import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { getFormattedDate } from 'utils/datetime';
import styled from 'styled-components';

import { MONTH_3LETTERS__DAY_YYYY } from 'utils/constants';

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

  useEffect(() => {
    if (profileSince == 'Invalid Date') {
      window.location.reload();
    }
  });

  return profileSince == 'Invalid Date' ? null : <Span>{profileSince}</Span>;
};

ProfileSince.propTypes = {
  creationTime: PropTypes.number,
  locale: PropTypes.string,
};

export default React.memo(injectIntl(ProfileSince));
