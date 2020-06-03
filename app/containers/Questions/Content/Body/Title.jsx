import React, { memo } from 'react';
import PropTypes from 'prop-types';

import * as routes from 'routes-config';

import A from 'components/A';
import Span from 'components/Span';

import { APP_FONT } from 'style-constants';

import { singleCommunityFonts } from 'utils/communityManagement';

const fonts = singleCommunityFonts();

const Title = ({ title, id }) => (
  <p className="mb-1">
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
  title: PropTypes.string,
};

export default memo(Title);
