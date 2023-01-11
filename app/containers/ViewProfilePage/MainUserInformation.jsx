import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { css } from '@emotion/react';

import { TEXT_DARK, TEXT_SECONDARY, LINK_COLOR } from 'style-constants';
import { LABEL_SIZE_LG } from 'components/Img/MediumImage';
import { TEMPORARY_ACCOUNT_KEY } from 'utils/constants';
import { getUserAvatar } from 'utils/profileManagement';

import questionRoundedIcon from 'images/question2.svg?external';
import answerIcon from 'images/answer.svg?external';
import iconCopy from 'images/document-copy.svg?inline';
import iconCopySelect from 'images/document-copy-select.svg?inline';
import Base from 'components/Base';
import A from 'components/A';
import Ul from 'components/Ul';
import Span from 'components/Span';
import RatingStatus from 'components/RatingStatus';
import AchievementsStatus from 'components/AchievementsStatus/index';
import { IconLg } from 'components/Icon/IconWithSizes';
import { showPopover } from 'utils/popover';
import LargeImage from 'components/Img/LargeImage';
import TelegramUserLabel from 'components/Labels/TelegramUserLabel';
import LoadingIndicator from 'components/LoadingIndicator';

import { customRatingIconColors } from 'constants/customRating';
import ProfileSince from 'components/ProfileSince';
import { getUserName } from 'utils/user';

const InlineLoader = styled(LoadingIndicator)`
  margin: auto;
  margin-top: 5px;
`;

export const UlStyled = Ul.extend`
  display: flex;
  border: none;
  padding: 0;
  overflow-x: hidden;
  white-space: nowrap;
  flex-wrap: wrap;

  @media (max-width: 420px) {
    display: flex;
    overflow-x: hidden;
    white-space: nowrap;
    flex-wrap: wrap;
  }

  li:last-child {
    padding-right: 0;
  }

  li {
    display: flex;
    flex-direction: column;
    padding: 15px 30px 15px 0;
    div {
      display: inline;
    }
    @media (max-width: 450px) {
      word-break: break-word;
      white-space: pre-line;
      overflow-wrap: break-word;

      button {
        left: 75%;
        top: 80%;
      }
    }

    @media (max-width: 399px) {
      overflow-x: auto;
    }

    > *:nth-child(1) {
      font-size: 14px;
      line-height: 25px;
      color: ${TEXT_SECONDARY};
    }

    > *:nth-child(2) {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: 600;
      color: ${TEXT_DARK};

      img {
        margin-right: 5px;
        height: 18px;
      }

      svg {
        margin-right: 5px;
      }
    }

    @media only screen and (max-width: 1280px) {
      padding: 10px 45px;
    }

    @media only screen and (max-width: 768px) {
      padding: 10px 25px 5px 0;
      span,
      div {
        font-size: 16px !important;
      }
      button {
        left: 80%;
        top: 80%;
      }
    }

    @media only screen and (max-width: 640px) {
      span {
        font-size: 13px !important;
      }
    }

    @media only screen and (max-width: 500px) {
      height: 70px;
      padding: 10px 20px 5px 0;
      div {
        font-size: 13px !important;
      }
    }
    @media only screen and (max-width: 400px) {
      display: block;
      width: 100%;
      padding: 10px 15px 5px 0;
    }
  }
`;

export const Box = Base.extend`
  > div {
    display: flex;
    align-items: start;

    > *:nth-child(1) {
      display: flex;
      justify-content: flex-start;
      align-items: start;
      flex: 0 0 150px;

      @media only screen and (max-width: 576px) {
        flex: 0 0 90px;
      }
    }

    > *:nth-child(2) {
      flex: 0 0 calc(100% - 150px);
      max-width: calc(100% - 150px);
      overflow: hidden;

      @media only screen and (max-width: 576px) {
        flex: 0 0 calc(100% - 90px);
        max-width: calc(100% - 90px);
      }
    }
  }
`;

const LargeImageButton = styled.button`
  position: relative;
`;

