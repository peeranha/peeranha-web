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
  * {
    font-family: OpenSans !important;
  }

  a {
    color: #ffffff !important;
  }

  .bottom-level {
    display: flex;
    justify-content: center;
    height: 48px;
  }

  .send-message-form {
    ${submitButton};
  }

  .get-started-form {
    display: flex;
    flex-basis: 500px;
    flex-wrap: nowrap;
    height: 100%;
    font-size: 18px;
    input {
      flex: 2;
      border: 1px solid #afb5ca;
      background: #fff;
      border-radius: 3px;
      color: #000000;
      padding: 0 18px;
      margin-right: 10px;
    }
    ${submitButton};
  }

  header.scroll {
    padding: 5px 0;
    > div .logo {
      img {
        width: 180px !important;
      }
    }
  }
`;

export default Landing;
