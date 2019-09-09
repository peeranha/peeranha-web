import styled from 'styled-components';

const DropdownStyled = styled.div`
  display: flex;
  align-items: center;

  button[aria-expanded='false'][data-icon='arrow'] img[alt='data-icon'] {
    transition: 0.5s;
    transform: scale(0.6) rotate(0deg);
  }

  button[aria-expanded='true'][data-icon='arrow'] img[alt='data-icon'] {
    transition: 0.5s;
    transform: scale(0.6) rotate(180deg);
  }

  @media only screen and (max-width: 576px) {
    span {
      margin-right: 0px !important;
    }

    img[alt='data-icon'] {
      display: none;
    }
  }
`;

export default DropdownStyled;
