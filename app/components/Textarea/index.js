import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Styles } from 'components/Input/InputStyled';
import TextareaAutosize from 'react-textarea-autosize';

export const TextareaStyled = styled(TextareaAutosize)`
  ${Styles};
  resize: none;
  min-height: 90px;
`;

const Textarea = props => <TextareaStyled {...props} />;

Textarea.propTypes = {
  value: PropTypes.string,
};

export default Textarea;
