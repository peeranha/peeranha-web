import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { compose, bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
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
  selectUserRating,
  selectUserEnergy,
  makeSelectAccount,
  selectIsGlobalModerator,
  selectPermissions,
  makeSelectAccountLoading,
} from 'containers/AccountProvider/selectors';

import {
  WHAT_IS_TAG_QUESTION,
  HOW_TO_USE_IT_QUESTION,
} from 'containers/Faq/constants';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { suggestTag } from './actions';

import {
  NAME_FIELD,
  DESCRIPTION_FIELD,
  FORM_COMMUNITY,
  MIN_RATING_TO_CREATE_TAG,
  MIN_ENERGY_TO_CREATE_TAG,
} from './constants';

import Form from './Form';
import Tips from './Tips';
import Header from './Header';

const single = isSingleCommunityWebsite();

const CreateTag = ({
  locale,
  createTagLoading,
  communities,
  match,
  faqQuestions,
  suggestTagDispatch,
  account,
  userRating,
  userEnergy,
  isGlobalModerator,
  permissions,
  accountIsLoading,
}) => {
  const commId = useMemo(() => single || +match.params.communityid, [match]);

  const createTag = useCallback(
    (...args) => {
      const values = args[0].toJS();

      suggestTagDispatch(
        {
          name: values[NAME_FIELD],
          description: values[DESCRIPTION_FIELD],
          communityId: +values[FORM_COMMUNITY].id,
        },
        args[2].reset,
      );
    },
    [suggestTagDispatch],
  );

  const isCommunityAdmin = useMemo(
    () => permissions.find(x => x.value === COMMUNITY_ADMIN_VALUE),
    [permissions],
  );

  const rightCommunitiesIds = useMemo(
    () => isCommunityAdmin ? permissions.map(x => x.community) : communities.map(x => x.id),
    [],
  );

  if (accountIsLoading) return <LoadingIndicator />;

  if (
    !account ||
    ((userRating < MIN_RATING_TO_CREATE_TAG ||
      userEnergy < MIN_ENERGY_TO_CREATE_TAG) &&
      !isGlobalModerator && !isCommunityAdmin)
  )
    return <Redirect to={tags()} />;
    
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
              communities={communities.filter(x => rightCommunitiesIds.includes(x.id))}
              createTagLoading={createTagLoading}
              createTag={createTag}
              translations={translationMessages[locale]}
            />
          </BaseSpecialOne>

          <Tips faqQuestions={faqQuestions} />
        </TipsBase>
      )}

      {!communities.length && <LoadingIndicator />}
    </div>
  );
};

/*
export class CreateTag extends React.PureComponent {


  render() {
}
*/
CreateTag.propTypes = {
  locale: PropTypes.string,
  match: PropTypes.object,
  createTagLoading: PropTypes.bool,
  suggestTagDispatch: PropTypes.func,
  communities: PropTypes.array,
  faqQuestions: PropTypes.array,
  account: PropTypes.string,
  userRating: PropTypes.number,
  userEnergy: PropTypes.number,
  isGlobalModerator: PropTypes.bool,
  permissions: PropTypes.array,
  accountIsLoading: PropTypes.bool,
};

export default compose(
  injectReducer({ key: 'createTag', reducer }),
  injectSaga({ key: 'createTag', saga }),
  connect(
    createStructuredSelector({
      locale: makeSelectLocale(),
      faqQuestions: selectFaqQuestions([
        WHAT_IS_TAG_QUESTION,
        HOW_TO_USE_IT_QUESTION,
      ]),
      communities: selectCommunities(),
      createTagLoading: selectors.selectSuggestTagLoading(),
      account: makeSelectAccount(),
      userRating: selectUserRating(),
      userEnergy: selectUserEnergy(),
      isGlobalModerator: selectIsGlobalModerator(),
      permissions: selectPermissions(),
      accountIsLoading: makeSelectAccountLoading(),
    }),
    dispatch => ({
      suggestTagDispatch: bindActionCreators(suggestTag, dispatch),
    }),
  ),
)(CreateTag);
