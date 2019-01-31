import styled from 'styled-components';
import { gray, white } from 'style-constants';

const Base = styled.div`
  background: ${white};
  padding: 20px 30px;
  border-bottom: 1px solid ${gray};
  border-top-left-radius: ${props =>
    props.position === 'top' ? '5px' : '0px'};
  border-top-right-radius: ${props =>
    props.position === 'top' ? '5px' : '0px'};
  border-bottom-left-radius: ${props =>
    props.position === 'bottom' ? '5px' : '0px'};
  border-bottom-right-radius: ${props =>
    props.position === 'bottom' ? '5px' : '0px'};
  box-shadow: ${props =>
    props.position === 'bottom' ? '0 2px 2px 0 rgba(0, 0, 0, 0.1)' : 'none'};
`;

export default Base;
