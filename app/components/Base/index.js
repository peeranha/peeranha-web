import styled from 'styled-components';
import {
  BORDER_SECONDARY,
  BG_LIGHT,
  SECONDARY_SPECIAL_2,
  BORDER_PRIMARY,
  BORDER_PRIMARY_RGB,
} from 'style-constants';

const Base = styled.div`
  background: ${BG_LIGHT};
  padding: 20px 30px;

  overflow: ${({ overflowHidden }) => (overflowHidden ? 'hidden' : 'initial')};
  border: ${({ bordered, isBordered }) =>
    bordered && isBordered ? `1px solid ${BORDER_PRIMARY} !important` : '0'};
  box-shadow: ${({ bordered, position }) =>
    bordered && !position
      ? `0 0 0 1px rgba(${BORDER_PRIMARY_RGB}, 0.4) !important`
      : `none`};

  .expert-question {
    position: absolute;
    right: 45px;
  }

  @media only screen and (max-width: 576px) {
    padding: ${({ nullMobilePadding }) => (nullMobilePadding ? '0px' : '15px')};
    border-radius: 0;

    .expert-question {
      right: 0;
    }
  }

  ${x =>
    x.position === 'top'
      ? `border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom: 1px solid ${BORDER_SECONDARY};`
      : ''}

  ${x =>
    x.position === 'bottom'
      ? `border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; box-shadow: 0 2px 2px 0 ${SECONDARY_SPECIAL_2};`
      : ''}

  ${x =>
    x.position === 'left'
      ? `border-top-left-radius: 5px; border-bottom-left-radius: 5px; box-shadow: 0 2px 2px 0 ${SECONDARY_SPECIAL_2}; border-right: 1px solid ${BORDER_SECONDARY};`
      : ''}

  ${x =>
    x.position === 'right'
      ? `border-top-right-radius: 5px; border-bottom-right-radius: 5px; box-shadow: 0 2px 2px 0 ${SECONDARY_SPECIAL_2};`
      : ''}

  ${x =>
    x.position === 'middle'
      ? `border-bottom: 1px solid ${BORDER_SECONDARY};`
      : ''}
`;

export default Base;
