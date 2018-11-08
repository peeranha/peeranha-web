import styled from 'styled-components';

const secondary = '#6c757d';

const Box = styled.div`
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }
  a:not(.highlighted-link) {
    color: #000;
  }
  .questions-header {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-end;
    padding-top: 15px;
    padding-bottom: 25px;
  }
  .question-item {
    display: flex;
    padding: 20px;
    cursor: pointer;
    border-bottom: 2px solid ${secondary};
  }
  .question-item .title-user {
    padding: 0 5px;
    align-self: flex-end;
    overflow: hidden;
    flex: 4;
    > * {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .question-item .votes-answers {
    display: flex;
    align-self: baseline;
    text-align: center;
    flex-basis: 200px;
    .answers[data-bg='true'] {
      border-color: #45a163;
      color: #45a163;
    }
    .votes,
    .answers {
      flex: 1;
      margin: 0 5px;
      padding: 5px 0;
      border-radius: 4px;
      border: 2px solid ${secondary};
      > .number {
        font-size: 20px;
      }
    }
  }
`;

export default Box;
