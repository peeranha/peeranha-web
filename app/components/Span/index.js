import styled from 'styled-components';
import IconStyled from 'components/Icon/IconStyled';

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
  color: ${({ color }) => (color ? colors[color] : colors.black)};
  opacity: ${({ opacity }) => +opacity || 1};
  font-weight: ${({ bold }) => (bold ? '600' : 'normal')};
  font-size: ${({ fontSize }) => (fontSize ? +fontSize : '16')}px;
  line-height: ${({ fontSize }) => (fontSize ? 1.25 * +fontSize : '20')}px;
  font-style: ${({ isItalic }) => (isItalic ? 'italic' : 'normal')};
  font-family: ${APP_FONT};
  text-align: left;

  ${IconStyled} {
    stroke: ${({ color }) => (color ? colors[color] : colors.gray)};
    fill: ${({ color }) => (color ? colors[color] : colors.gray)};
  }
`;

export default Span;
