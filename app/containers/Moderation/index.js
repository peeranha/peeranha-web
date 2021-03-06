import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';

import * as routes from 'routes-config';

import {
  getSectionCode,
  getQuestionCode as getPermissionCode,
} from 'utils/mdManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import { MODERATOR_KEY, SECTION_ID } from 'utils/constants';
import { getModeratorPermissions } from 'utils/properties';

import Header from './Header';
import Content from './Content';
import { selectIsGlobalModerator } from '../AccountProvider/selectors';

export const Moderation = ({
  locale,
  communities,
  isGlobalModerator: isGlobal,
  profile: { permissions, integer_properties },
}) => {
  const translations = translationMessages[locale]
    ? translationMessages[locale]
    : null;
  const globalModeratorProps = integer_properties.find(
    ({ key }) => key === MODERATOR_KEY,
  );
  const moderatorPermissions = getModeratorPermissions(
    permissions,
    globalModeratorProps,
    isGlobal,
    communities,
    translations,
  );
  return (
    <div className="d-flex justify-content-center">
      <div className="flex-grow-1">
        <Header />
        <Content
          content={moderatorPermissions}
          route={routes.moderation}
          getSectionCode={getSectionCode.bind(null, SECTION_ID)}
          getPermissionCode={getPermissionCode.bind(null, SECTION_ID)}
        />
      </div>
    </div>
  );
};

Moderation.propTypes = {
  locale: PropTypes.string,
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
