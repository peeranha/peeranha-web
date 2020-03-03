import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import commonMessages from 'common-messages';
import { TEXT_PRIMARY } from 'style-constants';

import questionIcon from 'images/question.svg?inline';
import closeIcon from 'images/closeCircle.svg?inline';
import icoTag from 'images/icoTag.svg?inline';

import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { scrollToErrorField } from 'utils/animation';

import { redirectToCreateTag } from 'containers/CreateTag/actions';

import { MediumImageStyled } from 'components/Img/MediumImage';
import Button from 'components/Button/Contained/InfoLarge';
import TransparentButton from 'components/Button/Contained/Transparent';
import TagSelector from 'components/TagSelector';
import { BaseSpecialOne } from 'components/Base/BaseTransparent';
import Tips from 'components/TextEditor/Tips';
import Span from 'components/Span';
import H3 from 'components/H3';
import A from 'components/A';
import Wrapper from 'components/Header/Simple';
import FormBox from 'components/Form';
import TipsBase from 'components/Base/TipsBase';

import {
  strLength25x30000,
  strLength15x100,
  strLength1x5,
  required,
  maxByteLength,
  withoutDoubleSpace,
  requiredForObjectField,
} from 'components/FormFields/validate';

import TextInputField from 'components/FormFields/TextInputField';
import TextEditorField from 'components/FormFields/TextEditorField';
import CommunityField from 'components/FormFields/CommunityField';

import {
  FORM_TITLE,
  FORM_TYPE,
  FORM_CONTENT,
  FORM_COMMUNITY,
  FORM_TAGS,
} from './constants';

import messages from './messages';
import QuestionTypeField, { QUESTION_TYPES } from './QuestionTypeField';
import DescriptionList from '../DescriptionList';

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
  const setTags = updatedTags => change(FORM_TAGS, updatedTags);

  const communityId = formValues[FORM_COMMUNITY]
    ? formValues[FORM_COMMUNITY].value
    : 0;

  return (
    <div>
      <Wrapper className="mb-to-sm-0 mb-from-sm-3">
        <H3>
          <MediumImageStyled src={questionIcon} alt="questionIcon" />
          <span>{formTitle}</span>
        </H3>

        {questionid && (
          <div className="right-panel">
            <A to={routes.questionView(questionid)}>
              <button>
                <img className="mr-1" src={closeIcon} alt="x" />
                <Span color={TEXT_PRIMARY}>
                  {intl.formatMessage({ id: commonMessages.close.id })}
                </Span>
              </button>
            </A>
          </div>
        )}
      </Wrapper>

      <TipsBase>
        <BaseSpecialOne>
          <FormBox onSubmit={handleSubmit(sendQuestion)}>
            <Field
              className={isSingleCommunityWebsite() ? 'd-none' : ''}
              name={FORM_COMMUNITY}
              component={CommunityField}
              onChange={() => change(FORM_TAGS, '')}
              disabled={questionLoading}
              label={intl.formatMessage({ id: messages.communityLabel.id })}
              tip={intl.formatMessage({ id: messages.communityTip.id })}
              options={communities}
              validate={[requiredForObjectField]}
              warn={[requiredForObjectField]}
              splitInHalf
            />
            {!questionid && (
              <>
                <Field
                  name={FORM_TYPE}
                  component={QuestionTypeField}
                  disabled={questionLoading}
                  onChange={val => change(FORM_TYPE, val[0])}
                  label={intl.formatMessage({ id: messages.questionType.id })}
                  tip={intl.formatMessage({ id: messages.questionTypeTip.id })}
                  splitInHalf
                />

                <DescriptionList
                  locale={locale}
                  label={
                    +formValues[FORM_TYPE]
                      ? messages.generalQuestionDescriptionLabel.id
                      : messages.expertQuestionDescriptionLabel.id
                  }
                  items={
                    +formValues[FORM_TYPE]
                      ? messages.generalQuestionDescriptionList.id
                      : messages.expertQuestionDescriptionList.id
                  }
                />
                <br />
              </>
            )}
            <Field
              name={FORM_TITLE}
              component={TextInputField}
              disabled={questionLoading}
              label={intl.formatMessage({ id: messages.titleLabel.id })}
              tip={intl.formatMessage({ id: messages.titleTip.id })}
              validate={[
                withoutDoubleSpace,
                strLength15x100,
                maxByteLength,
                required,
              ]}
              warn={[strLength15x100, required]}
              splitInHalf
            />
            <Field
              name={FORM_CONTENT}
              component={TextEditorField}
              disabled={questionLoading}
              label={intl.formatMessage({ id: messages.contentLabel.id })}
              previewLabel={intl.formatMessage({
                id: messages.previewLabel.id,
              })}
              validate={[strLength25x30000, required]}
              warn={[strLength25x30000, required]}
            />

            <Field
              name={FORM_TAGS}
              label={intl.formatMessage({ id: messages.tagsLabel.id })}
              tip={intl.formatMessage({ id: messages.tagsTip.id })}
              component={TagSelector}
              disabled={
                questionLoading ||
                !formValues[FORM_COMMUNITY] ||
                !formValues[FORM_COMMUNITY].value
              }
              setTags={setTags}
              options={
                formValues[FORM_COMMUNITY]
                  ? formValues[FORM_COMMUNITY].tags
                  : []
              }
              validate={[required, strLength1x5]}
              warn={[required, strLength1x5]}
              splitInHalf
            />

            <TransparentButton
              onClick={redirectToCreateTagDispatch}
              data-communityid={communityId}
              id="question-form-suggest-tag"
              type="button"
            >
              <img className="mr-2" src={icoTag} alt="icoTag" />
              <FormattedMessage {...commonMessages.suggestTag} />
            </TransparentButton>

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

let FormClone = reduxForm({
  onSubmitFail: errors => scrollToErrorField(errors),
})(QuestionForm);

const mapDispatchToProps = dispatch => ({
  redirectToCreateTagDispatch: bindActionCreators(
    redirectToCreateTag,
    dispatch,
  ),
});

FormClone = connect(
  (state, props) => {
    let initialValues = {
      [FORM_TYPE]: QUESTION_TYPES.GENERAL.value,
    };

    let formValues = {};

    if (props.question) {
      initialValues = {
        [FORM_TITLE]: props.question.title,
        [FORM_CONTENT]: props.question.content,
        [FORM_COMMUNITY]: props.question.community,
        [FORM_TAGS]: props.question.chosenTags,
      };
    }

    const singleCommId = isSingleCommunityWebsite();

    if (singleCommId) {
      initialValues = {
        ...initialValues,
        [FORM_COMMUNITY]: props.communities.find(
          ({ id }) => id === singleCommId,
        ),
      };
    }

    const form = state.toJS().form[props.form];

    if (form) {
      formValues = form.values;
    }

    return {
      formValues,
      initialValues,
      enableReinitialize: true,
    };
  },
  mapDispatchToProps,
)(FormClone);

export default React.memo(injectIntl(FormClone));
