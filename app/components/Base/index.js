import styled from 'styled-components';
import { BORDER_SECONDARY, BG_LIGHT } from 'style-constants';

/* istanbul ignore next */
const Base = styled.div`
  background: ${BG_LIGHT};
  padding: 20px 30px;

  ${props =>
    props.position === 'top'
      ? `border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom: 1px solid ${BORDER_SECONDARY};`
      : ''}

  ${props =>
    props.position === 'bottom'
      ? 'border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; box-shadow: 0 2px 2px 0 #00000013;'
      : ''}

  ${props =>
    props.position === 'left'
      ? `border-top-left-radius: 5px; border-bottom-left-radius: 5px; box-shadow: 0 2px 2px 0 #00000013; border-right: 1px solid ${BORDER_SECONDARY};`
      : ''}

  ${props =>
    props.position === 'right'
      ? 'border-top-right-radius: 5px; border-bottom-right-radius: 5px; box-shadow: 0 2px 2px 0 #00000013;'
      : ''}

  ${props =>
    props.position === 'middle'
      ? `border-bottom: 1px solid ${BORDER_SECONDARY};`
      : ''}
`;

export default Base;
