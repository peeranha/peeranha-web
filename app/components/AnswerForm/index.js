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
  hasCommunityAdminRole,
  hasCommunityModeratorRole,
  hasProtocolAdminRole,
} from 'utils/properties';
import { strLength15x30000, required } from 'components/FormFields/validate';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import {
  makeSelectAccount,
  makeSelectProfileInfo,
} from 'containers/AccountProvider/selectors';

import Wrapper from 'components/FormFields/Wrapper';
import Span from 'components/Span';
import Checkbox from 'components/Input/Checkbox';
import TextBlock from 'components/FormFields/TextBlock';
import TextEditorField from 'components/FormFields/TextEditorField';
import Button from 'components/Button/Contained/InfoLarge';
import FormBox from 'components/Form';
import BlockedInfoArea from 'components/BlockedInfoArea';

import { TEXT_SECONDARY } from 'style-constants';
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
  account,
  isMinusReputation,
  isHasRole,
}) => (
  <FormBox onSubmit={handleSubmit(sendAnswer)}>
    {isAnswered && (
      <BlockedInfoArea>
        <FormattedMessage id={messages.questionIsAnswered.id} />
      </BlockedInfoArea>
    )}
    {!account && (
      <BlockedInfoArea>
        <FormattedMessage id={messages.logInToAnswer.id} />
      </BlockedInfoArea>
    )}
    {isMinusReputation &&
      !isHasRole && (
        <BlockedInfoArea>
          <FormattedMessage id={messages.reputationBelowZero.id} />
        </BlockedInfoArea>
      )}
    <Field
      name={TEXT_EDITOR_ANSWER_FORM}
      component={TextEditorField}
      disabled={sendAnswerLoading}
      validate={[strLength15x30000, required]}
      warn={[strLength15x30000, required]}
      label={label}
      previewLabel={previewLabel}
    />
    {isOfficialRepresentative && (
      <Field
        name={ANSWER_TYPE_FORM}
        component={Checkbox}
        disabled={sendAnswerLoading || isAnswered || !account}
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
            <FormattedMessage id={messages.nothingToSeeYet.id} />
          </Span>
        )}
      </PreviewWrapper>
    </Wrapper>
    <Button
      id={sendButtonId}
      disabled={sendAnswerLoading || isAnswered || !account}
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
  account: PropTypes.string,
};

const FormClone = reduxForm({
  onSubmitFail: errors => scrollToErrorField(errors),
  form: 'answerForm',
})(AnswerForm);

export default React.memo(
  connect(
    (
      state,
      { answer, communityId, questionView, isOfficialReply, form: formName },
    ) => {
      const form = state.toJS().form[formName] || { values: {} };
      const locale = makeSelectLocale()(state);
      const translate = translationMessages[locale];
      const profileInfo = makeSelectProfileInfo()(state);
      const isOfficialRepresentative =
        hasProtocolAdminRole(profileInfo?.permissions) ||
        hasCommunityModeratorRole(profileInfo?.permissions, communityId || 0) ||
        (Boolean(communityId) &&
          hasCommunityAdminRole(profileInfo?.permissions, communityId));
      const account = makeSelectAccount()(state);

      return {
        account,
        enableReinitialize: true,
        isOfficialRepresentative,
        textEditorValue: form.values[TEXT_EDITOR_ANSWER_FORM],
        answerTypeLabel: translate[messages.official.id],
        initialValues: {
          [TEXT_EDITOR_ANSWER_FORM]: answer,
          [ANSWER_TYPE_FORM]: questionView
            ? isOfficialRepresentative
            : isOfficialReply,
        },
      };
    },
  )(FormClone),
);
