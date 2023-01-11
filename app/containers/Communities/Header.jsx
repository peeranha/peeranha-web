import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { BORDER_PRIMARY } from 'style-constants';

import createCommunityIcon from 'images/createCommunity.svg?inline';
import addIcon from 'images/add.svg?external';

import { IconSm } from 'components/Icon/IconWithSizes';
import TransparentButton from 'components/Button/Contained/Transparent';
import SubHeaderWrapper, {
  SubHeaderWrapperRightPanel,
} from 'components/Header/Complex';

import { GO_TO_CREATE_COMMUNITY_SCREEN_BUTTON_ID } from './constants';
import {
  getPermissions,
  hasGlobalModeratorRole,
  hasProtocolAdminRole,
} from '../../utils/properties';

const Header = ({
  goToCreateCommunityScreen,
  SubHeader,
  changeSorting,
  sorting,
  communitiesNumber,
  profile,
}) => {
  const { t } = useTranslation();
  const profileWithEditingRights =
    profile &&
    (hasProtocolAdminRole(getPermissions(profile)) ||
      hasGlobalModeratorRole(getPermissions(profile)));

  return (
    <div className="mb-to-sm-0 mb-from-sm-3">
      {profileWithEditingRights && (
        <SubHeaderWrapper position="top">
          <SubHeaderWrapperRightPanel className="right-panel">
            <TransparentButton
              id={`${GO_TO_CREATE_COMMUNITY_SCREEN_BUTTON_ID}_header`}
              onClick={goToCreateCommunityScreen}
              className="d-flex align-items-center"
            >
              <span>
                <img
                  className="d-none d-sm-inline-block"
                  src={createCommunityIcon}
                  alt="icon"
                />

                <IconSm
                  className="d-inline-flex d-sm-none"
                  fill={BORDER_PRIMARY}
                  icon={addIcon}
                />
              </span>

              <span className="ml-1 button-label">
                {t('common.suggestCommunity')}
              </span>
            </TransparentButton>
          </SubHeaderWrapperRightPanel>
        </SubHeaderWrapper>
      )}

      <SubHeader
        changeSorting={changeSorting}
        sorting={sorting}
        communitiesNumber={communitiesNumber}
      />
    </div>
  );
};

Header.propTypes = {
  goToCreateCommunityScreen: PropTypes.func,
  SubHeader: PropTypes.any,
  changeSorting: PropTypes.func,
  sorting: PropTypes.object,
  communitiesNumber: PropTypes.number,
  setLang: PropTypes.func,
  language: PropTypes.object,
};

export default Header;
