import React, { useEffect, memo } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { BORDER_SECONDARY } from 'style-constants';
import commonMessage from 'common-messages';

import BaseRounded from 'components/Base/BaseRounded';
import Wrapper from 'components/Header/Complex';
import H3 from 'components/H3';
import H4 from 'components/H4';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import {
  selectUserAchievements,
  selectReachedAchievements,
  selectUnreachedAchievements,
  selectReachedLevelAchievements,
  selectUnreachedLevelAchievements,
  selectUniqueReachedAchievements,
  selectUniqueUnreachedAchievements,
  selectAchievementsLoading,
} from './selectors';
import {
  getUserAchievements,
  setviewProfileAccount,
  resetUserAchievements,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Achievement from './Achievement';
import LevelAchievement from './LevelAchievement';
import UniqueAchievement from './UniqueAchievement';

const AchievementsBlockStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 50px;
  grid-column-gap: 15px;
  padding-top: 35px;
  padding-bottom: 35px;

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const AchievementsWrapper = styled(BaseRounded)`
  ${AchievementsBlockStyles};
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

const Achievements = ({
  locale,
  userId,
  reachedAchievements,
  unreachedAchievements,
  reachedLevelAchievements,
  unreachedLevelAchievements,
  uniqueReachedAchievements,
  uniqueUnreachedAchievements,
  getUserAchievementsDispatch,
  achievementsLoading,
  setviewProfileAccountDispatch,
  resetUserAchievementsDispatch,
}) => {
  useEffect(
    () => {
      setviewProfileAccountDispatch(userId);
      getUserAchievementsDispatch();
    },
    [userId],
  );

  useEffect(() => {
    return () => resetUserAchievementsDispatch();
  }, []);

  const translations = translationMessages[locale]
    ? translationMessages[locale]
    : null;

  return (
    <>
      <Wrapper className="mb-to-sm-0 mb-from-sm-3" position="bottom">
        <H3>
          <FormattedMessage {...commonMessage.achievements} />
        </H3>
      </Wrapper>

      {achievementsLoading && <LoadingIndicator />}
      {!achievementsLoading && (
        <>
          <AchievementsWrapper>
            {reachedLevelAchievements.map(el => (
              <LevelAchievement
                key={el.title}
                id={el.id}
                reached={el.reached}
                bronzeTitle={translations[messages[el.title].bronzeTitle.id]}
                bronzeDescription={
                  translations[messages[el.title].bronzeDescription.id]
                }
                silverTitle={translations[messages[el.title].silverTitle.id]}
                silverDescription={
                  translations[messages[el.title].silverDescription.id]
                }
                goldTitle={translations[messages[el.title].goldTitle.id]}
                goldDescription={
                  translations[messages[el.title].goldDescription.id]
                }
                value={el.value}
                levels={el.levels}
              />
            ))}
            {reachedAchievements.map(el => (
              <Achievement
                key={el.title}
                id={el.id}
                reached={el.reached}
                title={translations[messages[el.title].title.id]}
                description={translations[messages[el.title].description.id]}
              />
            ))}
            {unreachedLevelAchievements.map(el => (
              <Achievement
                key={el.title}
                id={el.id}
                reached={el.reached}
                next={el.next}
                title={translations[messages[el.title].title.id]}
                description={translations[messages[el.title].description.id]}
              />
            ))}
            {unreachedAchievements.map(el => (
              <Achievement
                key={el.title}
                id={el.id}
                reached={el.reached}
                next={el.next}
                title={translations[messages[el.title].title.id]}
                description={translations[messages[el.title].description.id]}
                value={el.value}
                locale={locale}
              />
            ))}
          </AchievementsWrapper>
          <UniqueAchievementsWrapper>
            <UniqueAchievementsTitle>
              <FormattedMessage {...commonMessage.uniqueAchievements} />
            </UniqueAchievementsTitle>

            <UniqueAchievementsBlock>
              {uniqueReachedAchievements.map(el => (
                <UniqueAchievement
                  key={el.title}
                  id={el.id}
                  reached={el.reached}
                  title={translations[messages[el.title].title.id]}
                  description={translations[messages[el.title].description.id]}
                />
              ))}
              {uniqueUnreachedAchievements.map(
                el =>
                  el.limit > el.totalAwarded ? (
                    <UniqueAchievement
                      key={el.title}
                      id={el.id}
                      reached={el.reached}
                      limit={el.limit}
                      next={el.next}
                      totalAwarded={el.totalAwarded}
                      title={translations[messages[el.title].title.id]}
                      description={
                        translations[messages[el.title].description.id]
                      }
                      value={el.value}
                      locale={locale}
                    />
                  ) : null,
              )}
            </UniqueAchievementsBlock>
          </UniqueAchievementsWrapper>
        </>
      )}
    </>
  );
};

Achievements.propTypes = {
  locale: PropTypes.string,
  userId: PropTypes.string,
  reachedAchievements: PropTypes.array,
  unreachedAchievements: PropTypes.array,
  reachedLevelAchievements: PropTypes.array,
  unreachedLevelAchievements: PropTypes.array,
  uniqueReachedAchievements: PropTypes.array,
  uniqueUnreachedAchievements: PropTypes.array,
  getUserAchievementsDispatch: PropTypes.func,
  achievementsLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  userAchievements: selectUserAchievements(),
  reachedAchievements: selectReachedAchievements(),
  unreachedAchievements: selectUnreachedAchievements(),
  reachedLevelAchievements: selectReachedLevelAchievements(),
  unreachedLevelAchievements: selectUnreachedLevelAchievements(),
  uniqueReachedAchievements: selectUniqueReachedAchievements(),
  uniqueUnreachedAchievements: selectUniqueUnreachedAchievements(),
  achievementsLoading: selectAchievementsLoading(),
});

const mapDispatchToProps = dispatch => ({
  getUserAchievementsDispatch: bindActionCreators(
    getUserAchievements,
    dispatch,
  ),
  setviewProfileAccountDispatch: bindActionCreators(
    setviewProfileAccount,
    dispatch,
  ),
  resetUserAchievementsDispatch: bindActionCreators(
    resetUserAchievements,
    dispatch,
  ),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'userAchievements', reducer });
const withSaga = injectSaga({ key: 'userAchievements', saga });

export default memo(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(Achievements),
);
