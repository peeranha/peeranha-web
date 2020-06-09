import React, { memo, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { intlShape } from 'react-intl';

import TagSelector from 'components/TagSelector';

import { strLength1x5, required } from 'components/FormFields/validate';

import { FORM_COMMUNITY, FORM_TAGS } from './constants';

import messages from './messages';

const TagsForm = ({ questionLoading, intl, formValues, change }) => {
  const setTags = useCallback(updatedTags => change(FORM_TAGS, updatedTags), [
    change,
  ]);

  const tagsOptions = useMemo(() => formValues?.[FORM_COMMUNITY]?.tags ?? [], [
    formValues,
  ]);

  const tagsDisabled = useMemo(
    () => questionLoading || !formValues?.[FORM_COMMUNITY]?.value,
    [formValues, questionLoading],
  );

  return (
    <Field
      name={FORM_TAGS}
      label={intl.formatMessage(messages.tagsLabel)}
      tip={intl.formatMessage(messages.tagsTip)}
      component={TagSelector}
      disabled={tagsDisabled}
      setTags={setTags}
      options={tagsOptions}
      validate={[required, strLength1x5]}
      warn={[required, strLength1x5]}
      splitInHalf
    />
  );
};

TagsForm.propTypes = {
  questionLoading: PropTypes.bool,
  intl: intlShape.isRequired,
  formValues: PropTypes.object,
  change: PropTypes.func,
};

export default memo(TagsForm);
