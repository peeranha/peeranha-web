import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { intlShape, FormattedMessage } from 'react-intl';
import ReactMDE from 'redux-forms-markdown-editor';

import commonMessages from 'common-messages';
import formFieldsMsg from 'components/FormFields/messages';
import messages from './messages';

import { TEXT_SECONDARY } from 'style-constants';
import { FORM_CONTENT } from './constants';

import Span from 'components/Span';
import { strLength25x30000, required } from 'components/FormFields/validate';
import TextBlock from 'components/FormFields/TextBlock';
import {
  TextEditorWrapper,
  TextEditorWarning,
  TextEditorTitle,
} from 'components/FormFields/TextEditorField';
import { PreviewWrapper } from '../AnswerForm';
import Wrapper from '../FormFields/Wrapper';

import { reactMDEOptions } from 'components/TextEditor/options';

const ContentForm = ({ questionLoading, intl, formValues }) => (
  <>
    <TextEditorWrapper isError={!!strLength25x30000(formValues[FORM_CONTENT])}>
      {intl.formatMessage(messages.contentLabel) && (
        <TextEditorTitle>
          {intl.formatMessage(messages.contentLabel)}
        </TextEditorTitle>
      )}
      <Field
        name={FORM_CONTENT}
        component={ReactMDE}
        buttonConfig={reactMDEOptions}
        placeholder=" "
      />
      {strLength25x30000(formValues[FORM_CONTENT]) && (
        <TextEditorWarning>
          <FormattedMessage {...formFieldsMsg.wrongLength25x30000} />
        </TextEditorWarning>
      )}
    </TextEditorWrapper>

    <Wrapper
      style={{ borderRadius: 0, boxShadow: 'none', paddingLeft: 0 }}
      label={intl.formatMessage(messages.previewLabel)}
      className="mt-3"
    >
      <PreviewWrapper>
        {formValues[FORM_CONTENT] ? (
          <TextBlock className="my-2" content={formValues[FORM_CONTENT]} />
        ) : (
          <Span color={TEXT_SECONDARY} fontSize="14" isItalic>
            <FormattedMessage {...commonMessages.nothingToSeeYet} />
          </Span>
        )}
      </PreviewWrapper>
    </Wrapper>
  </>
);

ContentForm.propTypes = {
  questionLoading: PropTypes.bool,
  intl: intlShape.isRequired,
  formValues: PropTypes.object,
};

export default memo(ContentForm);
