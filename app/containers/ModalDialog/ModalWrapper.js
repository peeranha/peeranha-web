import styled from 'styled-components';

const ModalWrapper = styled.div`
  padding: 40px 20px;

  p {
    text-align: center;
  }

  a,
  .btn-link {
    color: #000;
  }

  button > div {
    margin: 0 auto;
    width: 20px;
    height: 20px;

    > div::before {
      background: #fff;
    }
  }
`;

export default ModalWrapper;
