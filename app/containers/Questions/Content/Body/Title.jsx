import React, { memo } from 'react';
import PropTypes from 'prop-types';

import * as routes from 'routes-config';
import { translationMessages } from 'i18n';

import A from 'components/A';
import Span from 'components/Span';
import Bounty from 'containers/ViewQuestion/Bounty';

import { APP_FONT } from 'style-constants';

import { singleCommunityFonts } from 'utils/communityManagement';
import messages from '../../messages';

const fonts = singleCommunityFonts();

const Title = ({ locale, title, id, questionBounty }) => (
  <p className="mb-1">
    <Bounty
      bountyMessage={translationMessages[locale][messages.bountyPopover.id]}
      className="questionTitle"
      amount={questionBounty?.amount}
    />
    <A to={routes.questionView(id, null)}>
      <Span
        fontSize="24"
        lineHeight="31"
        mobileFS="18"
        mobileLH="21"
        letterSpacing={fonts.questionTitleLetterSpacing}
        fontFamily={fonts.questionTitleFont || APP_FONT}
        bold
      >
        {title}
      </Span>
    </A>
  </p>
);

Title.propTypes = {
  id: PropTypes.string,
  locale: PropTypes.string,
  title: PropTypes.string,
  questionBounty: PropTypes.string,
};

export default memo(Title);
