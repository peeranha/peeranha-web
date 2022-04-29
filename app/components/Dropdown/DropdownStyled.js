import styled from 'styled-components';

const DropdownStyled = styled.div`
  display: flex;
  align-items: center;

  &.dropdown .dropdown-arrow {
    transition: 0.5s;
    transform: rotate(0deg);
  }

  &.dropdown.show .dropdown-arrow {
    transform: rotate(180deg);
  }

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
      ${({ isArrowMarginMobile }) =>
        !isArrowMarginMobile && 'margin-right: 0px !important;'};

      :nth-child(2) {
        display: ${({ isMenuLabelMobile }) =>
          !isMenuLabelMobile ? 'none' : 'flex'};
      }
    }

    img[alt='data-icon'] {
      display: none;
    }
  }
`;

export default DropdownStyled;
