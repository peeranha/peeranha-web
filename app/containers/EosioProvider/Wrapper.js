import styled from 'styled-components';

const LoadingIndicatorCell = `40px`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    width: ${LoadingIndicatorCell};
    height: ${LoadingIndicatorCell};
    position: absolute;
    top: calc(45vh - ${LoadingIndicatorCell});
  }
`;

export default Wrapper;
