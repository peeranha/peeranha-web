import styled from 'styled-components';

export default styled.form`
  h3 {
    margin-bottom: 38px;
  }

  > button,
  > div > button {
    &[type='button'] {
      margin-bottom: 30px;
      display: flex;
    }

    &[type='submit'] {
      margin-bottom: 12px;
      display: flex;
    }
  }

  @media only screen and (max-width: 768px) {
    h3 {
      margin-bottom: 20px;
    }
  }
`;
