import React, { useEffect, memo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { isSuiBlockchain } from 'utils/constants';
import { getNetworkIds } from 'utils/ethConstants';

import { BORDER_SECONDARY } from 'style-constants';

import BaseRounded from 'components/Base/BaseRounded';
import H3 from 'components/H3';
import H4 from 'components/H4';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import {
  selectUserAchievements,
  selectRatingAchievements,
  selectQuestionAskedAchievements,
  selectAnwerGivenAchievements,
  selectBestAnswerAchievements,
  selectFirstAnswerAchievements,
  selectFirstIn15Achievements,
  selectUniqueAchievements,
  selectAchievementsLoading,
  selectAllAchievements,
} from './selectors';

import {
  getUserAchievements,
  setViewProfileAccount,
  resetViewProfileAccount,
  getAllAchievements,
  mintAchievement,
} from './actions';

import { IS_MINTED_ACHIEVEMENT, CAN_MINT_ACHIEVEMENT } from './constants';

import UniqueAchievement from './UniqueAchievement';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';

const BaseRoundedStyled = styled(BaseRounded)`
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
`;

const AchievementsBlockStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 50px;
  grid-column-gap: 15px;
  padding-top: 35px;
  padding-bottom: 35px;

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 690px) {
    grid-template-columns: 1fr;
  }
`;

const UniqueAchievementsBlock = styled.div`
  ${AchievementsBlockStyles};
`;

const UniqueAchievementsWrapper = styled(BaseRounded)`
  margin-top: 15px;
`;

const UniqueAchievementsTitle = styled(H4)`
  padding-bottom: 20px;
  border-bottom: 1px solid ${BORDER_SECONDARY};
`;

const H3Styled = styled(H3)`
  margin-bottom: 10px;
`;

const Achievements = ({
  locale,
  userId,
  getAllAchievementsDispatch,
  achievements,
  userAchievements,
  achievementsLoading,
  setViewProfileAccountDispatch,
  resetViewProfileAccountDispatch,
  profile,
  mintAchievementDispatch,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    setViewProfileAccountDispatch(userId);
    getAllAchievementsDispatch();

    return () => resetViewProfileAccountDispatch();
  }, [userId]);

  const userAchievementsIds = userAchievements?.map((achievement) => achievement.id);

  return (
    <div>
      <BaseRoundedStyled>
        <H3Styled>{t('common.NFTs')}</H3Styled>
      </BaseRoundedStyled>

      {achievementsLoading && <LoadingIndicator />}

      {!achievementsLoading && achievements.length > 0 && (
        <UniqueAchievementsWrapper>
          <UniqueAchievementsTitle>{t('common.limitedEdition')}</UniqueAchievementsTitle>

          <UniqueAchievementsBlock>
            {achievements
              .filter((achievement) => getNetworkIds().includes(achievement?.id.split('')[0]))
              .map(
                (achievement) =>
                  achievement.name !== 'error IPFS2' && (
                    <UniqueAchievement
                      reached={userAchievementsIds?.some(
                        (achievementId) => achievementId === achievement.id,
                      )}
                      key={achievement.id}
                      maxCount={achievement.maxCount}
                      factCount={achievement.factCount}
                      currentValue={profile?.highestRating?.rating || null}
                      lowerValue={achievement.lowerValue}
                      name={achievement.name}
                      description={achievement.description}
                      image={achievement.image}
                      id={achievement.id}
                      achievementURI={achievement.achievementURI}
                      achievementsType={achievement.achievementsType}
                      locale={locale}
                      currentUser={profile?.id === userId}
                      isMinted={userAchievements?.some(
                        (achievementId) =>
                          achievementId.id === achievement.id &&
                          achievementId?.isMinted === IS_MINTED_ACHIEVEMENT,
                      )}
                      canMintAchievement={userAchievements?.some(
                        (achievementId) =>
                          achievementId.id === achievement.id &&
                          achievementId?.isMinted === CAN_MINT_ACHIEVEMENT,
                      )}
                      mintAchievement={mintAchievementDispatch}
                    />
                  ),
              )}
          </UniqueAchievementsBlock>
        </UniqueAchievementsWrapper>
      )}
    </div>
  );
};

Achievements.propTypes = {
  locale: PropTypes.string,
  userId: PropTypes.string,
  ratingAchievements: PropTypes.array,
  questionAskedAchievements: PropTypes.array,
  anwerGivenAchievements: PropTypes.array,
  bestAnswerAchievements: PropTypes.array,
  firstAnswerAchievements: PropTypes.array,
  firstIn15Achievements: PropTypes.array,
  uniqueAchievements: PropTypes.array,
  getUserAchievementsDispatch: PropTypes.func,
  setViewProfileAccountDispatch: PropTypes.func,
  resetViewProfileAccountDispatch: PropTypes.func,
  achievementsLoading: PropTypes.bool,
  profile: PropTypes.object,
  mintAchievementDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  achievements: selectAllAchievements(),
  userAchievements: selectUserAchievements(),
  ratingAchievements: selectRatingAchievements(),
  questionAskedAchievements: selectQuestionAskedAchievements(),
  anwerGivenAchievements: selectAnwerGivenAchievements(),
  bestAnswerAchievements: selectBestAnswerAchievements(),
  firstAnswerAchievements: selectFirstAnswerAchievements(),
  firstIn15Achievements: selectFirstIn15Achievements(),
  uniqueAchievements: selectUniqueAchievements(),
  achievementsLoading: selectAchievementsLoading(),
  profile: makeSelectProfileInfo(),
});

const mapDispatchToProps = (dispatch) => ({
  getAllAchievementsDispatch: bindActionCreators(getAllAchievements, dispatch),
  getUserAchievementsDispatch: bindActionCreators(getUserAchievements, dispatch),
  setViewProfileAccountDispatch: bindActionCreators(setViewProfileAccount, dispatch),
  resetViewProfileAccountDispatch: bindActionCreators(resetViewProfileAccount, dispatch),
  mintAchievementDispatch: bindActionCreators(mintAchievement, dispatch),
});

export default memo(connect(mapStateToProps, mapDispatchToProps)(Achievements));
