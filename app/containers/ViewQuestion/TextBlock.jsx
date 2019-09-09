import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TEXT_DARK, BG_SECONDARY_LIGHT } from 'style-constants';

import testBlockStyles from 'text-block-styles';
import TextEditor from 'components/TextEditor';

const TextBlockStyled = styled.div`
  word-break: break-all;

  ${testBlockStyles}

  color: ${TEXT_DARK};
  font-size: 19px;
  line-height: 24px;

  pre {
    padding: 15px;
    max-height: 400px;
    background: ${BG_SECONDARY_LIGHT}75;
    margin: 10px 0;
  }

  code {
    background: ${BG_SECONDARY_LIGHT}75;
    font-size: 15px;
    line-height: 20px;
    color: ${TEXT_DARK};
  }

  code,
  pre {
    overflow: auto;
    word-break: normal;
  }
`;

export const TextBlock = ({ content, className }) => (
  <TextBlockStyled
    className={`text-block ${className}`}
    dangerouslySetInnerHTML={{ __html: TextEditor.getHtmlText(content) }}
  />
);

TextBlock.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
};

export { TextBlockStyled };
export default React.memo(TextBlock);
