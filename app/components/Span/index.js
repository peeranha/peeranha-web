import styled from 'styled-components';
import { APP_FONT, TEXT_DARK } from 'style-constants';

/* eslint indent: 0 */
const Span = styled.span`
  color: ${({ color }) => color || TEXT_DARK};
  opacity: ${({ opacity }) => +opacity || 1};
  font-weight: ${({ bold }) => (bold ? '600' : 'normal')};
  font-size: ${({ fontSize }) => fontSize || '16'}px;
  line-height: ${({ fontSize, lineHeight }) =>
    fontSize && !lineHeight
      ? +fontSize + 2
      : lineHeight || +fontSize + 2 || 16}px;

  font-style: ${({ isItalic }) => (isItalic ? 'italic' : 'normal')};
  font-family: ${APP_FONT};
  text-align: left;

  @media only screen and (max-width: 576px) {
    ${({ mobileFS, mobileLH }) =>
      mobileFS
        ? `
      font-size: ${mobileFS}px !important;
      line-height: ${
        mobileFS && !mobileLH ? +mobileFS + 2 : mobileLH || +mobileFS + 2 || 16
      }px !important;
    `
        : ``};
  }
`;

export default Span;
