import styled from 'styled-components';
import { APP_FONT, TEXT_DARK } from 'style-constants';
import { italicFont } from '../../global-styles';

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

  font-style: ${({ isItalic }) => (isItalic ? italicFont : 'normal')};
  font-family: ${({ fontFamily }) => fontFamily || APP_FONT};
  text-align: left;
  letter-spacing: ${({ letterSpacing }) => letterSpacing || 'normal'};
  text-overflow: ${({ textOverflow }) => textOverflow || 'clip'};
  white-space: ${({ textOverflow }) => (textOverflow ? 'nowrap' : 'normal')};
  overflow: ${({ textOverflow }) => (textOverflow ? 'hidden' : 'visible')};

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
