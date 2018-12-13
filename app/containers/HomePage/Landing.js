import styled from 'styled-components';

const submitButton = `
  button {
    flex: 1;
    background-color: #FC6655;
    border-radius: 3px;
    color: #FFF;
    cursor: pointer;
  }
`;

const Landing = styled.div`
  font-family: OpenSans;

  a {
    color: #ffffff !important;
  }

  .bottom-level {
    height: 48px;
  }

  .separator {
    background: linear-gradient(
      to bottom,
      #f9f9f9 0%,
      #f8f8f8 0%,
      #fafafa 20%,
      #fbfbfb 59%,
      #fbfbfb 59%,
      #fcfcfc 80%,
      #fdfdfd 100%
    );
  }

  .send-message-form {
    ${submitButton};
  }

  .get-started-form {
    height: 100%;
    font-size: 18px;
    letter-spacing: -0.7px;
    margin: 0;

    input {
      border: 1px solid #afb5ca;
      background: #fff;
      border-radius: 3px;
      color: #000000;
      padding: 14px 24px 18px 24px;
      margin-right: 10px;

      ::placeholder {
        color: #9b9b9b;
      }
    }

    ${submitButton};
  }

  header.scroll {
    position: fixed;
    background-color: rgba(9, 17, 40, 0.9);
    animation: header 1s;

    @keyframes header {
      0% {
        transform: translate(0px, -180px);
      }
      100% {
        transform: translate(0, 0px);
      }
    }

    padding: 5px 0;
    > div .logo {
      img {
        width: 180px !important;
      }
    }
  }

  @media only screen and (max-width: 992px) {
    .bottom-level {
      height: auto;
      form * {
        height: 48px;
        margin: 0 0 10px 0;
      }
    }
  }
`;

export default Landing;
