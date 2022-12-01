import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { css } from '@emotion/react';

import commonMessages from 'common-messages';
import {
  TEXT_DARK,
  TEXT_SECONDARY,
  LINK_COLOR,
  BORDER_SECONDARY,
  TEXT_PRIMARY,
} from 'style-constants';
import { LABEL_SIZE_LG } from 'components/Img/MediumImage';
import { TEMPORARY_ACCOUNT_KEY } from 'utils/constants';
import { getUserAvatar } from 'utils/profileManagement';

import questionRoundedIcon from 'images/question2.svg?external';
import answerIcon from 'images/answer.svg?external';
import pencilIcon from 'images/pencil.svg?external';
import CopyTextIcon from 'icons/CopyText';
import { translationMessages } from 'i18n';
import Base from 'components/Base';
import A from 'components/A';
import Ul from 'components/Ul';
import Span from 'components/Span';
import RatingStatus from 'components/RatingStatus';
import AchievementsStatus from 'components/AchievementsStatus/index';
import { IconLg, IconMd } from 'components/Icon/IconWithSizes';
import { showPopover } from 'utils/popover';
import LargeImage from 'components/Img/LargeImage';
import TelegramUserLabel from 'components/Labels/TelegramUserLabel';
import LoadingIndicator from 'components/LoadingIndicator';

import messages from 'containers/Profile/messages';
import { customRatingIconColors } from 'constants/customRating';
import ProfileSince from 'components/ProfileSince';
import { getUserName } from 'utils/user';
import useMediaQuery from 'hooks/useMediaQuery';

import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();
const InlineLoader = styled(LoadingIndicator)`
  margin: auto;
  margin-top: 5px;
`;

