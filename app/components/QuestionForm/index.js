import React, { memo, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import { Router, Prompt } from 'react-router';

import { BORDER_PRIMARY, LINK_COLOR_SECONDARY } from 'style-constants';

import { EDIT_QUESTION_FORM } from 'containers/EditQuestion/constants';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { isSuiBlockchain } from 'utils/constants';
import {
  getPermissions,
  hasGlobalModeratorRole,
  hasCommunityAdminRole,
  hasCommunityModeratorRole,
  hasProtocolAdminRole,
} from 'utils/properties';

import icoTag from 'images/icoTag.svg?external';

import { isSingleCommunityWebsite, singleCommunityColors } from 'utils/communityManagement';
import { scrollToErrorField } from 'utils/animation';

import { redirectToCreateTag } from 'containers/CreateTag/actions';
import { getCommunityTags } from 'containers/DataCacheProvider/actions';
import { selectTags } from 'containers/DataCacheProvider/selectors';
import { ANY_TYPE, GENERAL_TYPE } from 'containers/CreateCommunity/constants';
import { HIDDEN_COMMUNITIES_ID } from 'containers/Communities/constants';

import Button from 'components/Button/Contained/InfoLarge';
import TransparentButton from 'components/Button/Contained/Transparent';
import { BaseSpecialOne } from 'components/Base/BaseTransparent';
import Tips from 'components/TextEditor/Tips';
import FormBox from 'components/Form';
import TipsBaseSmallPadding from 'components/Base/TipsBaseSmallPadding';
import { IconMd } from 'components/Icon/IconWithSizes';
import DescriptionList from 'components/DescriptionList';

import {
  FORM_TITLE,
  FORM_TYPE,
  FORM_CONTENT,
  FORM_COMMUNITY,
  FORM_TAGS,
  FORM_BOUNTY,
  FORM_BOUNTY_HOURS,
  FORM_PROMOTE,
  KEY_QUESTIONS_TYPE,
  POST_TYPE,
  FORM_SUB_ARTICLE,
} from './constants';

import Header from './Header';
import CommunityForm from './CommunityForm';
import SubArticleForm from './SubArticleForm';
import ExistingQuestions from './ExistingQuestions';
import TypeForm from './TypeForm';
import TitleForm from './TitleForm';
import ContentForm from './ContentForm';
import TagsForm from './TagsForm';
import PostRules from './PostRules';

import createdHistory from '../../createdHistory';
import * as routes from '../../routes-config';
import { TransactionBanner } from 'components/TransactionBanner/TransactionBanner';
import { selectTransactionInPending } from 'containers/EthereumProvider/selectors';

const single = isSingleCommunityWebsite();
const colors = singleCommunityColors();
const history = createdHistory;

const SuggestTag = ({ redirectToCreateTagDispatch, formValues }) => {
  const { t } = useTranslation();
  const communityId = useMemo(() => formValues?.[FORM_COMMUNITY]?.value ?? 0, [formValues]);

  const onClick = ({ currentTarget: { id, communityid } }) => {
    redirectToCreateTagDispatch({
      buttonId: id,
      communityId: communityid,
    });
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <TransparentButton
        onClick={onClick}
        data-communityid={communityId}
        id="question-form-suggest-tag"
        type="button"
        color={LINK_COLOR_SECONDARY}
      >
        <IconMd
          className="mr-2"
          icon={icoTag}
          css={css`
            path {
              fill: ${colors.btnColor || BORDER_PRIMARY};
            }
          `}
        />
        {t('common.createTag')}
      </TransparentButton>
    </div>
  );
};

export const QuestionForm = ({
  locale,
  sendQuestion,
  formTitle,
  questionLoading,
  communities,
  submitButtonId,
  submitButtonName,
  handleSubmit,
  change,
  formValues,
  question,
  questionid,
  redirectToCreateTagDispatch,
  getQuestions,
  existingQuestions,
  doSkipExistingQuestions,
  skipExistingQuestions,
  communityQuestionsType,
  profile,
  isFailed,
  isDocumentation,
  documentationMenu,
  parentId,
  isEditForm,
  questionTitle,
  getCommunityTagsDispatch,
  cachedTags,
  tagsLoading,
  transactionInPending,
}) => {
  const { t } = useTranslation();
  const [isSelectedType, setIsSelectedType] = useState(false);
  const [isError, setIsError] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);
  const [isClickSubmit, setIsClickSubmit] = useState(false);
  const postTitle = question?.title;
  const postContent = question?.content;

  const isPostAuthor = question?.author.id === profile?.id;

  const formCommunityId = isSuiBlockchain
    ? formValues[FORM_COMMUNITY]?.suiId
    : formValues[FORM_COMMUNITY]?.id;
  const communityUniqueId = formCommunityId || single || question?.communityId;
  const isCommunityModerator = communityUniqueId
    ? hasCommunityModeratorRole(getPermissions(profile), communityUniqueId)
    : false;

  const communityId = formValues[FORM_COMMUNITY]?.id || single || question?.communityId;
  const isHasRoleGlobal =
    hasGlobalModeratorRole(getPermissions(profile)) ||
    hasProtocolAdminRole(getPermissions(profile)) ||
    hasCommunityModeratorRole(getPermissions(profile), communityId);

  const handleSubmitWithType = () => {
    if (communityQuestionsType !== ANY_TYPE) {
      change(FORM_TYPE, communityQuestionsType);
    }
    if (!question && !isSelectedType && !isError && isClickSubmit) {
      return setIsError(true);
    }
    return handleSubmit(sendQuestion);
  };

  const getExistingQuestions = (questions) => {
    if (single) {
      return questions.filter((question) => question.communityId === String(single));
    }

    return questions;
  };

  useEffect(() => {
    if (formValues[FORM_TITLE] && getQuestions) {
      getQuestions(formValues[FORM_TITLE], true);
    }
  }, [formValues[FORM_TITLE]]);

  useEffect(() => {
    if (communityId) {
      getCommunityTagsDispatch(communityId);
    }
  }, [communityId, getCommunityTagsDispatch]);

  const showMoreQuestions = (e) => {
    e.preventDefault();
    createdHistory.push(routes.search(formValues[FORM_TITLE]));
  };

  const tagCreatingAllowed =
    hasGlobalModeratorRole(getPermissions(profile)) ||
    (Boolean(single) && hasCommunityAdminRole(getPermissions(profile), single)) ||
    hasProtocolAdminRole(getPermissions(profile));

  const handleSetClicked = () => setIsClickSubmit(true);
  const handleButtonClick = () => {
    handleSetClicked();
    if (isEdited) {
      setSubmitPressed(true);
    }
  };
  const isEdited = formValues[FORM_TITLE] !== postTitle || formValues[FORM_CONTENT] !== postContent;

  const defaultDocumentationArticle = {
    id: -1,
    title: 'Documentation',
  };

  const notHiddenCommunities = communities.filter(
    (community) => !HIDDEN_COMMUNITIES_ID?.includes(community.id),
  );
  return (
    <Router history={history}>
      <Prompt
        message={t('common.leaveWithoutChanges')}
        when={isEdited && (!submitPressed || isFailed)}
      />
      <div>
        <Header
          formTitle={formTitle}
          postTitle={questionTitle}
          questionId={questionid}
          postType={question?.postType}
          isDocumentation={isDocumentation}
        />
        <TipsBaseSmallPadding>
          <BaseSpecialOne>
            <FormBox onSubmit={handleSubmitWithType(sendQuestion)}>
              <CommunityForm
                communities={notHiddenCommunities}
                communityId={communityId}
                change={change}
                questionLoading={questionLoading}
                disableCommForm={false}
                isHasRoleGlobal={isHasRoleGlobal}
                isCommunityModerator={isCommunityModerator}
                isEditForm={isEditForm}
                isPostAuthor={isPostAuthor}
              />

              {Boolean(!question && isDocumentation && isNaN(parentId)) && (
                <SubArticleForm
                  locale={locale}
                  communities={notHiddenCommunities}
                  change={change}
                  questionLoading={questionLoading}
                  disableCommForm={isEditForm}
                  isDocumentation={isDocumentation}
                  documentationMenu={[defaultDocumentationArticle, ...(documentationMenu ?? [])]}
                />
              )}

              {(communityQuestionsType === ANY_TYPE && (
                <TypeForm
                  change={change}
                  questionLoading={questionLoading}
                  locale={locale}
                  formValues={formValues}
                  isError={isError}
                  setIsError={setIsError}
                  hasSelectedType={isSelectedType}
                  setHasSelectedType={setIsSelectedType}
                  isCommunityModerator={isCommunityModerator}
                  postType={question?.postType}
                  postAnswers={question?.answers}
                  isHasRole={isHasRoleGlobal}
                  isDocumentation={isDocumentation}
                />
              )) ||
                (communityQuestionsType === GENERAL_TYPE && (
                  <>
                    <DescriptionList
                      locale={locale}
                      label="common.generalQuestionDescriptionLabel"
                      items="common.generalQuestionDescriptionList"
                    />
                    <br />
                  </>
                )) || (
                  <>
                    <DescriptionList
                      locale={locale}
                      label="common.expertQuestionDescriptionLabel"
                      items="common.expertQuestionDescriptionList"
                    />
                    <br />
                  </>
                )}

              <TitleForm
                questionLoading={questionLoading}
                isDocumentation={isDocumentation}
                isHasRole={isHasRoleGlobal}
                isEditForm={isEditForm}
                isPostAuthor={isPostAuthor}
              />

              {formValues[FORM_TITLE] &&
                formValues[FORM_TITLE].length >= 3 &&
                (getExistingQuestions(existingQuestions || []).length ?? 0) > 0 &&
                !doSkipExistingQuestions &&
                !isDocumentation && (
                  <ExistingQuestions
                    questions={getExistingQuestions(existingQuestions)}
                    skip={skipExistingQuestions}
                    show={showMoreQuestions}
                    communities={communities}
                  />
                )}

              <ContentForm
                questionLoading={questionLoading}
                formValues={formValues}
                isHasRole={isHasRoleGlobal}
                isEditForm={isEditForm}
                isPostAuthor={isPostAuthor}
              />

              {!isDocumentation && Number(formValues[FORM_TYPE]) !== POST_TYPE.documentation && (
                <TagsForm
                  questionLoading={questionLoading}
                  formValues={formValues}
                  change={change}
                  communityTags={cachedTags[communityId]}
                  tagsLoading={tagsLoading}
                />
              )}

              {tagCreatingAllowed && (
                <SuggestTag
                  formValues={formValues}
                  redirectToCreateTagDispatch={redirectToCreateTagDispatch}
                />
              )}

              {transactionInPending && questionLoading ? (
                <TransactionBanner />
              ) : (
                <Button
                  disabled={questionLoading}
                  id={submitButtonId}
                  type="submit"
                  onClick={handleButtonClick}
                >
                  {submitButtonName}
                </Button>
              )}
            </FormBox>
          </BaseSpecialOne>
          <div>
            <PostRules />
            <Tips />
          </div>
        </TipsBaseSmallPadding>
      </div>
    </Router>
  );
};

