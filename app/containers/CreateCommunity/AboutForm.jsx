import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { Field } from 'redux-form/immutable';

import commonMessages from 'common-messages';
import messages from './messages';

import { TEXT_SECONDARY } from 'style-constants';

import { PreviewWrapper } from 'components/AnswerForm';
import Span from 'components/Span';
import TextBlock from 'components/FormFields/TextBlock';
import Wrapper from 'components/FormFields/Wrapper';
import TextEditorField from 'components/FormFields/TextEditorField';

import { strLength20x1000 } from 'components/FormFields/validate';

const AboutForm = ({ formValues, intl, loading, name }) => (
  <>
    <Field
      name={name}
      component={TextEditorField}
      label={intl.formatMessage(messages.aboutLabel)}
      tip={intl.formatMessage(messages.optional)}
      disabled={loading}
      validate={strLength20x1000}
      warn={strLength20x1000}
    />

    <Wrapper
      className="mt-3"
      style={{ borderRadius: 0, boxShadow: 'none', paddingLeft: 0 }}
      label={intl.formatMessage(commonMessages.preview)}
    >
      <PreviewWrapper>
        {formValues[name] ? (
          <TextBlock className="my-2" content={formValues[name]} />
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
