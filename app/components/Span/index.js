import styled from 'styled-components';

import {
  black,
  blue,
  darkgray,
  white,
  darkblue,
  pink,
  darkred,
  green,
  APP_FONT,
} from 'style-constants';

const colors = {
  black,
  blue,
  darkblue,
  white,
  pink,
  green,
  darkred,
  gray: darkgray,
};

/* istanbul ignore next */
const Span = styled.span`
  color: ${props => (props.color ? colors[props.color] : colors.black)};
  opacity: ${props => +props.opacity || 1};
  font-weight: ${props => (props.bold ? '600' : 'normal')};
  font-size: ${props => (props.fontSize ? +props.fontSize : '16')}px;
  line-height: ${props => (props.fontSize ? 1.25 * +props.fontSize : '20')}px;
  font-style: ${props => (props.isItalic ? 'italic' : 'normal')};
  font-family: ${APP_FONT};
  text-align: left;

  [data-icon='icon'] {
    stroke: ${props => (props.color ? colors[props.color] : colors.gray)};
    fill: ${props => (props.color ? colors[props.color] : colors.gray)};
  }
`;

export default Span;
