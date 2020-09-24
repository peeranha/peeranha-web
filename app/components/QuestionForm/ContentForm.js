import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { intlShape, FormattedMessage } from 'react-intl';

import Span from 'components/Span';
import { strLength25x30000, required } from 'components/FormFields/validate';
import TextBlock from 'components/FormFields/TextBlock';
import TextEditor from 'components/FormFields/TextEditor';

import commonMessages from 'common-messages';

import { reactMDEOptions } from 'components/TextEditor/options';
import { TEXT_SECONDARY } from 'style-constants';

import messages from './messages';

import { FORM_CONTENT } from './constants';

import { PreviewWrapper } from '../AnswerForm';
import Wrapper from '../FormFields/Wrapper';

const ContentForm = ({ intl, formValues }) => (
  <>
    <Field
      name={FORM_CONTENT}
      component={TextEditor}
      buttonConfig={reactMDEOptions}
      placeholder=""
      labelMessage={messages.questionBodyLabel}
      formValues={formValues}
      validate={[required, strLength25x30000]}
      warn={strLength25x30000}
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
