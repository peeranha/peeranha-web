import React, { memo, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import { requiredPostTypeSelection } from 'components/FormFields/validate';
import { FORM_TYPE } from './constants';
import QuestionTypeField from './QuestionTypeField';
import DescriptionList from '../DescriptionList';

const TypeForm = ({
  change,
  locale,
  questionLoading,
  formValues,
  hasSelectedType,
  setHasSelectedType,
  isError,
  setIsError,
}) => {
  const { t } = useTranslation();
  const onChange = useCallback(val => change(FORM_TYPE, val[0]), []);

  const labelConditional = n => {
    if (n === '1') return 'common.generalQuestionDescriptionLabel';
    if (n === '0') return 'common.expertQuestionDescriptionLabel';
    if (n === '2') return 'common.tutorialQuestionDescriptionLabel';
  };

  const listConditional = n => {
    if (n === '1') return 'common.generalQuestionDescriptionList';
    if (n === '0') return 'common.expertQuestionDescriptionList';
    if (n === '2') return 'common.tutorialQuestionDescriptionList';
  };

  const [descriptionListLabel, descriptionListItems] = useMemo(
    () => [
      labelConditional(formValues[FORM_TYPE]),
      listConditional(formValues[FORM_TYPE]),
    ],
    [formValues[FORM_TYPE]],
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
        label={t('common.questionType')}
        tip={t('common.questionTypeTip')}
        validate={requiredPostTypeSelection}
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
  locale: PropTypes.string,
  formValues: PropTypes.object,
};

export default memo(TypeForm);
