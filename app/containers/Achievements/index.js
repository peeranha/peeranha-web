import React, { useEffect, memo } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import NFTCard from './NFTCard';

import {
  selectUserAchievements,
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
  userId: PropTypes.string,
  getAllAchievementsDispatch: PropTypes.func,
  achievements: PropTypes.object,
  userAchievements: PropTypes.object,
  achievementsLoading: PropTypes.bool,
  setViewProfileAccountDispatch: PropTypes.func,
  resetViewProfileAccountDispatch: PropTypes.func,
  profile: PropTypes.object,
  communities: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  achievements: selectAllAchievements(),
  userAchievements: selectUserAchievements(),
  communities: selectCommunities(),
  achievementsLoading: selectAchievementsLoading(),
  profile: makeSelectProfileInfo(),
});

const mapDispatchToProps = (dispatch) => ({
  getAllAchievementsDispatch: bindActionCreators(getAllAchievements, dispatch),
  setViewProfileAccountDispatch: bindActionCreators(setViewProfileAccount, dispatch),
  resetViewProfileAccountDispatch: bindActionCreators(resetViewProfileAccount, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userAchievements', reducer });
const withSaga = injectSaga({ key: 'userAchievements', saga });

export default memo(compose(withReducer, withSaga, withConnect)(Achievements));
