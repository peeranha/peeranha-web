import styled from 'styled-components';

const Gradient = styled.div`
  background-image: linear-gradient(
    to ${props => props.position || 'top'},
    #f6f6f6 0,
    #f6f6f699 10px,
    #f6f6f675 20px,
    #f6f6f640 30px,
    #f6f6f600 40px
  );
  background-repeat: no-repeat;
  background-size: 100% 50px;
  background-position: ${x => (x.position === 'bottom' ? 'top' : 'bottom')};
`;

export default Gradient;
