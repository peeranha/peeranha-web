import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import { scrollToErrorField } from 'utils/animation';
import {
  hasCommunityAdminRole,
  hasCommunityModeratorRole,
  hasProtocolAdminRole,
} from 'utils/properties';
import { graphCommunityColors } from 'utils/communityManagement';

import { makeSelectAccount, makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { selectTransactionInPending } from 'containers/EthereumProvider/selectors';

import Checkbox from 'components/Input/Checkbox';
import TextEditorField from 'components/FormFields/TextEditorField';
import Button from 'components/Button/Contained/InfoLarge';
import FormBox from 'components/Form';
import BlockedInfoArea from 'components/BlockedInfoArea';
import { TransactionBanner } from 'components/TransactionBanner/TransactionBanner';
import { strLength15x30000, required } from 'components/FormFields/validate';

import { ANSWER_TYPE_FORM, TEXT_EDITOR_ANSWER_FORM } from './constants';

const graphCommunity = graphCommunityColors();

export const PreviewWrapper = styled.div`
  background: ${graphCommunity
    ? 'none'
    : `linear-gradient(to right, #dcdcdc 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(to right, #dcdcdc 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 0%)`};
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
  isOfficialRepresentative,
  isAnswered,
  account,
  isMinusReputation,
  isHasRole,
  transactionInPending,
}) => {
  const { t } = useTranslation();

  return (
    <FormBox onSubmit={handleSubmit(sendAnswer)}>
      {isAnswered && <BlockedInfoArea>{t('common.questionIsAnswered')}</BlockedInfoArea>}
      {!account && <BlockedInfoArea>{t('common.logInToAnswer')}</BlockedInfoArea>}
      {isMinusReputation && !isHasRole && (
        <BlockedInfoArea>{t('common.reputationBelowZero')}</BlockedInfoArea>
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
          label={<span>{t('common.official')}</span>}
          previewLabel={previewLabel}
          width="90px"
        />
      )}

      {sendAnswerLoading || transactionInPending ? (
        <TransactionBanner />
      ) : (
        <Button
          id={sendButtonId}
          disabled={sendAnswerLoading || isAnswered || !account}
          type="submit"
          className={(sendAnswerLoading || isAnswered || !account) && 'op80'}
        >
          {submitButtonName}
        </Button>
      )}
    </FormBox>
  );
};

AnswerForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendAnswer: PropTypes.func,
  sendButtonId: PropTypes.string,
  submitButtonName: PropTypes.string,
  label: PropTypes.string,
  previewLabel: PropTypes.string,
  sendAnswerLoading: PropTypes.bool,
  communityId: PropTypes.string,
  textEditorValue: PropTypes.string,
  isOfficialRepresentative: PropTypes.bool,
  properties: PropTypes.array,
  questionView: PropTypes.bool,
  isAnswered: PropTypes.bool,
  account: PropTypes.string,
};

const FormClone = reduxForm({
  onSubmitFail: (errors) => scrollToErrorField(errors),
  form: 'answerForm',
})(AnswerForm);

export default React.memo(
  connect((state, { answer, communityId, questionView, isOfficialReply, form: formName }) => {
    const form = state.toJS().form[formName] || { values: {} };
    const profileInfo = makeSelectProfileInfo()(state);
    const isOfficialRepresentative =
      hasProtocolAdminRole(profileInfo?.permissions) ||
      hasCommunityModeratorRole(profileInfo?.permissions, communityId || 0) ||
      (Boolean(communityId) && hasCommunityAdminRole(profileInfo?.permissions, communityId));
    const account = makeSelectAccount()(state);

    return {
      transactionInPending: selectTransactionInPending()(state),
      account,
      enableReinitialize: true,
      isOfficialRepresentative,
      textEditorValue: form.values ? form.values[TEXT_EDITOR_ANSWER_FORM] : '',
      initialValues: {
        [TEXT_EDITOR_ANSWER_FORM]: answer,
        [ANSWER_TYPE_FORM]: questionView ? isOfficialRepresentative : isOfficialReply,
      },
    };
  })(FormClone),
);
