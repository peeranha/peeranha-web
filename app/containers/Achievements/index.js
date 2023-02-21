import React, { useEffect, memo } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import BaseRounded from 'components/Base/BaseRounded';
import H3 from 'components/H3';
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

import { makeSelectProfileInfo } from '../AccountProvider/selectors';

const BaseRoundedStyled = styled(BaseRounded)`
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
`;

const H3Styled = styled(H3)`
  margin-bottom: 10px;
`;

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

  console.log('achievements', achievements);

  return (
    <div>
      <BaseRoundedStyled>
        <H3Styled>{t('common.NFTs')}</H3Styled>
      </BaseRoundedStyled>

      {achievementsLoading && <LoadingIndicator />}

      {!achievementsLoading && achievements.length > 0 && (
        <div
          className="dg"
          css={{
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 8,
            marginTop: 8,

            '@media (min-width: 768px)': {
              gridTemplateColumns: 'repeat(3, 1fr)',
            },

            '@media (min-width: 1024px)': {
              gridTemplateColumns: 'repeat(2, 1fr)',
            },

            '@media (min-width: 1366px)': {
              gridTemplateColumns: 'repeat(4, 1fr)',
            },
          }}
        >
          {achievements.map(
            (item) =>
              item.name !== 'error IPFS2' && (
                <NFTCard
                  key={item.id}
                  item={item}
                  hasNFT={userAchievements.some(
                    (achievementId) => Number(achievementId) === item.id,
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
