import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { Field } from 'redux-form/immutable';
import ReactMDE from 'redux-forms-markdown-editor';

import commonMessages from 'common-messages';
import messages from 'containers/Profile/messages';
import formFieldsMsg from 'components/FormFields/messages';

import { TEXT_SECONDARY } from 'style-constants';
import { ABOUT_FIELD } from 'containers/Profile/constants';

import { PreviewWrapper } from 'components/AnswerForm';
import Span from 'components/Span';
import TextBlock from 'components/FormFields/TextBlock';
import {
  TextEditorWrapper,
  TextEditorWarning,
  TextEditorTitle,
} from 'components/FormFields/TextEditorField';
import Wrapper from 'components/FormFields/Wrapper';

import { strLength20x1000 } from 'components/FormFields/validate';

import { reactMDEOptions } from 'components/TextEditor/options';




const AboutForm = ({ formValues, intl, isProfileSaving }) => (
  <>
    <TextEditorWrapper isError={!!strLength20x1000(formValues[ABOUT_FIELD])}>
      {intl.formatMessage(messages.aboutLabel) && (
        <TextEditorTitle>
          {intl.formatMessage(messages.aboutLabel)}
        </TextEditorTitle>
      )}
      <Field
        name={ABOUT_FIELD}
        component={ReactMDE}
        buttonConfig={reactMDEOptions}
        placeholder=" "
      />
      {strLength20x1000(formValues[ABOUT_FIELD]) && (
        <TextEditorWarning>
          <FormattedMessage {...formFieldsMsg.wrongLength20x1000} />
        </TextEditorWarning>
      )}
    </TextEditorWrapper>

    <Wrapper
      className="mt-3"
      style={{ borderRadius: 0, boxShadow: 'none', paddingLeft: 0 }}
      label={intl.formatMessage(commonMessages.preview)}
    >
      <PreviewWrapper>
        {formValues[ABOUT_FIELD] ? (
          <TextBlock className="my-2" content={formValues[ABOUT_FIELD]} />
        ) : (
          <Span color={TEXT_SECONDARY} fontSize="14" isItalic>
            <FormattedMessage {...commonMessages.nothingToSeeYet} />
          </Span>
        )}
      </PreviewWrapper>
    </Wrapper>
  </>
);

AboutForm.propTypes = {
  formValues: PropTypes.object,
  intl: intlShape.isRequired,
  isProfileSaving: PropTypes.bool,
};

export default memo(AboutForm);
