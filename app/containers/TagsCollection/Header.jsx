import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';

import { TEXT_PRIMARY } from 'style-constants';
import suggestTagIcon from 'images/tagsHeaderIcon.svg?inline';
import icoTagIcon from 'images/icoTag.svg?inline';
import addIcon from 'images/addBlue.svg?inline';

import Wrapper from 'components/Header/Simple';
import { MediumImageStyled } from 'components/Img/MediumImage';
import H3 from 'components/H3';
import Span from 'components/Span';

import { GO_TO_CREATE_TAG_SCREEN_BUTTON_ID } from 'containers/Tags/constants';

const Header = ({ openTagForm }) => (
  <Wrapper className="mb-to-sm-0 mb-from-sm-3">
    <H3>
      <MediumImageStyled src={suggestTagIcon} alt="tags-collection" />
      <FormattedMessage {...messages.tags} />
    </H3>

    <div className="right-panel">
      <button
        onClick={openTagForm}
        data-communityid=""
        id={`${GO_TO_CREATE_TAG_SCREEN_BUTTON_ID}_tags_collection`}
      >
        <img className="d-none d-sm-inline-block" src={icoTagIcon} alt="icon" />
        <img className="d-inline-block d-sm-none" src={addIcon} alt="icon" />
        <Span className="ml-1" color={TEXT_PRIMARY}>
          <FormattedMessage {...messages.suggestTag} />
        </Span>
      </button>
    </div>
  </Wrapper>
);

Header.propTypes = {
  openTagForm: PropTypes.func,
};

export default React.memo(Header);
