import styled from 'styled-components';

const gray = `#e4e6e8`;
const rating_column_width = 60;

/* eslint camelcase: 0 */
const Box = styled.div`
  padding: 0 10px;
  margin: 0 auto;
  max-width: 720px;
  min-width: 320px;
  .question-title {
    padding: 10px 0;
    border-bottom: 1px solid ${gray};
  }
  .content {
    display: flex;
    flex-basis: 100%;
    min-height: 150px;
    padding: 10px 0;
    flex-wrap: nowrap;
    .content-body {
      flex: 1;
    }
    .content-body {
      max-width: 100%;
      padding-left: ${rating_column_width}px;
      .text-block {
        pre {
          padding: 10px;
          background: ${gray};
          font-size: 14px;
        }
      }
    }
    .content-rating {
      position: absolute;
      display: flex;
      flex-direction: column;
      width: ${rating_column_width}px;
      .rating-value {
        padding: 10px 0;
      }
      .chevron {
        cursor: pointer;
        color: gray;
        margin: 0 auto;
        font-style: normal;
        font-size: 1.5em;
      }
    }
    .content-options {
      > * {
        margin-bottom: 10px;
      }
      .option {
        cursor: pointer;
        font-size: 14px;
        color: blue;
      }
      .add-comment {
        display: none;
      }
      .option[data-opened='true'] ~ .add-comment {
        display: block;
      }
      .add-comment form {
        display: flex;
        flex-direction: column;
        button {
          font-size: 13px;
          align-self: flex-end;
        }
        > * {
          flex: 1;
          margin-bottom: 10px;
        }
      }
    }
  }
`;

export default Box;
