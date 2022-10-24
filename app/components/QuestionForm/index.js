import React, { memo, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Router, Prompt } from 'react-router';

import commonMessages from 'common-messages';
import { BORDER_PRIMARY, LINK_COLOR_SECONDARY } from 'style-constants';

import { EDIT_QUESTION_FORM } from 'containers/EditQuestion/constants';

import icoTag from 'images/icoTag.svg?external';

import _uniqBy from 'lodash/uniqBy';
import {
  isSingleCommunityWebsite,
  singleCommunityColors,
} from 'utils/communityManagement';
import { scrollToErrorField } from 'utils/animation';

import { redirectToCreateTag } from 'containers/CreateTag/actions';

import Button from 'components/Button/Contained/InfoLarge';
import TransparentButton from 'components/Button/Contained/Transparent';
import { BaseSpecialOne } from 'components/Base/BaseTransparent';
import Tips from 'components/TextEditor/Tips';
import FormBox from 'components/Form';
import TipsBase from 'components/Base/TipsBase';
import { IconMd } from 'components/Icon/IconWithSizes';

import messages from './messages';

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
} from './constants';

import Header from './Header';
import CommunityForm from './CommunityForm';
import ExistingQuestions from './ExistingQuestions';
import TypeForm from 'components/QuestionForm/TypeForm';
import TitleForm from './TitleForm';
import ContentForm from './ContentForm';
import TagsForm from './TagsForm';

import { ANY_TYPE, GENERAL_TYPE } from 'containers/CreateCommunity/constants';
import createdHistory from '../../createdHistory';
import * as routes from '../../routes-config';
import DescriptionList from 'components/DescriptionList';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import {
  getPermissions,
  hasCommunityAdminRole,
  hasCommunityModeratorRole,
  hasGlobalModeratorRole,
  hasProtocolAdminRole,
} from 'utils/properties';
import { translationMessages } from '../../i18n';

const single = isSingleCommunityWebsite();
const colors = singleCommunityColors();
const history = createdHistory;

const SuggestTag = memo(({ redirectToCreateTagDispatch, formValues }) => {
  const communityId = useMemo(() => formValues?.[FORM_COMMUNITY]?.value ?? 0, [
    formValues,
  ]);

  return (
    <div style={{ marginBottom: '20px' }}>
      <TransparentButton
        onClick={redirectToCreateTagDispatch}
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
        <FormattedMessage {...commonMessages.createTag} />
      </TransparentButton>
    </div>
  );
});

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
  intl,
  question,
  questionid,
  redirectToCreateTagDispatch,
  getQuestions,
  existingQuestions,
  doSkipExistingQuestions,
  skipExistingQuestions,
  communityQuestionsType,
  disableCommForm,
  profile,
  isFailed,
}) => {
  const [isSelectedType, setIsSelectedType] = useState(false);
  const [isError, setIsError] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);
  const [isClickSubmit, setIsClickSubmit] = useState(false);
  const postTitle = question?.title;
  const postContent = question?.content;

  const communityId = single || formValues[FORM_COMMUNITY]?.id;
  const isCommunityModerator = communityId
    ? hasCommunityModeratorRole(getPermissions(profile), communityId) ||
      hasCommunityAdminRole(getPermissions(profile), communityId)
    : false;

  const handleSubmitWithType = () => {
    if (communityQuestionsType !== ANY_TYPE) {
      change(FORM_TYPE, communityQuestionsType);
    }
    if (!question && !isSelectedType && !isError && isClickSubmit) {
      return setIsError(true);
    }
    return handleSubmit(sendQuestion);
  };

  const getExistingQuestions = questions => {
    if (single) {
      return questions.filter(
        question => question.communityId === String(single),
      );
    }

    return questions;
  };

  useEffect(
    () => {
      if (formValues[FORM_TITLE] && getQuestions) {
        getQuestions(formValues[FORM_TITLE], true);
      }
    },
    [formValues[FORM_TITLE]],
  );

  const showMoreQuestions = e => {
    e.preventDefault();
    createdHistory.push(routes.search(formValues[FORM_TITLE]));
  };

  const tagCreatingAllowed =
    hasGlobalModeratorRole(getPermissions(profile)) ||
    (Boolean(single) &&
      hasCommunityAdminRole(getPermissions(profile), single)) ||
    hasProtocolAdminRole(getPermissions(profile));

  const handleSetClicked = () => setIsClickSubmit(true);
  const handleButtonClick = () => {
    handleSetClicked();
    if (isEdited) {
      setSubmitPressed(true);
    }
  };
  const isEdited =
    formValues[FORM_TITLE] !== postTitle ||
    formValues[FORM_CONTENT] !== postContent;

  const isFaq = question ? question.postType === POST_TYPE.faq : false;
  return (
    <Router history={history}>
      <Prompt
        message={translationMessages[locale][messages.leaveWithoutChanges.id]}
        when={isEdited && (!submitPressed || isFailed)}
      />
      <div>
        <Header
          formTitle={formTitle}
          questionId={questionid}
          postType={question?.postType}
          intl={intl}
        />
        <TipsBase>
          <BaseSpecialOne>
            <FormBox onSubmit={handleSubmitWithType(sendQuestion)}>
              <CommunityForm
                intl={intl}
                communities={communities}
                change={change}
                questionLoading={questionLoading}
                disableCommForm={disableCommForm}
              />

              {(communityQuestionsType === ANY_TYPE && (
                <TypeForm
                  intl={intl}
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
                />
              )) ||
                (communityQuestionsType === GENERAL_TYPE && (
                  <>
                    <DescriptionList
                      locale={locale}
                      label={messages.generalQuestionDescriptionLabel.id}
                      items={messages.generalQuestionDescriptionList.id}
                    />
                    <br />
                  </>
                )) || (
                  <>
                    <DescriptionList
                      locale={locale}
                      label={messages.expertQuestionDescriptionLabel.id}
                      items={messages.expertQuestionDescriptionList.id}
                    />
                    <br />
                  </>
                )}

              <TitleForm intl={intl} questionLoading={questionLoading} />

              {formValues[FORM_TITLE] &&
                formValues[FORM_TITLE].length >= 3 &&
                (getExistingQuestions(existingQuestions || []).length ?? 0) >
                  0 &&
                !doSkipExistingQuestions && (
                  <ExistingQuestions
                    questions={getExistingQuestions(existingQuestions)}
                    skip={skipExistingQuestions}
                    show={showMoreQuestions}
                    intl={intl}
                    communities={communities}
                  />
                )}

              <ContentForm
                intl={intl}
                questionLoading={questionLoading}
                formValues={formValues}
              />

              {!isFaq &&
                Number(formValues[FORM_TYPE]) !== POST_TYPE.faq && (
                  <TagsForm
                    intl={intl}
                    questionLoading={questionLoading}
                    formValues={formValues}
                    change={change}
                  />
                )}

              {tagCreatingAllowed && (
                <SuggestTag
                  formValues={formValues}
                  redirectToCreateTagDispatch={redirectToCreateTagDispatch}
                />
              )}

              <Button
                disabled={questionLoading}
                id={submitButtonId}
                type="submit"
                onClick={handleButtonClick}
              >
                {submitButtonName}
              </Button>
            </FormBox>
          </BaseSpecialOne>

          <Tips />
        </TipsBase>
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
  intl: intlShape.isRequired,
  getQuestions: PropTypes.func,
  existingQuestions: PropTypes.array,
  doSkipExistingQuestions: PropTypes.bool,
  skipExistingQuestions: PropTypes.func,
  disableCommForm: PropTypes.bool,
  profile: PropTypes.object,
  isFailed: PropTypes.bool,
};

