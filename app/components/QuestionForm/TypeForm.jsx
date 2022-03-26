import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { intlShape } from 'react-intl';

import { FORM_TYPE } from './constants';
import messages from './messages';
import QuestionTypeField from './QuestionTypeField';
import DescriptionList from '../DescriptionList';

const TypeForm = ({
  intl,
  change,
  locale,
  questionLoading,
  formValues,
  hasSelectedType,
  setHasSelectedType,
  isError,
  setIsError,
}) => {
  const onChange = useCallback(val => change(FORM_TYPE, val[0]), []);

  const labelConditional = n => {
    if (n === '1') return messages.generalQuestionDescriptionLabel.id;
    if (n === '0') return messages.expertQuestionDescriptionLabel.id;
    if (n === '2') return messages.tutorialQuestionDescriptionLabel.id;
  };

  const listConditional = n => {
    if (n === '1') return messages.generalQuestionDescriptionList.id;
    if (n === '0') return messages.expertQuestionDescriptionList.id;
    if (n === '2') return messages.tutorialQuestionDescriptionList.id;
  };

  const [descriptionListLabel, descriptionListItems] = useMemo(
    () => [
      labelConditional(formValues[FORM_TYPE]),
      listConditional(formValues[FORM_TYPE]),
    ],
    [locale, formValues],
  );

  useEffect(
    () => {
      if (descriptionListLabel && descriptionListItems) {
        setHasSelectedType(true);
        setIsError(false);
      }
    },
    [descriptionListLabel, descriptionListItems],
  );

  return (
    <>
      <Field
        name={FORM_TYPE}
        component={QuestionTypeField}
        disabled={questionLoading}
        onChange={onChange}
        label={intl.formatMessage(messages.questionType)}
        tip={intl.formatMessage(messages.questionTypeTip)}
        splitInHalf
        error={isError}
      />
      {hasSelectedType && (
        <DescriptionList
          locale={locale}
          label={descriptionListLabel}
          items={descriptionListItems}
        />
      )}
      <br />
    </>
  );
};

TypeForm.propTypes = {
  change: PropTypes.func,
  questionLoading: PropTypes.bool,
  communities: PropTypes.array,
  intl: intlShape.isRequired,
  locale: PropTypes.string,
  formValues: PropTypes.object,
};

export default memo(TypeForm);
