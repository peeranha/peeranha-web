import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { injectIntl, intlShape } from 'react-intl';
import * as routes from 'routes-config';
import commonMessages from 'common-messages';

import questionIcon from 'images/question.svg';
import closeIcon from 'images/closeCircle.svg';

import { MediumImageStyled } from 'components/Img/MediumImage';
import LargeButton from 'components/Button/LargeButton';
import TagSelector from 'components/TagSelector';
import Base from 'components/Base/BaseRounded';
import Span from 'components/Span';
import H3 from 'components/H3';
import A from 'components/A';

import {
  strLength25x30000,
  strLength15x100,
  strLength1x5,
  required,
  requiredForObjectField,
} from 'components/FormFields/validate';

import TextInputField from 'components/FormFields/TextInputField';
import TextEditorField from 'components/FormFields/TextEditorField';
import CommunityField from 'components/FormFields/CommunityField';

import {
  FORM_TITLE,
  FORM_CONTENT,
  FORM_COMMUNITY,
  FORM_TAGS,
} from './constants';

import messages from './messages';

/* eslint-disable-next-line */
let QuestionForm = /* istanbul ignore next */ ({
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
}) => {
  change(FORM_COMMUNITY, formValues[FORM_COMMUNITY]);
  change(FORM_TAGS, formValues[FORM_TAGS]);

  const setTags = updatedTags => change(FORM_TAGS, updatedTags);

  return (
    <div>
      <Base className="d-flex align-items-center justify-content-between mb-3">
        <H3 className="d-flex align-items-end">
          <MediumImageStyled src={questionIcon} alt="questionIcon" />
          <span>{formTitle}</span>
        </H3>

        {questionid && (
          <A
            to={routes.questionView(questionid)}
            href={routes.questionView(questionid)}
            className="d-inline-flex align-items-center"
          >
            <img className="mr-1" src={closeIcon} alt="x" />
            <Span color="blue">
              {intl.formatMessage({ id: commonMessages.close.id })}
            </Span>
          </A>
        )}
      </Base>

      <form onSubmit={handleSubmit(sendQuestion)}>
        <Base>
          <div>
            <Field
              name={FORM_COMMUNITY}
              component={CommunityField}
              onChange={() => change(FORM_TAGS, '')}
              disabled={questionLoading}
              label={intl.formatMessage({ id: messages.communityLabel.id })}
              options={communities}
              validate={[requiredForObjectField]}
              warn={[requiredForObjectField]}
              fieldWithTips
            />
            <Field
              name={FORM_TITLE}
              component={TextInputField}
              disabled={questionLoading}
              label={intl.formatMessage({ id: messages.titleLabel.id })}
              validate={[strLength15x100, required]}
              warn={[strLength15x100, required]}
              fieldWithTips
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
              component={TagSelector}
              disabled={questionLoading || !formValues[FORM_COMMUNITY]}
              setTags={setTags}
              options={
                formValues[FORM_COMMUNITY]
                  ? formValues[FORM_COMMUNITY].tags
                  : []
              }
              validate={[required, strLength1x5]}
              warn={[required, strLength1x5]}
              fieldWithTips
            />
          </div>
          <div>
            <LargeButton id={submitButtonId} className="my-3" typeAttr="submit">
              {submitButtonName}
            </LargeButton>
          </div>
        </Base>
      </form>
    </div>
  );
};

QuestionForm.propTypes = {
  formTitle: PropTypes.string,
  submitButtonId: PropTypes.string,
  submitButtonName: PropTypes.string,
  sendQuestion: PropTypes.func,
  change: PropTypes.func,
  questionLoading: PropTypes.bool,
  questionid: PropTypes.bool,
  handleSubmit: PropTypes.func,
  formValues: PropTypes.object,
  communities: PropTypes.array,
  intl: intlShape.isRequired,
};

QuestionForm = reduxForm({})(QuestionForm);

QuestionForm = connect((state, props) /* istanbul ignore next */ => {
  let initialValues = {};
  let formValues = {};

  if (props.question) {
    initialValues = {
      [FORM_TITLE]: props.question.title,
      [FORM_CONTENT]: props.question.content,
      [FORM_COMMUNITY]: props.question.community,
      [FORM_TAGS]: props.question.chosenTags,
    };
  }

  const form = state.toJS().form[props.form];

  if (form) {
    formValues = form.values;
  }

  return {
    formValues,
    initialValues,
  };
})(QuestionForm);

export default React.memo(injectIntl(QuestionForm));