const MainUserInformation = ({
  profile,
  userId,
  account,
  locale,
  redirectToEditProfilePage,
  userAchievementsLength,
}) => {
  const { t } = useTranslation();
  const isTemporaryAccount = !!profile?.integer_properties?.find(
    (x) => x.key === TEMPORARY_ACCOUNT_KEY && x.value,
  );
  const userPolygonScanAddress = process.env.BLOCKCHAIN_EXPLORERE_URL + userId;
  const [copied, setCopied] = useState(false);
  const writeToBuffer = (event) => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    showPopover(event.currentTarget.id, t('common.copied'));
  };

  const iconType = copied ? iconCopySelect : iconCopy;

  return (
    <Box position="middle" className="pb-0">
      <div>
        <div>
          <LargeImageButton
            onClick={redirectToEditProfilePage}
            data-user={userId}
            disabled={account !== userId}
          >
            <LargeImage
              src={getUserAvatar(profile.avatar, userId, account)}
              alt="avatar"
              isBordered
            />
            {isTemporaryAccount && (
              <TelegramUserLabel
                id={`temporary-account-${userId}-label`}
                locale={locale}
                size={LABEL_SIZE_LG}
              />
            )}
          </LargeImageButton>
        </div>

        <div>
          <div className="d-flex align-items-center">
            <Span fontSize="38" lineHeight="47" mobileFS="28" bold>
              {getUserName(profile?.displayName, userId)}
            </Span>
          </div>

          <div className="d-flex align-items-center">
            <UlStyled>
              <li>
                <span>{t('profile.status')}</span>

                <RatingStatus
                  isProfilePage={true}
                  customRatingIconColors={customRatingIconColors}
                  rating={profile.highestRating.rating}
                  size="lg"
                />
              </li>

              <li>
                <span>{t('common.posts')}</span>
                <span>
                  <IconLg
                    icon={questionRoundedIcon}
                    css={css`
                      path {
                        fill: ${LINK_COLOR};
                      }
                      ,
                      circle {
                        stroke: ${LINK_COLOR};
                      }
                    `}
                  />
                  {profile.postCount}
                </span>
              </li>

              <li>
                <span>{t('common.answers')}</span>
                <span>
                  <IconLg
                    icon={answerIcon}
                    css={css`
                      path {
                        stroke: ${LINK_COLOR};
                      }
                    `}
                  />
                  {profile.answersGiven}
                </span>
              </li>

              <li>
                <span>{t('profile.achievements')}</span>

                {typeof profile.achievements === 'object' ? (
                  <AchievementsStatus
                    isProfilePage={true}
                    count={userAchievementsLength}
                    size="lg"
                  />
                ) : (
                  <InlineLoader width={7} height={7} margin={3} />
                )}
              </li>
              {!isTemporaryAccount && (
                <li className="pr">
                  <span>{t('common.walletAddress')}</span>
                  <span>
                    <A
                      to={{ pathname: userPolygonScanAddress }}
                      href={userPolygonScanAddress}
                      target="_blank"
                    >
                      <span
                        id="copytext1"
                        css={css`
                          border-bottom: 1px solid;
                          color: ${LINK_COLOR};
                          font-weight: 400;
                          font-size: 14px;
                        `}
                      >
                        {userId}
                      </span>
                    </A>
                    <button
                      id="share-link-copy"
                      css={css`
                        color: #adaeae;
                        position: absolute;
                        left: 95%;
                        margin-top: 23px;
                      `}
                      onClick={writeToBuffer}
                    >
                      <img
                        src={iconType}
                        alt="copy"
                        css={css`
                          height: 20px;
                        `}
                      />
                    </button>
                  </span>
                </li>
              )}

              <li>
                {!!profile?.creationTime && (
                  <ProfileSince
                    creationTime={profile?.creationTime}
                    locale={locale}
                  />
                )}
              </li>
            </UlStyled>
          </div>
        </div>
      </div>
    </Box>
  );
};

MainUserInformation.propTypes = {
  profile: PropTypes.object,
  userId: PropTypes.string,
  account: PropTypes.string,
  locale: PropTypes.string,
  redirectToEditProfilePage: PropTypes.func,
};

export default React.memo(MainUserInformation);
