import styled from 'styled-components';

const Landing = styled.div`
  font-family: OpenSans;
  overflow: hidden;

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
`;

export default Landing;
