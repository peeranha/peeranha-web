import { black } from 'style-constants';
import styled from 'styled-components';

/* istanbul ignore next */
const IconStyled = styled.span`
  display: inline-block;
  margin-right: ${props => (props.noMargin ? '0' : '10')}px;
  vertical-align: 1px;
  stroke: ${black};
`;

export default IconStyled;
