import styled from 'styled-components';

import {
  BORDER_SECONDARY,
  BG_LIGHT,
  SECONDARY_SPECIAL_2,
  BORDER_PRIMARY,
  BORDER_PRIMARY_RGB,
  BORDER_RADIUS_L,
} from 'style-constants';

const Base = styled.div`
  background: ${BG_LIGHT};
  padding: 20px 30px;
  flex-grow: 1;
  padding-top: ${({ paddingTop }) => paddingTop || 20}px;

  overflow: ${({ overflowHidden }) => (overflowHidden ? 'hidden' : 'initial')};
  border: ${({ bordered }) =>
    bordered ? `1px solid ${BORDER_PRIMARY} !important` : '0'};
  box-shadow: ${({ bordered, position }) =>
    bordered && !position
      ? `0 0 0 1px rgba(${BORDER_PRIMARY_RGB}, 0.4) !important`
      : `none`};
  border-top-left-radius: ${({ bordered, topRightRadius, withoutBR }) =>
    (bordered || topRightRadius) && !withoutBR ? BORDER_RADIUS_L : 'none'};
  border-bottom-left-radius: ${({ bordered, bottomRightRadius, withoutBR }) =>
    (bordered || bottomRightRadius) && !withoutBR ? BORDER_RADIUS_L : 'none'};

  @media only screen and (max-width: 768px) {
    border-top-left-radius: ${({ bordered, topRightRadius, withoutBR }) =>
      (bordered || topRightRadius) && !withoutBR ? BORDER_RADIUS_L : 'none'};
    border-top-right-radius: ${({ bordered, bottomRightRadius, withoutBR }) =>
      (bordered || bottomRightRadius) && !withoutBR ? BORDER_RADIUS_L : 'none'};
    border-bottom-left-radius: 0;
  }

  @media only screen and (max-width: 576px) {
    padding: ${({ nullMobilePadding }) => (nullMobilePadding ? '0px' : '15px')};
    ${({ paddingTopMedia }) => `padding-top: ${paddingTopMedia}px`};
    border-radius: 0;
  }  

  ${x =>
    x.position === 'top'
      ? `border-top-left-radius: ${BORDER_RADIUS_L}; border-top-right-radius: ${BORDER_RADIUS_L}; border-bottom: 1px solid ${BORDER_SECONDARY};`
      : ''}

  ${x =>
    x.position === 'bottom'
      ? `border-bottom-left-radius: ${BORDER_RADIUS_L}; border-bottom-right-radius: ${BORDER_RADIUS_L}; box-shadow: 0 2px 2px 0 ${SECONDARY_SPECIAL_2};`
      : ''}

  ${x =>
    x.position === 'left'
      ? `border-top-left-radius: ${BORDER_RADIUS_L}; border-bottom-left-radius: ${BORDER_RADIUS_L}; box-shadow: 0 2px 2px 0 ${SECONDARY_SPECIAL_2}; border-right: 1px solid ${BORDER_SECONDARY};`
      : ''}

  ${x =>
    x.position === 'right'
      ? `border-top-right-radius: ${BORDER_RADIUS_L}; border-bottom-right-radius: ${BORDER_RADIUS_L}; box-shadow: 0 2px 2px 0 ${SECONDARY_SPECIAL_2};`
      : ''}

  ${x =>
    x.position === 'middle'
      ? `border-bottom: 1px solid ${BORDER_SECONDARY};`
      : ''}
`;

export default Base;
