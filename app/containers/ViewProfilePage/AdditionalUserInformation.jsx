import React, { useMemo } from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { LINK_COLOR, TEXT_SECONDARY, BORDER_SECONDARY } from 'style-constants';

import Span from 'components/Span';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import MarkdownPreviewBlock from 'components/TextEditor/MarkdownPreview';

import {
  POSITION_FIELD,
  COMPANY_FIELD,
  ABOUT_FIELD,
  LOCATION_FIELD,
} from 'containers/Profile/constants';

import useMediaQuery from 'hooks/useMediaQuery';

import { Box } from './MainUserInformation';
import { getFormattedDate } from 'utils/datetime';
import { MONTH_3LETTERS__DAY_YYYY } from 'utils/constants';
import { singleCommunityColors } from 'utils/communityManagement';
import { isSuiBlockchain } from 'utils/sui/sui';

const colors = singleCommunityColors();
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
          className={`align-items-center ${userId === account ? 'd-inline-flex' : 'd-none'}`}
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
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return value ? (
    <div
      className="d-flex align-items-start"
      css={css`
        padding-bottom: 8px;
      `}
    >
      <Span
        color={TEXT_SECONDARY}
        fontSize={isDesktop ? '16' : '14'}
        lineHeight="20"
        mobileLH="20"
        mobileFS="14"
      >
        {t(`profile.${nameField}`)}
      </Span>
      {asHtml ? (
        <MarkdownPreviewBlock content={value} />
      ) : (
        <Span
          bold
          color={TEXT_SECONDARY}
          mobileFS="14"
          lineHeight="20"
          mobileLH="20"
          fontSize={isDesktop ? '16' : '14'}
        >
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
  locale,
}) => {
  const profileSince = useMemo(
    () => getFormattedDate(profile?.creationTime, locale, MONTH_3LETTERS__DAY_YYYY),
    [],
  );

  return (
    <Box
      position="bottom"
      css={css`
        div:first-child {
          border-top: 1px solid ${BORDER_SECONDARY};
          padding: 20px 0 8px 0;
        }
        border: ${isSuiBlockchain ? `1px solid ${colors.border}` : 'none'};
        border-top: none;
      `}
    >
      {(!profile || !profile.profile) && <LoadingIndicator inline />}

      {profile && profile.profile && (
        <>
          {!!profile?.creationTime && <Row nameField="memberSince" value={profileSince} />}
          <Row nameField="locationLabel" value={profile.profile[LOCATION_FIELD]} />
          <Row nameField="companyLabel" value={profile.profile[COMPANY_FIELD]} />
          <Row nameField="positionLabel" value={profile.profile[POSITION_FIELD]} />
          <Row nameField="aboutLabel" value={profile.profile[ABOUT_FIELD]} />

          {/* PEER-597: Hide the text in the user profile that information is not available;
            <Blank
              profile={profile.profile}
              userId={userId}
              account={account}
              redirectToEditProfilePage={redirectToEditProfilePage}
            /> */}
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
