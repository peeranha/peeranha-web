import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';

import suggestTagIcon from 'images/tagsHeaderIcon.svg?inline';
import icoTagIcon from 'images/icoTag.svg?inline';
import addIcon from 'images/add.svg?external';

import Wrapper from 'components/Header/Simple';
import H3 from 'components/H3';
import Icon from 'components/Icon';
import { MediumImageStyled } from 'components/Img/MediumImage';
import TransparentButton from 'components/Button/Contained/Transparent';

import { GO_TO_CREATE_TAG_SCREEN_BUTTON_ID } from 'containers/Tags/constants';

const Header = ({ openTagForm }) => (
  <Wrapper className="mb-to-sm-0 mb-from-sm-3">
    <H3>
      <MediumImageStyled src={suggestTagIcon} alt="tags-collection" />
      <FormattedMessage {...messages.tags} />
    </H3>

    <div className="right-panel">
      <TransparentButton
        onClick={openTagForm}
        data-communityid=""
        id={`${GO_TO_CREATE_TAG_SCREEN_BUTTON_ID}_tags_collection`}
      >
        <img className="d-none d-sm-inline-block" src={icoTagIcon} alt="icon" />

        <Icon className="d-inline-flex d-sm-none" icon={addIcon} width="14" />

        <span className="ml-1">
          <FormattedMessage {...messages.suggestTag} />
        </span>
      </TransparentButton>
    </div>
  </Wrapper>
);

Header.propTypes = {
  openTagForm: PropTypes.func,
};

export default React.memo(Header);
