import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { Content } from './Content';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { DAEMON } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import reducer from 'containers/Administration/reducer';
import saga from 'containers/Administration/saga';

import {
  addModerator,
  getModerators,
  revokeModerator,
} from 'containers/Administration/actions';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import {
  selectAddModeratorLoading,
  selectModeratorsList,
  selectModeratorsLoading,
  selectRevokeModeratorLoading,
} from 'containers/Administration/selectors';
import {
  Moderator,
  OutputSelector,
  User,
} from 'containers/Administration/types';

type AdministrationProps = {
  locale: string;
  profileInfo: User;
  moderators: Array<Moderator>;
  getModeratorsDispatch: Function;
  moderatorsLoading: boolean;
  addModeratorDispatch: Function;
  addModeratorLoading: boolean;
  revokeModeratorDispatch: Function;
  revokeModeratorLoading: boolean;
};

const Administration: React.FC<AdministrationProps> = ({
  locale,
  moderators,
  getModeratorsDispatch,
  moderatorsLoading,
  addModeratorDispatch,
  addModeratorLoading,
  revokeModeratorDispatch,
  revokeModeratorLoading,
}): JSX.Element => {
  const single = isSingleCommunityWebsite();

  useEffect(
    () => {
      getModeratorsDispatch(single);
    },
    [single],
  );

  return (
    <>
      <Header
        locale={locale}
        single={single}
        addModerator={addModeratorDispatch}
        addModeratorLoading={addModeratorLoading}
      />
      <Content
        locale={locale}
        single={single}
        moderators={moderators}
        communityId={single}
        revokeModerator={revokeModeratorDispatch}
        moderatorsLoading={moderatorsLoading}
        revokeModeratorLoading={revokeModeratorLoading}
      />
    </>
  );
};

export default compose(
  injectReducer({ key: 'moderationReducer', reducer }),
  injectSaga({ key: 'moderationReducer', saga, mode: DAEMON }),
  connect(
    createStructuredSelector<any, OutputSelector>({
      locale: makeSelectLocale(),
      profileInfo: makeSelectProfileInfo(),
      moderators: selectModeratorsList,
      moderatorsLoading: selectModeratorsLoading,
      addModeratorLoading: selectAddModeratorLoading,
      revokeModeratorLoading: selectRevokeModeratorLoading,
    }),
    (dispatch: Dispatch) => ({
      getModeratorsDispatch: bindActionCreators(getModerators, dispatch),
      addModeratorDispatch: bindActionCreators(addModerator, dispatch),
      revokeModeratorDispatch: bindActionCreators(revokeModerator, dispatch),
    }),
  ),
)(Administration);
