import styled from 'styled-components';
import IconStyled, { IconHover } from 'components/Icon/IconStyled';

import { APP_FONT, TEXT_DARK } from 'style-constants';

/* istanbul ignore next */
/* eslint indent: 0 */
const Span = styled.span`
  color: ${({ color }) => color || TEXT_DARK};
  opacity: ${({ opacity }) => +opacity || 1};
  font-weight: ${({ bold }) => (bold ? '600' : 'normal')};
  font-size: ${({ fontSize }) => (fontSize ? +fontSize : '16')}px;
  line-height: ${({ fontSize }) => (fontSize ? 1.25 * +fontSize : '20')}px;
  font-style: ${({ isItalic }) => (isItalic ? 'italic' : 'normal')};
  font-family: ${APP_FONT};
  text-align: left;

  @media only screen and (max-width: 576px) {
    ${({ mobileFS }) =>
      mobileFS
        ? `
      font-size: ${mobileFS}px !important;
      line-height: ${Number(mobileFS) * 1.25}px !important;
    `
        : ``};
  }

  ${x =>
    x.color
      ? `
    ${IconStyled} {
      ${IconHover({ color: x.color })};
    }
  `
      : ``};
`;

export default Span;
