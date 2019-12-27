import styled from 'styled-components';

export default styled.form`
  h3 {
    margin-bottom: 38px;
  }

  > * {
    &:nth-last-child(2) {
      margin-bottom: 30px;
    }
  }

  > button {
    display: flex;

    &[type='submit'] {
      margin-bottom: 12px;
    }
  }

  @media only screen and (max-width: 768px) {
    h3 {
      margin-bottom: 20px;
    }
  }
`;
