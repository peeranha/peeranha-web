import styled from 'styled-components';

const Wrapper = styled.header`
  padding: 10px 0;
  li {
    padding: 8px 8px 0 12px;
    font-size: 18px;
    @media only screen and (min-width: 992px) {
      &:first-child {
        padding-left: 32px;
      }
    }
  }
  form {
    flex-wrap: nowrap;
    @media only screen and (max-width: 576px) {
      * {
        margin: 0 2px;
      }
    }
    input {
      flex: 1;
    }
  }
`;

export default Wrapper;