SuggestTag.propTypes = {
  formValues: PropTypes.object,
  redirectToCreateTagDispatch: PropTypes.func,
};

QuestionForm.propTypes = {
  locale: PropTypes.string,
  formTitle: PropTypes.string,
  submitButtonId: PropTypes.string,
  submitButtonName: PropTypes.string,
  sendQuestion: PropTypes.func,
  redirectToCreateTagDispatch: PropTypes.func,
  change: PropTypes.func,
  question: PropTypes.object,
  questionLoading: PropTypes.bool,
  questionid: PropTypes.string,
  handleSubmit: PropTypes.func,
  formValues: PropTypes.object,
  communities: PropTypes.array,
  getQuestions: PropTypes.func,
  existingQuestions: PropTypes.array,
  doSkipExistingQuestions: PropTypes.bool,
  skipExistingQuestions: PropTypes.func,
  profile: PropTypes.object,
  isFailed: PropTypes.bool,
  isEditForm: PropTypes.bool,
};

const FormClone = reduxForm({
  onSubmitFail: (errors) => scrollToErrorField(errors),
})(QuestionForm);

export default memo(
  connect(
    (state, { question, form: formName, communities, parentId, path }) => {
      const isDocumentation = path.split('/')[1] === 'documentation';
      const values = state.toJS().form[formName]?.values[FORM_COMMUNITY];
      const integerProperties = values?.integer_properties ?? [];
      const questionsType = integerProperties.find(
        (prop) => prop.key === KEY_QUESTIONS_TYPE,
      )?.value;

      const isEditForm = formName === EDIT_QUESTION_FORM;
      const cachedTags = selectTags()(state);

      return {
        profile: makeSelectProfileInfo()(state),
        transactionInPending: selectTransactionInPending()(state),
        formValues: state.toJS().form[formName]?.values ?? {},
        communityQuestionsType: questionsType ?? ANY_TYPE,
        cachedTags,
        initialValues: {
          [FORM_PROMOTE]: (0).toString(),
          ...(question
            ? {
                [FORM_TYPE]: question?.type,
                [FORM_TITLE]: question?.title,
                [FORM_CONTENT]: question?.content,
                [FORM_COMMUNITY]: isSuiBlockchain
                  ? {
                      ...communities?.find((community) => community.id === question?.community?.id),
                    }
                  : {
                      ...question?.community,
                      tags: cachedTags[question?.community?.id],
                    },
                [FORM_TAGS]: question?.tags.map((tag) => ({ ...tag, label: tag.name })),
                [FORM_BOUNTY]: question?.bounty ?? '',
                [FORM_BOUNTY_HOURS]: question?.bountyHours,
              }
            : {}),
          ...(single
            ? {
                [FORM_COMMUNITY]: {
                  ...communities?.find(({ id }) => id === single),
                  tags: cachedTags[single],
                },
                ...(isDocumentation
                  ? {
                      [FORM_TYPE]: POST_TYPE.documentation,
                      [FORM_SUB_ARTICLE]: parentId ? { label: '', value: parentId } : undefined,
                    }
                  : {}),
              }
            : {}),
        },
        enableReinitialize: true,
        isEditForm,
      };
    },
    (dispatch) => ({
      redirectToCreateTagDispatch: bindActionCreators(redirectToCreateTag, dispatch),
      getCommunityTagsDispatch: bindActionCreators(getCommunityTags, dispatch),
    }),
  )(FormClone),
);
