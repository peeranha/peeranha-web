import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { BORDER_SECONDARY, TEXT_SECONDARY } from 'style-constants';
import messages from 'common-messages';

import TextBlock from 'containers/ViewQuestion/TextBlock';

import { ErrorHandling, DisableHandling } from 'components/Input/InputStyled';
import TextEditor, { TEXT_EDITOR_CLASSNAME } from 'components/TextEditor';
import Span from 'components/Span';

import Wrapper from './Wrapper';

const Div = styled.div`
  ${({ error }) => ErrorHandling(error)};
  ${({ disabled }) => DisableHandling(disabled)};

  font-size: 16px;
  line-height: 18px;

  .${TEXT_EDITOR_CLASSNAME} > div {
    border: none;
  }

  * {
    word-break: break-all;
  }

  .editor-toolbar {
    border-bottom: 1px solid ${BORDER_SECONDARY} !important;
  }

  @media only screen and (max-width: 768px) {
    .CodeMirror,
    .CodeMirror-scroll {
      min-height: 200px;
    }

    .editor-toolbar {
      margin: 0 10px;
      display: block;
      padding: 0;
      overflow: scroll;
      white-space: nowrap;

      &:before,
      &:after {
        margin: 0 !important;
      }
    }
  }

  @media only screen and (max-width: 576px) {
    font-size: 14px;
    line-height: 18px;
  }
`;

const PreviewWrapper = styled.div`
  background: linear-gradient(to right, #dcdcdc 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(to right, #dcdcdc 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 0%);
  background-position: top, right, bottom, left;
  background-repeat: repeat-x, repeat-y;
  background-size: 8px 1px, 1px 8px;
  padding: 12px 0;
`;

export const TextEditorField = ({
  input,
  label,
  previewLabel,
  disabled,
  meta,
  tip,
  splitInHalf,
}) => (
  <React.Fragment>
    <Wrapper
      label={label}
      tip={tip}
      meta={meta}
      splitInHalf={splitInHalf}
      id={input.name}
    >
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
          <Span color={TEXT_SECONDARY} fontSize="14" isItalic>
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
  splitInHalf: PropTypes.bool,
};

export default React.memo(TextEditorField);
