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
  questionAskedRelated,
  answerGivenRelated,
  bestAnswerRelated,
  firstAnswerIn15Related,
  firstAnswerRelated,
  ratingRelated,
} from './constants';

import {
  getUserAchievements,
  setViewProfileAccount,
  resetViewProfileAccount,
  getAllAchievements,
} from './actions';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Achievement from './Achievement';
import UniqueAchievement from './UniqueAchievement';
import Separator from './Separator';
import { userAchievements } from '../../routes-config';

const BaseRoundedStyled = styled(BaseRounded)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

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

const AchievementsBlock = styled.div`
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

const H3Styled = styled(H3)`
  margin-bottom: 10px;
`;

const Achievements = ({
  locale,
  userId,
  getAllAchievementsDispatch,
  achievements,
  userAchievements,
  ratingAchievements,
  questionAskedAchievements,
  anwerGivenAchievements,
  bestAnswerAchievements,
  firstAnswerAchievements,
  firstIn15Achievements,
  uniqueAchievements,
  achievementsLoading,
  getUserAchievementsDispatch,
  setViewProfileAccountDispatch,
  resetViewProfileAccountDispatch,
}) => {
  useEffect(
    () => {
      setViewProfileAccountDispatch(userId);
      getAllAchievementsDispatch();

      // ComponentWillUnmount
      return () => resetViewProfileAccountDispatch();
    },
    [userId],
  );

  const translations = translationMessages[locale]
    ? translationMessages[locale]
    : null;

  return (
    <div>
      <BaseRoundedStyled>
        <H3Styled>
          <FormattedMessage {...commonMessage.achievements} />
        </H3Styled>

        {/* {!achievementsLoading && (
          <>
            <Separator groupType={ratingRelated} locale={locale} />
            <AchievementsBlock>
              {ratingAchievements.map(el => (
                <Achievement
                  key={el.name}
                  {...el}
                  name={translations[messages[el.name].name.id]}
                  description={translations[messages[el.name].description.id]}
                  locale={locale}
                />
              ))}
            </AchievementsBlock>

           <>
              <Separator groupType={questionAskedRelated} locale={locale} />
              <AchievementsBlock>
                {questionAskedAchievements.map(el => (
                  <Achievement
                    key={el.name}
                    {...el}
                    name={translations[messages[el.name].name.id]}
                    description={
                      translations[messages[el.name].description.id]
                    }
                    locale={locale}
                  />
                ))}
              </AchievementsBlock>
            </>

            <>
              <Separator groupType={answerGivenRelated} locale={locale} />
              <AchievementsBlock>
                {anwerGivenAchievements.map(el => (
                  <Achievement
                    key={el.name}
                    {...el}
                    name={translations[messages[el.name].name.id]}
                    description={
                      translations[messages[el.name].description.id]
                    }
                    locale={locale}
                  />
                ))}
              </AchievementsBlock>
            </>

            <>
              <Separator groupType={bestAnswerRelated} locale={locale} />
              <AchievementsBlock>
                {bestAnswerAchievements.map(el => (
                  <Achievement
                    key={el.name}
                    {...el}
                    name={translations[messages[el.name].name.id]}
                    description={
                      translations[messages[el.name].description.id]
                    }
                    locale={locale}
                  />
                ))}
              </AchievementsBlock>
            </>

            <>
              <Separator groupType={firstAnswerRelated} locale={locale} />
              <AchievementsBlock>
                {firstAnswerAchievements.map(el => (
                  <Achievement
                    key={el.name}
                    {...el}
                    name={translations[messages[el.name].name.id]}
                    description={
                      translations[messages[el.name].description.id]
                    }
                    locale={locale}
                  />
                ))}
              </AchievementsBlock>
            </>

            <>
              <Separator groupType={firstAnswerIn15Related} locale={locale} />
              <AchievementsBlock>
                {firstIn15Achievements.map(el => (
                  <Achievement
                    key={el.name}
                    {...el}
                    name={translations[messages[el.name].name.id]}
                    description={
                      translations[messages[el.name].description.id]
                    }
                    locale={locale}
                  />
                ))}
              </AchievementsBlock>
            </>
          </>
        )}*/}
      </BaseRoundedStyled>

      {achievementsLoading && <LoadingIndicator />}

      {!achievementsLoading &&
        achievements.length > 0 && (
          <UniqueAchievementsWrapper>
            <UniqueAchievementsTitle>
              <FormattedMessage {...commonMessage.uniqueAchievements} />
            </UniqueAchievementsTitle>

            <UniqueAchievementsBlock>
              {achievements.map(achievement => (
                <UniqueAchievement
                  reached={userAchievements.some(
                    achievementId => achievementId === achievement.id,
                  )}
                  key={achievement.id}
                  {...achievement}
                  locale={locale}
                />
              ))}
              {/*{uniqueAchievements.map(el => (*/}
              {/*  <UniqueAchievement*/}
              {/*    key={el.name}*/}
              {/*    {...el}*/}
              {/*    name={translations[messages[el.name].name.id]}*/}
              {/*    description={translations[messages[el.name].description.id]}*/}
              {/*    locale={locale}*/}
              {/*  />*/}
              {/*))}*/}
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
});

const mapDispatchToProps = dispatch => ({
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
