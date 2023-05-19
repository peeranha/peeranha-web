import React, { useEffect, memo } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import NFTCard from './NFTCard';

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
  selectCommunities,
} from './selectors';

import {
  getUserAchievements,
  setViewProfileAccount,
  resetViewProfileAccount,
  getAllAchievements,
} from './actions';

import reducer from './reducer';
import saga from './saga';

import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { ERROR_IPFS2 } from './constants';
import { styles } from './Achievements.styled';

const Achievements = ({
  userId,
  getAllAchievementsDispatch,
  achievements,
  userAchievements,
  achievementsLoading,
  setViewProfileAccountDispatch,
  resetViewProfileAccountDispatch,
  profile,
  communities,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    setViewProfileAccountDispatch(userId);
    getAllAchievementsDispatch();

    return () => resetViewProfileAccountDispatch();
  }, [userId]);
  console.log(profile, 'profile<---');
  return (
    <div>
      <div css={styles.base}>
        <h3 css={styles.h3}>{t('common.NFTs')}</h3>
      </div>

      {achievementsLoading && <LoadingIndicator />}

      {!achievementsLoading && achievements.length > 0 && (
        <div css={styles.achievements}>
          {achievements.map(
            (achievement) =>
              achievement.name !== ERROR_IPFS2 && (
                <NFTCard
                  key={achievement.id}
                  item={achievement}
                  hasNFT={userAchievements.some(
                    (achievementId) => Number(achievementId) === achievement.id,
                  )}
                  isCurrentUser={profile?.id === userId}
                  currentValue={profile?.highestRating?.rating || 0}
                  communities={communities}
                />
              ),
          )}
        </div>
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
  communities: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  achievements: selectAllAchievements(),
  userAchievements: selectUserAchievements(),
  communities: selectCommunities(),
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
  getUserAchievementsDispatch: bindActionCreators(
    getUserAchievements,
    dispatch,
  ),
  setViewProfileAccountDispatch: bindActionCreators(
    setViewProfileAccount,
    dispatch,
  ),
  resetViewProfileAccountDispatch: bindActionCreators(
    resetViewProfileAccount,
    dispatch,
  ),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userAchievements', reducer });
const withSaga = injectSaga({ key: 'userAchievements', saga });

export default memo(compose(withReducer, withSaga, withConnect)(Achievements));
