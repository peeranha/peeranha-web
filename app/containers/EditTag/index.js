import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import * as routes from 'routes-config';

import injectSaga from 'utils/injectSaga';

import { selectEditTagData } from 'containers/TagsOfCommunity/selectors';
import {
  resetEditTagData,
  setEditTagData,
} from 'containers/TagsOfCommunity/actions';

import Seo from 'components/Seo';
import TipsBase from 'components/Base/TipsBase';
import { BaseSpecialOne } from 'components/Base/BaseTransparent';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import {
  HOW_TO_USE_IT_QUESTION,
  WHAT_IS_TAG_QUESTION,
} from 'containers/Faq/constants';

import {
  DESCRIPTION_FIELD,
  FORM_COMMUNITY,
  NAME_FIELD,
} from 'containers/CreateTag/constants';

import {
  selectFaqQuestions,
  selectCommunities,
} from 'containers/DataCacheProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { Header } from 'containers/CreateTag/Header';
import Form from 'containers/CreateTag/Form';
import { Tips } from '../CreateTag/Tips';
import { useModeratorRole } from '../../hooks/useModeratorRole';

import editTagSaga from './saga';
import { getEditTagForm, resetEditTagReducer, editTag } from './actions';
import { selectEditTagFormLoading, selectEditTagProcessing } from './selectors';
import { getExistingTags } from '../Tags/actions';

const EditTag = ({
  match,
  communities,
  getEditTagFormDispatch,
  resetEditTagDataDispatch,
  setEditTagDataDispatch,
  resetEditTagReducerDispatch,
  editTagFormLoading,
  editTagProcessing,
  editTagDispatch,
  editTagData,
  faqQuestions,
  locale,
  getExistingTagsDispatch,
}) => {
  const { t } = useTranslation();
  let { communityId, tagId } = editTagData;

  if (!Object.keys(editTagData).length) {
    communityId = match.params.communityId;
    tagId = match.params.tagid;
    editTagData = { communityId: Number(communityId), tagId };
    setEditTagDataDispatch(tagId, communityId);

    useModeratorRole(routes.noAccess, communityId);
  }
  useEffect(
    () => {
      getExistingTagsDispatch({ communityId });
    },
    [communities.length],
  );

  // component did mount
  useEffect(() => {
    getEditTagFormDispatch(communityId);
  }, []);

  // component will unmount
  useEffect(() => () => resetEditTagReducerDispatch(), []);

  const editTagArgs = useCallback(
    (...args) => {
      const values = args[0].toJS();

      editTagDispatch(
        {
          name: values[NAME_FIELD],
          description: values[DESCRIPTION_FIELD],
          communityId: +values[FORM_COMMUNITY].id,
          tagId,
        },
        args[2].reset,
      );
    },
    [editTagDispatch],
  );

  if (editTagFormLoading) return <LoadingIndicator />;

  return (
    <>
      <Seo
        title={t('tags.titleEdit')}
        description={t('tags.descriptionSave')}
        language={locale}
        index={false}
      />
      <Header
        title={t('tags.titleEdit')}
        closeRedirectPage={
          communityId ? routes.communityTags(communityId) : routes.tags()
        }
        closeButtonAction={resetEditTagDataDispatch}
      />
      <TipsBase>
        <BaseSpecialOne>
          <Form
            communities={communities}
            editTagData={editTagData}
            submitAction={editTagArgs}
            tagFormLoading={editTagProcessing}
            isEditTagForm
          />
        </BaseSpecialOne>

        <Tips faqQuestions={faqQuestions} />
      </TipsBase>
    </>
  );
};

EditTag.propTypes = {
  communities: PropTypes.array,
  resetEditTagDataDispatch: PropTypes.func,
  getEditTagFormDispatch: PropTypes.func,
  editTagFormLoading: PropTypes.bool,
  editTagProcessing: PropTypes.bool,
  editTagData: PropTypes.object,
  editTagDispatch: PropTypes.func,
  locale: PropTypes.string,
  faqQuestions: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  communities: selectCommunities(),
  editTagFormLoading: selectEditTagFormLoading(),
  editTagProcessing: selectEditTagProcessing(),
  editTagData: selectEditTagData(),
  locale: makeSelectLocale(),
  faqQuestions: selectFaqQuestions([
    WHAT_IS_TAG_QUESTION,
    HOW_TO_USE_IT_QUESTION,
  ]),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    resetEditTagDataDispatch: bindActionCreators(resetEditTagData, dispatch),
    getEditTagFormDispatch: bindActionCreators(getEditTagForm, dispatch),
    setEditTagDataDispatch: bindActionCreators(setEditTagData, dispatch),
    resetEditTagReducerDispatch: bindActionCreators(
      resetEditTagReducer,
      dispatch,
    ),
    getExistingTagsDispatch: bindActionCreators(getExistingTags, dispatch),
    editTagDispatch: bindActionCreators(editTag, dispatch),
  };
}

export default compose(
  injectSaga({
    key: 'editTag',
    saga: editTagSaga,
    disableEject: true,
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(EditTag);
