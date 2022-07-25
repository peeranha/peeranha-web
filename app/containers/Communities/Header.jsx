import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { BORDER_PRIMARY } from 'style-constants';

import PlusIcon from 'icons/Plus';

import createCommunityIcon from 'images/createCommunity.svg?inline';

import TransparentButton from 'components/Button/Contained/Transparent';
import SubHeaderWrapper, {
  SubHeaderWrapperRightPanel,
} from 'components/Header/Complex';

import messages from './messages';
import languages from './languagesOptions';
import { GO_TO_CREATE_COMMUNITY_SCREEN_BUTTON_ID } from './constants';
import { getPermissions, hasGlobalModeratorRole } from '../../utils/properties';

const Header = ({
  goToCreateCommunityScreen,
  SubHeader,
  changeSorting,
  sorting,
  communitiesNumber,
  setLang,
  language,
  profile,
}) => {
  const profileWithModeratorRights =
    profile &&
    useMemo(() => hasGlobalModeratorRole(getPermissions(profile)), [profile]);
  return (
    <div className="mb-to-sm-0 mb-from-sm-3">
      {profileWithModeratorRights && (
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

                <PlusIcon fill={BORDER_PRIMARY} className="d-sm-none" />
              </span>

              <span className="ml-1 button-label">
                <FormattedMessage {...messages.suggestCommunity} />
              </span>
            </TransparentButton>
          </SubHeaderWrapperRightPanel>
        </SubHeaderWrapper>
      )}

      <SubHeader
        changeSorting={changeSorting}
        sorting={sorting}
        communitiesNumber={communitiesNumber}
        setLang={setLang}
        language={language}
        languages={languages}
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
