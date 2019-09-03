import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';

import { TEXT_PRIMARY } from 'style-constants';
import suggestTagIcon from 'images/tagsHeaderIcon.svg?inline';
import iconTagIcon from 'images/icoTag.svg?inline';

import BaseRounded from 'components/Base/BaseRounded';
import { MediumImageStyled } from 'components/Img/MediumImage';
import H3 from 'components/H3';
import Span from 'components/Span';

import { GO_TO_CREATE_TAG_SCREEN_BUTTON_ID } from 'containers/Tags/constants';

const Header = /* istanbul ignore next */ ({ openTagForm }) => (
  <BaseRounded className="d-flex align-items-center justify-content-between mb-3">
    <H3 className="d-flex align-items-center">
      <MediumImageStyled src={suggestTagIcon} alt="suggestTagIcon" />
      <FormattedMessage {...messages.tags} />
    </H3>

    <button
      onClick={openTagForm}
      className="d-inline-flex align-items-center"
      id={`${GO_TO_CREATE_TAG_SCREEN_BUTTON_ID}_tags_collection`}
    >
      <img className="mr-1" src={iconTagIcon} alt="x" />
      <Span color={TEXT_PRIMARY}>
        <FormattedMessage {...messages.suggestTag} />
      </Span>
    </button>
  </BaseRounded>
);

Header.propTypes = {
  openTagForm: PropTypes.func,
};

export default React.memo(Header);
