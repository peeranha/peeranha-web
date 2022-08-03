import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import { TEXT_SECONDARY } from 'style-constants';

import Span from 'components/Span';
import { strLength25x30000, required } from 'components/FormFields/validate';
import TextBlock from 'components/FormFields/TextBlock';
import TextEditorField from 'components/FormFields/TextEditorField';

import { FORM_CONTENT } from './constants';

import { PreviewWrapper } from '../AnswerForm';
import Wrapper from '../FormFields/Wrapper';

const ContentForm = ({ questionLoading, formValues }) => {
  const { t } = useTranslation();

  return (
    <>
      <Field
        name={FORM_CONTENT}
        component={TextEditorField}
        disabled={questionLoading}
        label={t('common.questionBodyLabel')}
        validate={[strLength25x30000, required]}
        warn={[strLength25x30000, required]}
      />

      <Wrapper
        style={{ borderRadius: 0, boxShadow: 'none', paddingLeft: 0 }}
        label={t('common.previewLabel')}
        className="mt-3"
      >
        <PreviewWrapper>
          {formValues[FORM_CONTENT] ? (
            <TextBlock className="my-2" content={formValues[FORM_CONTENT]} />
          ) : (
            <Span color={TEXT_SECONDARY} fontSize="14" isItalic>
              {t('common.nothingToSeeYet')}
            </Span>
          )}
        </PreviewWrapper>
      </Wrapper>
    </>
  );
};

ContentForm.propTypes = {
  questionLoading: PropTypes.bool,
  formValues: PropTypes.object,
};

export default memo(ContentForm);
