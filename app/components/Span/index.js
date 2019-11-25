import styled from 'styled-components';
import { APP_FONT, TEXT_DARK } from 'style-constants';

/* eslint indent: 0 */
const Span = styled.span`
  color: ${({ color }) => color || TEXT_DARK};
  opacity: ${({ opacity }) => Number(opacity) || 1};
  font-weight: ${({ bold }) => (bold ? '600' : 'normal')};
  font-size: ${({ fontSize }) => (fontSize ? Number(fontSize) : '16')}px;
  line-height: ${({ fontSize, lineHeight }) =>
    fontSize && !lineHeight
      ? Math.floor(1.2 * Number(fontSize))
      : lineHeight}px;

  font-style: ${({ isItalic }) => (isItalic ? 'italic' : 'normal')};
  font-family: ${APP_FONT};
  text-align: left;

  @media only screen and (max-width: 576px) {
    ${({ mobileFS }) =>
      mobileFS
        ? `
      font-size: ${mobileFS}px !important;
      line-height: ${Number(mobileFS) * 1.2}px !important;
    `
        : ``};
  }
`;

export default Span;
