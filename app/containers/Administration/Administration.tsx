import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import Seo from 'components/Seo';
import { DAEMON } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import reducer from 'containers/Administration/reducer';
import saga from 'containers/Administration/saga';
import { noAccess as noAccessRoute } from 'routes-config';
import { useModeratorRole } from 'hooks/useModeratorRole';

import {
  addRole,
  getModerators,
  revokeRole,
  closeEmptyUserWarning,
} from 'containers/Administration/actions';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import {
  selectAddRoleLoading,
  selectModeratorsList,
  selectModeratorsLoading,
  selectRevokeRoleLoading,
  selectEmptyUserWarning,
} from 'containers/Administration/selectors';
import { Moderator, OutputSelector, User } from 'containers/Administration/types';
import Header from './Header';
import { Content } from './Content';

type AdministrationProps = {
  locale: string;
  profileInfo: User;
  moderators: Array<Moderator>;
  getModeratorsDispatch: (communityId: number) => void;
  moderatorsLoading: boolean;
  addRoleDispatch: (userAddress: string, role: number, communityId: number) => void;
  addRoleLoading: boolean;
  revokeRoleDispatch: (userAddress: string, role: number, communityId: number) => void;
  revokeRoleLoading: boolean;
  isEmptyUser: boolean;
  closeEmptyUserWarningDispatch: () => void;
};

const single = isSingleCommunityWebsite();

const Administration: React.FC<AdministrationProps> = ({
  locale,
  profileInfo,
  moderators,
  getModeratorsDispatch,
  moderatorsLoading,
  addRoleDispatch,
  addRoleLoading,
  revokeRoleDispatch,
  revokeRoleLoading,
  isEmptyUser,
  closeEmptyUserWarningDispatch,
}): JSX.Element => {
  useModeratorRole(noAccessRoute, single);
  const { t } = useTranslation();
  useEffect(() => {
    getModeratorsDispatch(single);
  }, [addRoleLoading, revokeRoleLoading, getModeratorsDispatch]);

  return (
    <>
      <Seo
        title={t('common.administration')}
        description={t('common.administration')}
        language={locale}
      />

      <Header
        locale={locale}
        single={single}
        moderators={moderators}
        addRole={addRoleDispatch}
        addRoleLoading={addRoleLoading}
        isEmptyUser={isEmptyUser}
        closeEmptyUserWarning={closeEmptyUserWarningDispatch}
      />
      <Content
        locale={locale}
        single={single}
        profileInfo={profileInfo}
        moderators={moderators}
        communityId={single}
        revokeRole={revokeRoleDispatch}
        moderatorsLoading={moderatorsLoading}
        revokeRoleLoading={revokeRoleLoading}
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
      addRoleLoading: selectAddRoleLoading,
      revokeRoleLoading: selectRevokeRoleLoading,
      isEmptyUser: selectEmptyUserWarning,
    }),
    (dispatch: Dispatch) => ({
      getModeratorsDispatch: bindActionCreators(getModerators, dispatch),
      addRoleDispatch: bindActionCreators(addRole, dispatch),
      revokeRoleDispatch: bindActionCreators(revokeRole, dispatch),
      closeEmptyUserWarningDispatch: bindActionCreators(closeEmptyUserWarning, dispatch),
    }),
  ),
)(Administration);
