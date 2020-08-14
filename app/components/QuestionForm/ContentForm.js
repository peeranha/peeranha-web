import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { intlShape, FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';
import { TEXT_SECONDARY } from 'style-constants';

import Span from 'components/Span';
import { strLength25x30000, required } from 'components/FormFields/validate';
import TextBlock from 'components/FormFields/TextBlock';
import TextEditorField from 'components/FormFields/TextEditorField';

import { FORM_CONTENT } from './constants';

import messages from './messages';
import { PreviewWrapper } from '../AnswerForm';
import Wrapper from '../FormFields/Wrapper';

const ContentForm = ({ questionLoading, intl, formValues }) => (
  <>
    <Field
      name={FORM_CONTENT}
      component={TextEditorField}
      disabled={questionLoading}
      label={intl.formatMessage(messages.contentLabel)}
      validate={[strLength25x30000, required]}
      warn={[strLength25x30000, required]}
    />

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
