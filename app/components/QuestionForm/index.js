import React, { memo, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import { Router, Prompt } from 'react-router';

import { BORDER_PRIMARY, LINK_COLOR_SECONDARY } from 'style-constants';

import { EDIT_QUESTION_FORM } from 'containers/EditQuestion/constants';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { getPermissions, hasGlobalModeratorRole } from 'utils/properties';

import icoTag from 'images/icoTag.svg?external';

import _uniqBy from 'lodash/uniqBy';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { scrollToErrorField } from 'utils/animation';

import { redirectToCreateTag } from 'containers/CreateTag/actions';

import Button from 'components/Button/Contained/InfoLarge';
import TransparentButton from 'components/Button/Contained/Transparent';
import { BaseSpecialOne } from 'components/Base/BaseTransparent';
import Tips from 'components/TextEditor/Tips';
import FormBox from 'components/Form';
import TipsBase from 'components/Base/TipsBase';
import { IconMd } from 'components/Icon/IconWithSizes';

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
} from './constants';

import Header from './Header';
import CommunityForm from './CommunityForm';
import ExistingQuestions from './ExistingQuestions';
import TypeForm from './TypeForm';
import TitleForm from './TitleForm';
import ContentForm from './ContentForm';
import TagsForm from './TagsForm';

import {
  ANY_TYPE,
  GENERAL_TYPE,
} from '../../containers/CreateCommunity/constants';
import createdHistory from '../../createdHistory';
import * as routes from '../../routes-config';
import DescriptionList from '../DescriptionList';

const single = isSingleCommunityWebsite();

const history = createdHistory;

const SuggestTag = ({ redirectToCreateTagDispatch, formValues }) => {
  const { t } = useTranslation();
  const communityId = useMemo(() => formValues?.[FORM_COMMUNITY]?.value ?? 0, [
    formValues,
  ]);

  const onClick = ({ currentTarget: { id, communityid } }) => {
    redirectToCreateTagDispatch({
      t,
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
        <IconMd className="mr-2" icon={icoTag} fill={BORDER_PRIMARY} />
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
  disableCommForm,
  profile,
  isFailed,
}) => {
  const { t } = useTranslation();
  const [isSelectedType, setIsSelectedType] = useState(false);
  const [isError, setIsError] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);
  const [isClickSubmit, setIsClickSubmit] = useState(false);
  const postTitle = question?.title;
  const postContent = question?.content;

  const handleSubmitWithType = () => {
    if (communityQuestionsType !== ANY_TYPE) {
      change(FORM_TYPE, communityQuestionsType);
    }
    if (!isSelectedType && !isError && isClickSubmit) {
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

  const profileWithModeratorRights =
    profile && hasGlobalModeratorRole(getPermissions(profile));

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

  return (
    <Router history={history}>
      <Prompt
        message={t('common.leaveWithoutChanges')}
        when={isEdited && (!submitPressed || isFailed)}
      />
      <div>
        <Header
          formTitle={formTitle}
          questionId={questionid}
          postType={question?.postType}
        />
        <TipsBase>
          <BaseSpecialOne>
            <FormBox onSubmit={handleSubmitWithType(sendQuestion)}>
              <CommunityForm
                communities={communities}
                change={change}
                questionLoading={questionLoading}
                disableCommForm={disableCommForm}
              />

              {!question &&
                ((communityQuestionsType === ANY_TYPE && (
                  <TypeForm
                    change={change}
                    questionLoading={questionLoading}
                    locale={locale}
                    formValues={formValues}
                    isError={isError}
                    setIsError={setIsError}
                    hasSelectedType={isSelectedType}
                    setHasSelectedType={setIsSelectedType}
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
                  ))}

              <TitleForm questionLoading={questionLoading} />

              {formValues[FORM_TITLE] &&
                formValues[FORM_TITLE].length >= 3 &&
                (getExistingQuestions(existingQuestions || []).length ?? 0) >
                  0 &&
                !doSkipExistingQuestions && (
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
              />

              <TagsForm
                questionLoading={questionLoading}
                formValues={formValues}
                change={change}
              />

              {profileWithModeratorRights && (
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
);