const FormClone = reduxForm({
  onSubmitFail: errors => scrollToErrorField(errors),
})(QuestionForm);

export default memo(
  injectIntl(
    connect(
      (state, { question, form: formName, communities }) => {
        const values = state.toJS().form[formName]?.values[FORM_COMMUNITY];
        const integerProperties = values?.integer_properties ?? [];
        const questionsType = integerProperties.find(
          prop => prop.key === KEY_QUESTIONS_TYPE,
        )?.value;

        // disable community form on edit question page
        const disableCommForm = formName === EDIT_QUESTION_FORM;

        return {
          profile: makeSelectProfileInfo()(state),
          formValues: state.toJS().form[formName]?.values ?? {},
          communityQuestionsType: questionsType ?? ANY_TYPE,
          initialValues: {
            [FORM_PROMOTE]: (0).toString(),
            ...(question
              ? {
                  [FORM_TYPE]: question?.type,
                  [FORM_TITLE]: question?.title,
                  [FORM_CONTENT]: question?.content,
                  [FORM_COMMUNITY]: {
                    ...question?.community,
                    tags: _uniqBy(
                      question?.community?.tags?.concat(
                        communities.find(
                          ({ id }) => id === question?.community?.id,
                        )?.tags,
                      ),
                      'id',
                    ),
                  },
                  [FORM_TAGS]: question?.tags,
                  [FORM_BOUNTY]: question?.bounty ?? '',
                  [FORM_BOUNTY_HOURS]: question?.bountyHours,
                }
              : {}),
            ...(single
              ? {
                  [FORM_COMMUNITY]: {
                    ...communities?.find(({ id }) => id === single),
                    tags: _uniqBy(
                      communities
                        .find(({ id }) => id === single)
                        ?.tags?.concat(
                          communities.find(
                            ({ id }) => id === question?.community?.id,
                          )?.tags,
                        )
                        .filter(x => x),
                      'id',
                    ),
                  },
                }
              : {}),
          },
          enableReinitialize: true,
          disableCommForm,
        };
      },
      dispatch => ({
        redirectToCreateTagDispatch: bindActionCreators(
          redirectToCreateTag,
          dispatch,
        ),
      }),
    )(FormClone),
  ),
);
