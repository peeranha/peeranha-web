import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { LINK_COLOR, TEXT_SECONDARY } from 'style-constants';

import Span from 'components/Span';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import TextBlock from 'components/FormFields/TextBlock';

import {
  POSITION_FIELD,
  COMPANY_FIELD,
  ABOUT_FIELD,
  LOCATION_FIELD,
} from 'containers/Profile/constants';

import { Box } from './MainUserInformation';

const Blank = ({ profile, userId, account, redirectToEditProfilePage }) => {
  const { t } = useTranslation();

  return (
    !profile[LOCATION_FIELD] &&
    !profile[COMPANY_FIELD] &&
    !profile[POSITION_FIELD] &&
    !profile[ABOUT_FIELD] && (
      <p>
        <Span color={TEXT_SECONDARY} mobileFS="14">
          {t('profile.informationIsBlank')}
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
            {t('profile.editProfile')}
          </Span>
        </button>
      </p>
    )
  );
};

const Row = ({ nameField, value, asHtml }) => {
  const { t } = useTranslation();

  return value ? (
    <div className="d-flex align-items-start mb-2">
      <Span color={TEXT_SECONDARY} fontSize="14" lineHeight="24">
        {t(`profile.${nameField}`)}
      </Span>
      {asHtml ? (
        <TextBlock content={value} />
      ) : (
        <Span mobileFS="16" lineHeight="24" mobileLH="20">
          {value}
        </Span>
      )}
    </div>
  ) : null;
};

const AdditionalUserInformation = ({
  profile,
  userId,
  account,
  redirectToEditProfilePage,
}) => (
  <Box position="bottom">
    {(!profile || !profile.profile) && <LoadingIndicator inline />}

    {profile &&
      profile.profile && (
        <>
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
          <Row
            nameField="aboutLabel"
            value={profile.profile[ABOUT_FIELD]}
            asHtml
          />

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
