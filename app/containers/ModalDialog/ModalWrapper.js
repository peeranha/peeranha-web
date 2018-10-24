import styled from 'styled-components';

const ModalWrapper = styled.div`
  padding: 40px 20px;
  .border-bottom-2 {
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  }
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
    height: 2px;
    margin: 3px 10px;
    display: inline-block;
    background: rgba(0, 0, 0, 0.2);
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
