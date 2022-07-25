import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { css } from '@emotion/react';

import messages from 'common-messages';
import { BG_PRIMARY_SPECIAL_2, BORDER_PRIMARY } from 'style-constants';
import cn from 'classnames';

import TagsIcon from 'icons/Tags';
import PlusIcon from 'icons/Plus';

import Wrapper, { WrapperRightPanel } from 'components/Header/Simple';
import H3 from 'components/H3';
import TransparentButton from 'components/Button/Contained/Transparent';

import { GO_TO_CREATE_TAG_SCREEN_BUTTON_ID } from 'containers/Tags/constants';
import { getPermissions, hasGlobalModeratorRole } from '../../utils/properties';

const Header = ({ openTagForm, profile }) => {
  const profileWithModeratorRights =
    profile &&
    useMemo(() => hasGlobalModeratorRole(getPermissions(profile)), [profile]);

  return (
    <Wrapper className="mb-to-sm-0 mb-from-sm-3">
      <H3>
        <div
          className={cn('mr16 brc df aic jcc')}
          css={css`
            display: flex;
            background: ${BG_PRIMARY_SPECIAL_2};
            border: 1px solid #c2c6d8;
            width: 43px;
            height: 43px;
          `}
        >
          <TagsIcon fill={BORDER_PRIMARY} size={[30, 30]} />
        </div>
        <FormattedMessage {...messages.tags} />
      </H3>
      {profileWithModeratorRights && (
        <WrapperRightPanel className="right-panel">
          <TransparentButton
            onClick={openTagForm}
            data-communityid=""
            id={`${GO_TO_CREATE_TAG_SCREEN_BUTTON_ID}_tags_collection`}
          >
            <TagsIcon
              fill={BORDER_PRIMARY}
              size={[20, 20]}
              className="d-none d-sm-inline-block"
            />

            <PlusIcon fill={BORDER_PRIMARY} className="d-sm-none" />

            <span className="ml-1 button-label">
              <FormattedMessage {...messages.createTag} />
            </span>
          </TransparentButton>
        </WrapperRightPanel>
      )}
    </Wrapper>
  );
};

Header.propTypes = {
  openTagForm: PropTypes.func,
};

export default React.memo(Header);
