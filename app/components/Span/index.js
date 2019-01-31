import styled from 'styled-components';
import { black, blue, darkgray } from 'style-constants';

const colors = {
  black,
  blue,
  gray: darkgray,
};

const Span = styled.span`
  color: ${props => (props.color ? colors[props.color] : colors.black)};
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  font-size: ${props => (props.fontSize ? +props.fontSize : '16')}px;
  line-height: ${props => (props.fontSize ? 1.25 * +props.fontSize : '20')}px;
  font-family: Source Sans Pro, sans-serif;
  text-align: left;

  [data-icon='icon'] {
    margin-right: 12px;
    stroke: ${props => (props.color ? colors[props.color] : colors.gray)};
  }
`;

export default Span;
