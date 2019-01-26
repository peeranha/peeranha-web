import styled from 'styled-components';

const DropdownStyled = styled.div`
  display: flex;
  align-items: center;

  button {
    padding: 0;
    margin: 0;
  }

  .chevron-up {
    display: inline-block;
    transition: 0.5s;
    color: #7b7b7b;
  }

  button[aria-expanded='true'] .chevron-up {
    transform: rotate(0deg);
  }

  button[aria-expanded='false'] .chevron-up {
    transform: rotate(180deg);
  }
`;

export default DropdownStyled;
