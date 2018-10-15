import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  min-height: 50vh;
  align-items: center;
  justify-content: center;
  form {
    flex-basis: 480px;
  }
  form * {
    margin: 3px 0;
  }
  .text-danger {
    padding-left: 10px;
    padding-top: 2px;
    font-size: 14px;
  }
`;

export default Wrapper;
