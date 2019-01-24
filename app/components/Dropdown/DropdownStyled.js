import styled from 'styled-components';

const DropdownStyled = styled.div`
  .arrow {
    display: inline-block;
    transition: 0.5s;
  }

  button[aria-expanded='true'] .arrow {
    transform: rotate(180deg);
  }

  button[aria-expanded='false'] .arrow {
    transform: rotate(0deg);
  }
`;

export default DropdownStyled;
