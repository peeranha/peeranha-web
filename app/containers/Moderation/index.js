import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as routes from 'routes-config';

import { getSectionCode, getQuestionCode } from 'utils/mdManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import { SECTION_ID } from 'utils/constants';
import { getModeratorPermissions } from 'utils/properties';

import Header from './Header';
import Content from './Content';
import { selectIsGlobalModerator } from '../AccountProvider/selectors';

export const Moderation = ({
  communities,
  isGlobalModerator: isGlobal,
  profile: { permissions, integer_properties: globalProperties },
}) => {
  const moderatorPermissions = getModeratorPermissions(
    permissions,
    globalProperties,
    isGlobal,
    communities,
  );
  return (
    <div className="d-flex justify-content-center">
      <div className="flex-grow-1">
        <Header />
        <Content
          content={moderatorPermissions}
          route={routes.moderation}
          getSectionCode={getSectionCode.bind(null, SECTION_ID)}
          getQuestionCode={getQuestionCode.bind(null, SECTION_ID)}
        />
      </div>
    </div>
  );
};

Moderation.propTypes = {
  communities: PropTypes.array,
  isGlobalModerator: PropTypes.bool,
  profile: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  isGlobalModerator: selectIsGlobalModerator(),
  locale: makeSelectLocale(),
  communities: selectCommunities(),
});

export default connect(
  mapStateToProps,
  null,
)(Moderation);
