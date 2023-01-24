import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { Field } from 'redux-form/immutable';
import { requiredPostTypeSelection } from 'components/FormFields/validate';
import { FORM_TYPE } from './constants';
import { useTranslation } from 'react-i18next';
import QuestionTypeField from './QuestionTypeField';
import DescriptionList from 'components/DescriptionList';
import {
  labelConditional,
  listConditional,
} from 'components/QuestionForm/utils';

type TypeFormProps = {
  change: any;
  locale: string;
  questionLoading: boolean;
  formValues?: any;
  hasSelectedType: boolean;
  setHasSelectedType: any;
  isError: boolean;
  setIsError: any;
  isCommunityModerator: boolean;
  isDocumentation: boolean;
};

const TypeForm: React.FC<TypeFormProps> = ({
  change,
  locale,
  questionLoading,
  formValues,
  hasSelectedType,
  setHasSelectedType,
  isError,
  setIsError,
  isCommunityModerator,
  isDocumentation,
}): JSX.Element | null => {
  const { t } = useTranslation();
  const onChange = useCallback((val: any[]) => change(FORM_TYPE, val[0]), []);

  const [descriptionListLabel, descriptionListItems] = useMemo(
    () => [
      labelConditional(formValues[FORM_TYPE]),
      listConditional(formValues[FORM_TYPE]),
    ],
    [formValues[FORM_TYPE]],
  );

  useEffect(() => {
    if (descriptionListLabel && descriptionListItems) {
      setHasSelectedType(true);
      setIsError(false);
    }
  }, [descriptionListLabel, descriptionListItems]);

  return (
    <div className={isDocumentation ? 'd-none' : ''}>
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
        isCommunityModerator={isCommunityModerator}
      />
      {hasSelectedType && (
        <DescriptionList
          label={descriptionListLabel}
          items={descriptionListItems}
        />
      )}
      <br />
    </div>
  );
};

export default memo(TypeForm);
