import React, { memo, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';
import { TEXT_PRIMARY, BORDER_PRIMARY } from 'style-constants';

import icoTag from 'images/icoTag.svg?inline';
import questionIcon from 'images/question.svg?external';
import closeIcon from 'images/closeCircle.svg?inline';
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
import Icon from 'components/Icon';
import { Icon18 } from 'components/Icon/IconWithSizes';
import { MediumIconStyled } from 'components/Icon/MediumIcon';

import {
  FORM_TITLE,
  FORM_TYPE,
  FORM_CONTENT,
  FORM_COMMUNITY,
  FORM_TAGS,
} from './constants';

import Header from './Header';
import { QUESTION_TYPES } from './QuestionTypeField';
import CommunityForm from './CommunityForm';
import TypeForm from './TypeForm';
import TitleForm from './TitleForm';
import ContentForm from './ContentForm';
import TagsForm from './TagsForm';

const single = isSingleCommunityWebsite();

const SuggestTag = memo(({ redirectToCreateTagDispatch, formValues }) => {
  const communityId = useMemo(() => formValues?.[FORM_COMMUNITY]?.value ?? 0, [
    formValues,
  ]);

  return (
    <TransparentButton
      onClick={redirectToCreateTagDispatch}
      data-communityid={communityId}
      id="question-form-suggest-tag"
      type="button"
    >
      <img className="mr-2" src={icoTag} alt="icoTag" />
      <FormattedMessage {...commonMessages.suggestTag} />
    </TransparentButton>
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
  questionid,
  redirectToCreateTagDispatch,
}) => {
  return (
    <div>
      <Header formTitle={formTitle} questionId={questionid} intl={intl} />

      <TipsBase>
        <BaseSpecialOne>
          <FormBox onSubmit={handleSubmit(sendQuestion)}>
            <CommunityForm
              intl={intl}
              communities={communities}
              change={change}
              questionLoading={questionLoading}
            />

            {!questionid && (
              <TypeForm
                intl={intl}
                change={change}
                questionLoading={questionLoading}
                locale={locale}
                formValues={formValues}
              />
            )}

            <TitleForm intl={intl} questionLoading={questionLoading} />

            <ContentForm
              intl={intl}
              questionLoading={questionLoading}
              formValues={formValues}
            />

            <TagsForm
              intl={intl}
              questionLoading={questionLoading}
              formValues={formValues}
              change={change}
            />

            <SuggestTag
              formValues={formValues}
              redirectToCreateTagDispatch={redirectToCreateTagDispatch}
            />

            <Button
              disabled={questionLoading}
              id={submitButtonId}
              type="submit"
            >
              {submitButtonName}
            </Button>
          </FormBox>
        </BaseSpecialOne>

        <Tips />
      </TipsBase>
    </div>
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
  questionLoading: PropTypes.bool,
  questionid: PropTypes.bool,
  handleSubmit: PropTypes.func,
  formValues: PropTypes.object,
  communities: PropTypes.array,
  intl: intlShape.isRequired,
};

const FormClone = reduxForm({
  onSubmitFail: errors => scrollToErrorField(errors),
})(QuestionForm);

export default memo(
  injectIntl(
    connect(
      (state, { question, form: formName, communities }) =>
        console.log(question?.community) || {
          formValues: state.toJS().form[formName]?.values ?? {},
          initialValues: {
            [FORM_TYPE]: QUESTION_TYPES.GENERAL.value,
            ...(question
              ? {
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
                  [FORM_TAGS]: question?.chosenTags,
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
                        ),
                      'id',
                    ),
                  },
                }
              : {}),
          },
          enableReinitialize: true,
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
