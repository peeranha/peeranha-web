import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BORDER_SECONDARY, BORDER_RADIUS_M } from 'style-constants';

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

  .CodeMirror {
    border: none;
    border-top: 1px solid ${BORDER_SECONDARY};
    border-bottom-right-radius: ${BORDER_RADIUS_M};
    border-bottom-left-radius: ${BORDER_RADIUS_M};
  }

  .editor-toolbar {
    border: none;
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

const WrapperBlock = styled(Wrapper)`
  display: block;
`;

export const TextEditorField = ({
  input,
  label,
  disabled,
  meta,
  tip,
  splitInHalf,
}) => (
  <WrapperBlock
    label={label}
    tip={tip}
    meta={meta}
    splitInHalf={splitInHalf}
    id={input.name}
    disabled={disabled}
  >
    <Div
      disabled={disabled}
      error={meta.touched && (meta.error || meta.warning)}
    >
      <TextEditor {...input} disabled={disabled} />
    </Div>
  </WrapperBlock>
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
