/* eslint indent: 0 */
import React, { useMemo } from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { LINK_COLOR, TEXT_SECONDARY, BORDER_SECONDARY } from 'style-constants';

import Span from 'components/Span';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import TextBlock from 'components/FormFields/TextBlock';

import {
  POSITION_FIELD,
  COMPANY_FIELD,
  ABOUT_FIELD,
  LOCATION_FIELD,
} from 'containers/Profile/constants';

import messages from 'containers/Profile/messages';

import { Box } from './MainUserInformation';
import { getFormattedDate } from 'utils/datetime';
import { MONTH_3LETTERS__DAY_YYYY } from 'utils/constants';

const Blank = ({ profile, userId, account, redirectToEditProfilePage }) =>
  !profile[LOCATION_FIELD] &&
  !profile[COMPANY_FIELD] &&
  !profile[POSITION_FIELD] &&
  !profile[ABOUT_FIELD] && (
    <p>
      <Span color={TEXT_SECONDARY} mobileFS="14">
        <FormattedMessage id={messages.informationIsBlank.id} />{' '}
      </Span>
      <button
        type="button"
        onClick={redirectToEditProfilePage}
        className={`align-items-center ${
          userId === account ? 'd-inline-flex' : 'd-none'
        }`}
        id={`add-user-info-edit-${userId}`}
        data-user={userId}
      >
        <Span color={LINK_COLOR} mobileFS="14">
          <FormattedMessage id={messages.editProfile.id} />
        </Span>
      </button>
    </p>
  );

const Row = ({ nameField, value, asHtml }) =>
  value ? (
    <div className="d-flex align-items-start ">
      <Span color={TEXT_SECONDARY} fontSize="14" lineHeight="24">
        <FormattedMessage id={messages[nameField].id} />
      </Span>
      {asHtml ? (
        <TextBlock content={value} />
      ) : (
        <Span
          css={css`
            font-weight: 600;
          `}
          color={TEXT_SECONDARY}
          mobileFS="16"
          lineHeight="24"
          mobileLH="20"
        >
          {value}
        </Span>
      )}
    </div>
  ) : null;

const AdditionalUserInformation = ({
  profile,
  userId,
  account,
  redirectToEditProfilePage,
  locale,
}) => {
  const profileSince = useMemo(
    () =>
      getFormattedDate(profile?.creationTime, locale, MONTH_3LETTERS__DAY_YYYY),
    [],
  );

  return (
    <Box
      position="bottom"
      css={css`
        div:first-child {
          border-top: 1px solid ${BORDER_SECONDARY};
          padding-top: 20px;
        }
      `}
    >
      {(!profile || !profile.profile) && <LoadingIndicator inline />}

      {profile &&
        profile.profile && (
          <>
            {!!profile?.creationTime && (
              <Row nameField="memberSince" value={profileSince} />
            )}
            <Row
              nameField="locationLabel"
              value={profile.profile[LOCATION_FIELD]}
            />
            <Row
              nameField="companyLabel"
              value={profile.profile[COMPANY_FIELD]}
            />
            <Row
              nameField="positionLabel"
              value={profile.profile[POSITION_FIELD]}
            />
            <Row nameField="aboutLabel" value={profile.profile[ABOUT_FIELD]} />

            <Blank
              profile={profile.profile}
              userId={userId}
              account={account}
              redirectToEditProfilePage={redirectToEditProfilePage}
            />
          </>
        )}
    </Box>
  );
};

AdditionalUserInformation.propTypes = {
  profile: PropTypes.object,
  userId: PropTypes.string,
  account: PropTypes.string,
  redirectToEditProfilePage: PropTypes.func,
};

Row.propTypes = {
  nameField: PropTypes.string,
  value: PropTypes.string,
  asHtml: PropTypes.bool,
};

Blank.propTypes = {
  profile: PropTypes.object,
  userId: PropTypes.string,
  account: PropTypes.string,
  redirectToEditProfilePage: PropTypes.func,
};

export default React.memo(AdditionalUserInformation);
