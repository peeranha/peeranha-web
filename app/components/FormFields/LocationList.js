import styled from 'styled-components';

const grayColor = '#ced4da';
const Wrapper = styled.ul`
  width: 100%;
  list-style: none;
  background: #fff;
  border-width: 0 1px;
  border-style: solid;
  border-color: ${grayColor};
  margin: 0 !important;
  padding: 0;
  li {
    padding: 0.375rem 0.75rem;
    margin: 0;
    border-bottom: 1px solid ${grayColor};
  }
  li:hover {
    background: ${grayColor};
    cursor: pointer;
  }
`;

export default Wrapper;
