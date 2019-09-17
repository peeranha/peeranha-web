import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { BORDER_SECONDARY_LIGHT, TEXT_SECONDARY } from 'style-constants';
import messages from 'common-messages';

import TextBlock from 'containers/ViewQuestion/TextBlock';

import { ErrorHandling, DisableHandling } from 'components/Input/InputStyled';
import TextEditor, { TEXT_EDITOR_CLASSNAME } from 'components/TextEditor';
import Span from 'components/Span';

import Wrapper from './Wrapper';

/* istanbul ignore next */
const Div = styled.div`
  ${({ error }) => ErrorHandling(error)};
  ${({ disabled }) => DisableHandling(disabled)};

  font-size: 16px;
  line-height: 20px;

  .${TEXT_EDITOR_CLASSNAME} > div {
    border: none;
  }

  * {
    word-break: break-all;
  }

  .editor-toolbar {
    border-bottom: 1px solid ${BORDER_SECONDARY_LIGHT} !important;
  }

  @media only screen and (max-width: 768px) {
    .CodeMirror,
    .CodeMirror-scroll {
      min-height: 200px;
    }

    .editor-toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 5px 10px;

      &:before {
        margin-bottom: 0;
      }

      a {
        width: 20px;
        height: 20px;
        font-size: 12px;

        &:before {
          line-height: 20px;
        }
      }
    }
  }

  @media only screen and (max-width: 576px) {
    font-size: 14px;
    line-height: 18px;
  }
`;

const PreviewWrapper = styled.div`
  padding: 10px 0;
  border-top: 1px dashed ${BORDER_SECONDARY_LIGHT};
  border-bottom: 1px dashed ${BORDER_SECONDARY_LIGHT};
`;

export const TextEditorField = /* istanbul ignore next */ ({
  input,
  label,
  previewLabel,
  disabled,
  meta,
  tip,
  splitInHalf,
}) => (
  <React.Fragment>
    <Wrapper label={label} tip={tip} meta={meta} splitInHalf={splitInHalf}>
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
