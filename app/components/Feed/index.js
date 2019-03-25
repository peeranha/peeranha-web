import React from 'react';
import * as routes from 'routes-config';
import Questions from 'containers/Questions';

const feed = routes.feed();

const Feed = /* istanbul ignore next */ () => <Questions parentPage={feed} />;

export default Feed;
