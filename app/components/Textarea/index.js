import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Styles } from 'components/Input/InputStyled';

export const TextareaStyled = styled.textarea`
  ${Styles};
  height: ${x => (x.rows > 3 ? `${x.rows * 20 + 22}px` : '90px')} !important;
  /* For height calculating were taken line-height = 20px, which is set in InputStyled, */
  /* and 22px for vertical paddings */
  resize: none;
`;

const Textarea = props => {
  const { value } = props;
  const rowsNumber = value.split('\n').length;

  return <TextareaStyled {...props} rows={rowsNumber} />;
};

Textarea.propTypes = {
  value: PropTypes.string,
};

export default Textarea;