export const UlStyled = Ul.extend`
  display: flex;
  border: none;
  padding: 0;
  white-space: nowrap;
  flex-wrap: wrap;

  @media (max-width: 420px) {
    display: flex;
    overflow-x: hidden;
    white-space: nowrap;
    flex-wrap: wrap;
  }
  li {
    display: flex;
    flex-direction: column;
    padding: 15px 30px 15px 0;
    div {
      display: inline;
    }
    span {
      height: 20px;
    }
    @media (max-width: 450px) {
      word-break: break-word;
      white-space: pre-line;
      overflow-wrap: break-word;
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
      font-size: 16px;
      font-weight: 600;
      color: ${TEXT_DARK};

      img {
        margin-right: 5px;
        height: 18px;
      }

      svg {
        margin-right: 5px;
      }
      span {
        height: 18px;
      }
    }

    @media only screen and (max-width: 1280px) {
      padding-right: 20px;
    }

    @media only screen and (max-width: 768px) {
      padding: 10px 25px 5px 0;
      span,
      div {
        font-size: 16px !important;
      }
    }

    @media only screen and (max-width: 500px) {
      div {
        font-size: 13px !important;
      }
    }
    @media only screen and (max-width: 400px) {
      display: block;
      width: 100%;
      padding: 10px 15px 5px 0;
      span {
        font-size: 12px !important;
      }
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
      flex: 1 1;
    }

    > *:nth-child(2) {
      flex: 0 0 calc(100% - 150px);
      max-width: calc(100% - 150px);
      overflow: break-word;

      @media only screen and (max-width: 576px) {
        max-width: calc(100% - 10px);
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
  const isTemporaryAccount = !!profile?.integer_properties?.find(
    (x) => x.key === TEMPORARY_ACCOUNT_KEY && x.value,
  );
  const userPolygonScanAddress = process.env.BLOCKCHAIN_EXPLORERE_URL + userId;
  const [copied, setCopied] = useState(false);
  const writeToBuffer = (event) => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    showPopover(
      event.currentTarget.id,
      translationMessages[locale][commonMessages.copied.id],
    );
  };

  const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    <Box position="middle" className="pb-0">
      <div
        css={css`
          flex-direction: column;
          @media (min-width: 768px) {
            flex-direction: row;
            background: rgba(165, 188, 255, 0.1);
            border-radius: 170px;
          }
        `}
      >
        <div
          css={css`
            background: rgba(165, 188, 255, 0.1);
            border-radius: 170px;
            @media (min-width: 768px) {
              background: none;
            }
            @media (min-width: 768px) and (max-width: 1220px) {
              padding-top: 28px;
            }
          `}
        >
          <LargeImageButton
            onClick={redirectToEditProfilePage}
            data-user={userId}
            disabled={account !== userId}
          >
            <LargeImage
              src={getUserAvatar(profile.avatar, userId, account)}
              alt="avatar"
              isBordered
              css={css`
                border: 2px solid ${TEXT_PRIMARY};
                padding: 2px;
              `}
            />
            {isTemporaryAccount && (
              <TelegramUserLabel
                id={`temporary-account-${userId}-label`}
                locale={locale}
                size={LABEL_SIZE_LG}
              />
            )}
          </LargeImageButton>
          <div
            className={!isDesktop ? 'd-flex ais fdc' : 'd-none'}
            css={css`
              min-width: calc(100% - 5px);
              padding: 0 80px 0 10px;
            `}
          >
            <Span
              fontSize="38"
              lineHeight="47"
              bold
              css={css`font-size: 24px; @media (min-width: 577px){padding:20px 0;`}
            >
              {getUserName(profile?.displayName, userId)}
            </Span>
            <button
              onClick={redirectToEditProfilePage}
              className={
                isDesktop ? 'd-none' : `align-items-center d-inline-flex`
              }
              id={`redireact-to-edit-${userId}-user-page-2`}
              data-user={userId}
            >
              <IconMd
                icon={pencilIcon}
                color={colors.btnColor || TEXT_PRIMARY}
              />
              <Span className="ml-1" color={colors.btnColor || TEXT_PRIMARY}>
                <FormattedMessage id={messages.editProfile.id} />
              </Span>
            </button>
          </div>
        </div>

        <div>
          <div className={isDesktop ? 'd-flex align-items-center' : 'd-none'}>
            <Span fontSize="38" lineHeight="47" mobileFS="28" bold>
              {getUserName(profile?.displayName, userId)}
            </Span>
          </div>
          <div className="d-flex align-items-center">
            <UlStyled>
              <li
                css={css`
                  flex: 1 1 60%;
                  @media (min-width: 768px) {
                    flex: 0 1;
                  }
                `}
              >
                <FormattedMessage id={messages.status.id} />
                <RatingStatus
                  isProfilePage={true}
                  customRatingIconColors={customRatingIconColors}
                  rating={profile.highestRating.rating}
                  size="lg"
                />
              </li>

              <li
                css={css`
                  flex: 1 1 40%;
                  @media (min-width: 768px) {
                    flex: 0 1;
                  }
                `}
              >
                <FormattedMessage id={commonMessages.posts.id} />
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

              <li
                css={css`
                  flex: 1 1 60%;
                  @media (min-width: 768px) {
                    flex: 0 1;
                  }
                `}
              >
                <FormattedMessage id={commonMessages.answers.id} />
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

              <li
                css={css`
                  flex: 1 1 40%;
                  @media (min-width: 768px) {
                    flex: 0 1;
                  }
                `}
              >
                <FormattedMessage id={messages.achievements.id} />
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
                <li
                  css={css`
                    flex-direction: row;
                  `}
                >
                  <FormattedMessage id={commonMessages.walletAddress.id} />
                  <div>
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
                    <button id="share-link-copy" onClick={writeToBuffer}>
                      <CopyTextIcon
                        className="ml-2"
                        stroke={colors.linkColor || TEXT_PRIMARY}
                        fill={colors.linkColor || TEXT_PRIMARY}
                        size={[18, 18]}
                      />
                    </button>
                  </div>
                </li>
              )}
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
