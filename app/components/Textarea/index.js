import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Styles } from 'components/Input/InputStyled';

export const TextareaStyled = styled.textarea`
  ${Styles};
  resize: none;
  overflow: hidden;
`;

const Textarea = props => {
  const textareaRef = useRef(null);
  const [currentValue, setCurrentValue] = useState(null);

  useEffect(
    () => {
      textareaRef.current.style.height = '90px';
      const { scrollHeight } = textareaRef.current;
      textareaRef.current.style.height = `${scrollHeight + 2}px`;
    },
    [currentValue],
  );

  return (
    <TextareaStyled
      innerRef={textareaRef}
      {...props}
      height={currentValue}
      onKeyUp={e => setCurrentValue(e.target.value)}
    />
  );
};

Textarea.propTypes = {
  value: PropTypes.string,
};

export default Textarea;
