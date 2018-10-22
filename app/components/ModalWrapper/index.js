import styled from 'styled-components';

const ModalWrapper = styled.div`
  padding: 40px 20px;
  .border-top-2 {
    border-top: 2px solid rgba(0, 0, 0, 0.2);
  }
  p {
    text-align: center;
  }
  a,
  .btn-link {
    color: #000;
  }
  .border-or-top-2::before,
  .border-or-top-2::after {
    content: '';
    width: 40%;
    height: 1px;
    margin: 3px 10px;
    display: inline-block;
    background: #000;
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
