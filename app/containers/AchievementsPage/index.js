import React, { useEffect, memo } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import commonMessage from 'common-messages';

import BaseRounded from 'components/Base/BaseRounded';
import Wrapper from 'components/Header/Complex';
import H3 from 'components/H3';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import {
  selectUserAchievements,
  makeSelectSortedUserAchievements,
  makeSelectAchievementsLoading,
} from './selectors';
import { getUserAchievements } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Achievement from './Achievement';

const AchievementsWrapper = styled(BaseRounded)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 50px;
  padding-top: 35px;
  padding-bottom: 35px;

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const AchievementsPage = ({
  locale,
  currentAccount,
  sortedAchievements,
  userAchievements,
  getUserAchievementsDispatch,
  achievementsLoading,
}) => {
  useEffect(() => {
    if (
      !userAchievements.length ||
      currentAccount !== userAchievements[0]?.user
    ) {
      getUserAchievementsDispatch(currentAccount);
    }
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
        <AchievementsWrapper>
          {sortedAchievements.map(el => (
            <Achievement
              key={el.title}
              reached={el.reached}
              title={translations[messages[el.title].title.id]}
              description={translations[messages[el.title].description.id]}
            />
          ))}
        </AchievementsWrapper>
      )}
    </>
  );
};

AchievementsPage.propTypes = {
  locale: PropTypes.string,
  currentAccount: PropTypes.string,
  sortedAchievements: PropTypes.array,
  getUserAchievementsDispatch: PropTypes.func,
  achievementsLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  currentAccount: makeSelectAccount(),
  userAchievements: selectUserAchievements(),
  sortedAchievements: makeSelectSortedUserAchievements(),
  achievementsLoading: makeSelectAchievementsLoading(),
});

const mapDispatchToProps = dispatch => ({
  getUserAchievementsDispatch: bindActionCreators(
    getUserAchievements,
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
  )(AchievementsPage),
);
