import styled from 'styled-components';
import { BORDER_SECONDARY, BG_LIGHT, SECONDARY_SPECIAL_2, BORDER_PRIMARY, BORDER_PRIMARY_RGB } from 'style-constants';

const Base = styled.div`
  background: ${BG_LIGHT};
  padding: 20px 30px;

  overflow: ${x => (x.overflowHidden ? 'hidden' : 'initial')};
  border: ${x => (x.bordered ? `1px solid ${BORDER_PRIMARY} !important` : '0')};
  box-shadow: ${x => (x.bordered && !x.position ? `0 0 0 1px rgba(${BORDER_PRIMARY_RGB}, 0.4) !important` : `none`)};

  @media only screen and (max-width: 576px) {
    padding: ${x => (!x.nullMobilePadding ? '15px' : '0px')};
    border-radius: 0;
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

  ${x => (x.position === 'middle' ? `border-bottom: 1px solid ${BORDER_SECONDARY};` : '')}
`;

export default Base;
