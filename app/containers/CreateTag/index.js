import React, { useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { compose, bindActionCreators } from 'redux';
import { tags } from 'routes-config';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { isSingleCommunityWebsite } from 'utils/communityManagement';

import { COMMUNITY_ADMIN_VALUE } from 'utils/constants';

import Seo from 'components/Seo';
import TipsBase from 'components/Base/TipsBase';
import { BaseSpecialOne } from 'components/Base/BaseTransparent';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  selectCommunities,
  selectFaqQuestions,
} from 'containers/DataCacheProvider/selectors';

import {
  makeSelectProfileInfo,
  selectPermissions,
} from 'containers/AccountProvider/selectors';

import {
  WHAT_IS_TAG_QUESTION,
  HOW_TO_USE_IT_QUESTION,
} from 'containers/Faq/constants';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { suggestTag, getForm } from './actions';

import {
  NAME_FIELD,
  DESCRIPTION_FIELD,
  FORM_COMMUNITY,
  STATE_KEY,
} from './constants';

import Form from './Form';
import Tips from './Tips';
import Header from './Header';

import tagsReducer from '../Tags/reducer';
import tagsSaga from '../Tags/saga';
import { getAllRoles, hasGlobalModeratorRole } from '../../utils/properties';

import { useGlobalAdmin } from '../../hooks/useGlobalAdmin';

const single = isSingleCommunityWebsite();

const CreateTag = ({
  locale,
  createTagLoading,
  communities,
  match,
  faqQuestions,
  suggestTagDispatch,
  permissions = [],
  getFormDispatch,
  isFormLoading,
  isFormAvailable,
}) => {
  useGlobalAdmin(tags);

  useEffect(() => {
    getFormDispatch();
  }, []);

  const commId = useMemo(() => single || +match.params.communityid, [match]);

  const createTag = useCallback(
    (...args) => {
      const values = args[0].toJS();

      suggestTagDispatch(
        +values[FORM_COMMUNITY].id,
        {
          name: values[NAME_FIELD],
          description: values[DESCRIPTION_FIELD],
        },
        args[2].reset,
      );
    },
    [suggestTagDispatch],
  );

  const isGlobalAdmin = useMemo(() => hasGlobalModeratorRole(permissions), [
    permissions,
  ]);
  const roles = getAllRoles(permissions, communities.length);

  const rightCommunitiesIds = useMemo(
    () =>
      isGlobalAdmin
        ? communities.map(x => x.id)
        : roles.map(role => role.communityid),
    [communities, roles],
  );

  if (isFormLoading) return <LoadingIndicator />;

  return (
    <div>
      <Seo
        title={translationMessages[locale][messages.title.id]}
        description={translationMessages[locale][messages.description.id]}
        language={locale}
        index={false}
      />

      <Header />

      {communities[0] && (
        <TipsBase>
          <BaseSpecialOne>
            <Form
              communityId={commId}
              communities={communities.filter(x =>
                rightCommunitiesIds.includes(x.id),
              )}
              tagFormLoading={createTagLoading}
              submitAction={createTag}
              translations={translationMessages[locale]}
              getSuggestedTagsDispatch={() => {}}
            />
          </BaseSpecialOne>

          <Tips faqQuestions={faqQuestions} />
        </TipsBase>
      )}

      {!communities.length && <LoadingIndicator />}
    </div>
  );
};

CreateTag.propTypes = {
  locale: PropTypes.string,
  match: PropTypes.object,
  createTagLoading: PropTypes.bool,
  suggestTagDispatch: PropTypes.func,
  communities: PropTypes.array,
  faqQuestions: PropTypes.array,
  permissions: PropTypes.array,
  isFormLoading: PropTypes.bool,
  getFormDispatch: PropTypes.func.isRequired,
  getSuggestedTagsDispatch: PropTypes.func,
  isFormAvailable: PropTypes.bool,
};

export default compose(
  injectReducer({ key: STATE_KEY, reducer }),
  injectSaga({ key: STATE_KEY, saga }),
  injectReducer({ key: 'tags', reducer: tagsReducer }),
  injectSaga({ key: 'tags', saga: tagsSaga }),
  connect(
    createStructuredSelector({
      locale: makeSelectLocale(),
      faqQuestions: selectFaqQuestions([
        WHAT_IS_TAG_QUESTION,
        HOW_TO_USE_IT_QUESTION,
      ]),
      communities: selectCommunities(),
      createTagLoading: selectors.selectSuggestTagLoading(),
      permissions: selectPermissions(),
      isFormLoading: selectors.selectIsFormLoading(),
      isFormAvailable: selectors.selectIsFormAvailable(),
      profile: makeSelectProfileInfo(),
    }),
    dispatch => ({
      suggestTagDispatch: bindActionCreators(suggestTag, dispatch),
      getFormDispatch: bindActionCreators(getForm, dispatch),
    }),
  ),
)(CreateTag);
