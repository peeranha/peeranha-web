import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TEXT_DARK, SECONDARY_SPECIAL_3 } from 'style-constants';

import testBlockStyles from 'text-block-styles';
import TextEditor from 'components/TextEditor';

const TextBlockStyled = styled.div`
  word-break: break-all;

  ${testBlockStyles}

  color: ${TEXT_DARK};
  font-size: 18px;
  line-height: 21px;

  code {
    padding: 15px;
  }

  pre {
    max-height: 400px;
    margin: 10px 0;

    @media only screen and (max-width: 576px) {
      max-height: 200px;
    }

    code {
      background: none;
    }
  }

  code,
  pre {
    background: ${SECONDARY_SPECIAL_3};
    font-size: 15px;
    line-height: 20px;
    color: ${TEXT_DARK};
    overflow: auto;
    display: flex;
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
