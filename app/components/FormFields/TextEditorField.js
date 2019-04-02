import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { gray } from 'style-constants';
import messages from 'common-messages';

import TextBlock from 'containers/ViewQuestion/TextBlock';

import { ErrorHandling, DisableHandling } from 'components/Input/InputStyled';
import TextEditor, { TEXT_EDITOR_CLASSNAME } from 'components/TextEditor';
import Span from 'components/Span';

import Wrapper from './Wrapper';

const Div = styled.div`
  ${({ error }) => ErrorHandling(error)};
  ${({ disabled }) => DisableHandling(disabled)};

  .${TEXT_EDITOR_CLASSNAME} > div {
    border: none;
  }

  .editor-toolbar {
    border-bottom: 1px solid ${gray} !important;
  }
`;

const PreviewWrapper = styled.div`
  padding: 10px 0;
  border-top: 1px dashed ${gray};
  border-bottom: 1px dashed ${gray};
`;

const TextEditorField = ({
  input,
  label,
  previewLabel,
  disabled,
  meta,
  tip,
}) => (
  <React.Fragment>
    <Wrapper label={label} tip={tip} meta={meta}>
      <Div
        disabled={disabled}
        error={meta.touched && (meta.error || meta.warning)}
      >
        <TextEditor {...input} disabled={disabled} />
      </Div>
    </Wrapper>

    <Wrapper label={previewLabel}>
      <PreviewWrapper>
        {input.value ? (
          <TextBlock className="my-2" content={input.value} />
        ) : (
          <Span color="gray" fontSize="14" isItalic>
            <FormattedMessage {...messages.nothingToSeeYet} />
          </Span>
        )}
      </PreviewWrapper>
    </Wrapper>
  </React.Fragment>
);

TextEditorField.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  previewLabel: PropTypes.string,
  tip: PropTypes.string,
};

export default React.memo(TextEditorField);
