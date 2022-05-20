import React, { memo } from 'react';
import * as routes from 'routes-config';
import Questions from 'containers/Questions';
import PropTypes from 'prop-types';

import { POST_TYPE } from '../../utils/constants';

const Feed = ({ match }) => (
  <Questions
    parentPage={routes.feed()}
    match={match}
    postsTypes={Object.values(POST_TYPE)}
  />
);

Feed.propTypes = {
  match: PropTypes.object,
};

export default memo(Feed);
