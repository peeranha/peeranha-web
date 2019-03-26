import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { black, lightgray } from 'style-constants';

import testBlockStyles from 'text-block-styles';
import TextEditor from 'components/TextEditor';

const TextBlockStyled = styled.div`
  ${testBlockStyles}

  color: ${black};
  font-size: 19px;
  line-height: 24px;

  pre {
    padding: 15px;
    max-height: 400px;
    background: ${lightgray}75;
    margin: 10px 0;
  }

  code {
    background: ${lightgray}75;
    font-size: 15px;
    line-height: 20px;
    color: ${black};
  }

  code,
  pre {
    overflow: auto;
    word-break: normal;
  }
`;

export const TextBlock = ({ content }) => (
  <TextBlockStyled
    className="text-block"
    dangerouslySetInnerHTML={{ __html: TextEditor.getHtmlText(content) }}
  />
);

TextBlock.propTypes = {
  content: PropTypes.string,
};

export default React.memo(TextBlock);
