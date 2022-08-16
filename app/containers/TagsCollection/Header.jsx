import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { BORDER_PRIMARY } from 'style-constants';

import suggestTagIcon from 'images/tagsHeaderIcon.svg?inline';
import icoTagIcon from 'images/icoTag.svg?inline';
import addIcon from 'images/add.svg?external';

import Wrapper, { WrapperRightPanel } from 'components/Header/Simple';
import H3 from 'components/H3';
import { IconSm } from 'components/Icon/IconWithSizes';
import { MediumImageStyled } from 'components/Img/MediumImage';
import TransparentButton from 'components/Button/Contained/Transparent';

import { GO_TO_CREATE_TAG_SCREEN_BUTTON_ID } from 'containers/Tags/constants';
import { getPermissions, hasGlobalModeratorRole } from '../../utils/properties';

const Header = ({ openTagForm, profile }) => {
  const { t } = useTranslation();

  const profileWithModeratorRights = useMemo(
    () => profile && hasGlobalModeratorRole(getPermissions(profile)),
    [profile],
  );

  const onClickOpenTagForm = ({ currentTarget: { id, communityid } }) => {
    openTagForm({
      t,
      buttonId: id,
      communityId: communityid,
    });
  };

  return (
    <Wrapper className="mb-to-sm-0 mb-from-sm-3">
      <H3>
        <MediumImageStyled src={suggestTagIcon} alt="tags-collection" />
        {t('common.tags')}
      </H3>
      {profileWithModeratorRights && (
        <WrapperRightPanel className="right-panel">
          <TransparentButton
            onClick={onClickOpenTagForm}
            data-communityid=""
            id={`${GO_TO_CREATE_TAG_SCREEN_BUTTON_ID}_tags_collection`}
          >
            <img
              className="d-none d-sm-inline-block"
              src={icoTagIcon}
              alt="icon"
            />

            <IconSm
              className="d-inline-flex d-sm-none"
              fill={BORDER_PRIMARY}
              icon={addIcon}
            />

            <span className="ml-1 button-label">{t('common.createTag')}</span>
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
