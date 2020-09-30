import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { translationMessages } from 'i18n';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';

import messages from 'common-messages';

import { scrollToErrorField } from 'utils/animation';
import {
  isAnswerOfficial,
  communityAdminOfficialAnswerPermission,
} from 'utils/properties';
import { strLength25x30000, required } from 'components/FormFields/validate';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import Wrapper from 'components/FormFields/Wrapper';
import Span from 'components/Span';
import Checkbox from 'components/Input/Checkbox';
import TextBlock from 'components/FormFields/TextBlock';
import TextEditorField from 'components/FormFields/TextEditorField';
import Button from 'components/Button/Contained/InfoLarge';
import FormBox from 'components/Form';

import {
  TEXT_SECONDARY,
  TEXT_PRIMARY,
  BG_PRIMARY_TRANSPARENT,
  BG_PRIMARY_LIGHT,
} from 'style-constants';
import { ANSWER_TYPE_FORM, TEXT_EDITOR_ANSWER_FORM } from './constants';

export const PreviewWrapper = styled.div`
  background: linear-gradient(to right, #dcdcdc 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(to right, #dcdcdc 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 0%);
  background-position: top, right, bottom, left;
  background-repeat: repeat-x, repeat-y;
  background-size: 8px 1px, 1px 8px;
  padding: 12px 0;
`;

const ModalDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: ${BG_PRIMARY_LIGHT};
  background-image: linear-gradient(
    45deg,
    ${BG_PRIMARY_TRANSPARENT} 15%,
    transparent 15%,
    transparent 35%,
    ${BG_PRIMARY_TRANSPARENT} 35%,
    ${BG_PRIMARY_TRANSPARENT} 65%,
    transparent 65%,
    transparent 85%,
    ${BG_PRIMARY_TRANSPARENT} 85%
  );
  background-size: 50px 50px;
  background-repeat: repeat;
  opacity: 0.4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalMessage = styled.p`
  color: ${TEXT_PRIMARY};
  font-size: 1.5em;
  font-weight: bold;
  position: relative;
  top: -50px;
  margin: 0 40px;
  text-align: center;
`;

export const AnswerForm = ({
  handleSubmit,
  sendAnswer,
  sendAnswerLoading,
  sendButtonId,
  submitButtonName,
  label,
  previewLabel,
  textEditorValue,
  answerTypeLabel,
  isOfficialRepresentative,
  isAnswered,
}) => (
  <FormBox onSubmit={handleSubmit(sendAnswer)}>
    {isAnswered && (
      <ModalDiv>
        <ModalMessage>
          <FormattedMessage {...messages.questionIsAnswered} />
        </ModalMessage>
      </ModalDiv>
    )}
    <Field
      name={TEXT_EDITOR_ANSWER_FORM}
      component={TextEditorField}
      disabled={sendAnswerLoading}
      validate={[strLength25x30000, required]}
      warn={[strLength25x30000, required]}
      label={label}
      previewLabel={previewLabel}
    />
    {isOfficialRepresentative && (
      <Field
        name={ANSWER_TYPE_FORM}
        component={Checkbox}
        disabled={sendAnswerLoading}
        label={<span>{answerTypeLabel}</span>}
        previewLabel={previewLabel}
        width="90px"
      />
    )}
    <Wrapper label={previewLabel} className="mt-3">
      <PreviewWrapper>
        {textEditorValue ? (
          <TextBlock className="my-2" content={textEditorValue} />
        ) : (
          <Span color={TEXT_SECONDARY} fontSize="14" isItalic>
            <FormattedMessage {...messages.nothingToSeeYet} />
          </Span>
        )}
      </PreviewWrapper>
    </Wrapper>
    <Button
      id={sendButtonId}
      disabled={sendAnswerLoading || isAnswered}
      type="submit"
    >
      {submitButtonName}
    </Button>
  </FormBox>
);

AnswerForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendAnswer: PropTypes.func,
  sendButtonId: PropTypes.string,
  submitButtonName: PropTypes.string,
  label: PropTypes.string,
  previewLabel: PropTypes.string,
  sendAnswerLoading: PropTypes.bool,
  communityId: PropTypes.number,
  textEditorValue: PropTypes.string,
  answerTypeLabel: PropTypes.string,
  isOfficialRepresentative: PropTypes.bool,
  properties: PropTypes.array,
  questionView: PropTypes.bool,
  isAnswered: PropTypes.bool,
};

const FormClone = reduxForm({
  onSubmitFail: errors => scrollToErrorField(errors),
  form: 'answerForm',
})(AnswerForm);

export default React.memo(
  connect(
    (
      state,
      { answer, communityId, properties, questionView, form: formName },
    ) => {
      const form = state.toJS().form[formName] || { values: {} };
      const locale = makeSelectLocale()(state);
      const translate = translationMessages[locale];
      const profileInfo = makeSelectProfileInfo()(state);
      const official = isAnswerOfficial({ properties, id: true });
      const isOfficialRepresentative = communityAdminOfficialAnswerPermission(
        profileInfo?.permissions,
        communityId,
      );

      return {
        enableReinitialize: true,
        isOfficialRepresentative,
        textEditorValue: form.values[TEXT_EDITOR_ANSWER_FORM],
        answerTypeLabel: translate[messages.official.id],
        initialValues: {
          [TEXT_EDITOR_ANSWER_FORM]: answer,
          [ANSWER_TYPE_FORM]: questionView
            ? isOfficialRepresentative
            : official,
        },
      };
    },
  )(FormClone),
);
