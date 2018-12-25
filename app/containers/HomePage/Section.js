import styled from 'styled-components';

const Section = styled.section`
  font-family: OpenSans, sans-serif;
  overflow: hidden;
  padding: 110px 0;
  font-size: 16px;

  h1 {
    font-size: 65px;
    line-height: 80px;
    font-family: OpenSansBold, sans-serif;
    letter-spacing: -2.6px;
  }

  h2 {
    font-size: 45px;
    line-height: 55px;
    font-family: OpenSansBold, sans-serif;
    letter-spacing: -1.8px;
  }

  h3 {
    font-size: 30px;
    line-height: 40px;
    font-family: OpenSansBold, sans-serif;
    letter-spacing: -1.3px;
  }

  h4 {
    font-size: 16px;
    line-height: 26px;
    font-family: OpenSansBold, sans-serif;
    letter-spacing: -1px;
  }

  p {
    font-size: 20px;
    line-height: 30px;
    letter-spacing: -0.8px;
    font-family: OpenSans, sans-serif;
  }

  p.special-paragraph {
    font-size: 24px;
    line-height: 34px;
    letter-spacing: -1px;
    font-family: OpenSans, sans-serif;
  }

  @media only screen and (max-width: 992px) {
    font-size: 12px;
    padding: 60px 0;

    form {
      button {
        padding: 0 !important;
        font-size: 16px !important;
      }

      input {
        padding: 0 12px !important;
        font-size: 16px !important;
      }
    }
  }

  @media only screen and (max-width: 560px) {
    font-size: 10px;
  }
`;

export default Section;
