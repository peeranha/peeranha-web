import React, { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { intlShape } from 'react-intl';

import { FORM_TYPE } from './constants';

import messages from './messages';
import QuestionTypeField from './QuestionTypeField';
import DescriptionList from '../DescriptionList';

const TypeForm = ({ intl, change, locale, questionLoading, formValues }) => {
  const onChange = useCallback(val => change(FORM_TYPE, val[0]), []);

  const [descriptionListLabel, descriptionListItems] = useMemo(
    () => [
      +formValues[FORM_TYPE]
        ? messages.generalQuestionDescriptionLabel.id
        : messages.expertQuestionDescriptionLabel.id,
      +formValues[FORM_TYPE]
        ? messages.generalQuestionDescriptionList.id
        : messages.expertQuestionDescriptionList.id,
    ],
    [formValues],
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
      />

      <DescriptionList
        locale={locale}
        label={descriptionListLabel}
        items={descriptionListItems}
      />
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
