import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translationMessages } from 'i18n';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Seo from 'components/Seo';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { getQuestions as getQuestionsWithAnsw } from 'containers/QuestionsWithAnswersOfUser/actions';
import { getQuestions } from 'containers/QuestionsOfUser/actions';

import {
  makeSelectAccount,
  makeSelectAccountLoading,
} from 'containers/AccountProvider/selectors';

import { getUserProfile } from 'containers/DataCacheProvider/actions';

import {
  selectUsers,
  selectUsersLoading,
} from 'containers/DataCacheProvider/selectors';

import messages from './messages';
import injectReducer from '../../utils/injectReducer';
import { STATE_KEY } from '../QuestionsOfUser/constants';
import reducer from '../QuestionsOfUser/reducer';
import injectSaga from '../../utils/injectSaga';
import saga from '../QuestionsWithAnswersOfUser/saga';
import { DAEMON } from '../../utils/constants';

export const Profile = ({
  userId,
  isLogin,
  locale,
  children,
  isProfileLoading,
  accountLoading,
  profile,
  getUserProfileDispatch,
  getQuestionsDispatch,
  getQuestionsWithAnswersDispatch,
}) => {
  const fetch = useCallback(id => {
    getUserProfileDispatch(id, true, isLogin);
    getQuestionsDispatch(id, true);
    getQuestionsWithAnswersDispatch(id, true);
  }, []);

  const translations = useMemo(() => translationMessages[locale], [locale]);

  const HelmetTitle = useMemo(
    () =>
      `${profile?.displayName ?? translations[messages.wrongUser.id]} | ${
        translations[messages.profile.id]
      }`,
    [profile, translations],
  );

  const keywords = useMemo(
    () => (profile?.profile ? Object.values(profile.profile) : []),
    [profile],
  );

  const displayLoader = useMemo(
    () => (isProfileLoading || accountLoading) && !profile,
    [isProfileLoading, accountLoading, profile],
  );

  useEffect(() => fetch(userId), [fetch, userId, accountLoading]);

  return (
    <div>
      {process.env.ENV !== 'dev' && (
        <Seo
          title={HelmetTitle}
          description={translations[messages.profileDescription.id]}
          language={locale}
          keywords={keywords}
        />
      )}

      <div>
        {displayLoader && <LoadingIndicator />}

        {profile && children}
      </div>
    </div>
  );
};

Profile.propTypes = {
  children: PropTypes.array,
  userId: PropTypes.string,
  profile: PropTypes.object,
  locale: PropTypes.string,
  isProfileLoading: PropTypes.bool,
  accountLoading: PropTypes.bool,
  getUserProfileDispatch: PropTypes.func,
  getQuestionsDispatch: PropTypes.func,
  getQuestionsWithAnswersDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  account: makeSelectAccount(),
  isProfileLoading: selectUsersLoading(),
  accountLoading: makeSelectAccountLoading(),
  profile: (state, props) => selectUsers(props.userId)(state),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    getUserProfileDispatch: bindActionCreators(getUserProfile, dispatch),
    getQuestionsDispatch: bindActionCreators(getQuestions, dispatch),
    getQuestionsWithAnswersDispatch: bindActionCreators(
      getQuestionsWithAnsw,
      dispatch,
    ),
  };
}

export default compose(
  injectReducer({ key: STATE_KEY, reducer }),
  injectSaga({ key: STATE_KEY, saga, mode: DAEMON }),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Profile);
