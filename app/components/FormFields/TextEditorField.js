import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BORDER_SECONDARY, BORDER_RADIUS_M, TEXT_DARK } from 'style-constants';

import { DisableHandling, ErrorHandling } from 'components/Input/InputStyled';
import TextEditor, { TEXT_EDITOR_CLASSNAME } from 'components/TextEditor';

import Wrapper from './Wrapper';

const Div = styled.div`
  ${({ error }) => ErrorHandling(error)};
  ${({ disabled }) => DisableHandling(disabled)};

  font-size: 16px;
  line-height: 18px;

  .${TEXT_EDITOR_CLASSNAME} > div {
    border: none;
  }

  .editor-toolbar {
    border-bottom: 1px solid ${BORDER_SECONDARY} !important;
  }

  .CodeMirror {
    border-bottom-right-radius: ${BORDER_RADIUS_M};
    border-bottom-left-radius: ${BORDER_RADIUS_M};
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

export const TextEditorWrapper = styled.div`
  margin-bottom: 15px;

  > div {
    border-radius: ${BORDER_RADIUS_M};
    border: 1px solid rgb(194, 198, 216);

    ${x =>
      x.isError
        ? `box-shadow: rgba(252, 102, 85, 0.4) 0px 0px 0px 3px; border: 1px solid rgb(252, 102, 85);`
        : ''};

    > div:nth-child(1) {
      padding: 10px;
      margin: 0 !important;

      border-bottom: 1px solid rgb(194, 198, 216);

      button {
        padding-bottom: 7px !important;
        margin: 0 10px 0 0 !important;

        border: 1px solid transparent !important;
        border-radius: ${BORDER_RADIUS_M};

        svg {
          fill: #2c3e50;
        }

        &:hover {
          background-color: #fcfcfc !important;
          border-color: #95a5a6 !important;
        }
      }
    }

    > div:nth-child(2) {
      font-size: 0;

      textarea {
        min-height: 300px;
        height: auto !important;
        padding: 10px !important;

        font-size: initial;

        border: none !important;
        resize: none;
      }
    }
  }
`;

export const TextEditorTitle = styled.p`
  margin-bottom: 6px;

  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  color: ${TEXT_DARK};
`;

export const TextEditorWarning = styled.span`
  display: flex;
  margin-top: 8px;

  font-size: 14px;
  line-height: 18px;
  font-style: italic;
  color: rgb(123, 123, 123);
`;

export const TextEditorField = ({
  input,
  label,
  disabled,
  meta,
  tip,
  splitInHalf,
}) => (
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

export default TextEditorField;
