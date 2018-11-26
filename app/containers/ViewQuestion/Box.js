import styled from 'styled-components';

const gray = `#e4e6e8`;
const rating_column_width = 40;
const buttonPadding = 10;
const buttonLink = `
  font-size: 14px;
  color: blue;
`;

/* eslint camelcase: 0 */
const Box = styled.div`
  padding: 0 10px;
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  .question-title {
    padding: 10px 0;
    border-bottom: 1px solid ${gray};
  }
  textarea {
    min-height: 100px;
  }
  button {
    cursor: pointer;
  }
  button[type='submit'] {
    font-size: 13px;
    min-width: 120px;
    > div {
      margin: 0 auto;
      width: 20px;
      height: 20px;
      > div::before {
        background: #fff;
      }
    }
  }
  .user-info {
    flex-basis: 50px;
    text-align: center;
    .avatar {
      max-width: 60%;
      margin-bottom: 5px;
      border-radius: 50%;
    }
    p {
      font-size: 11px;
      margin: 0;
      font-family: monospace;
    }
  }
  .answers-title {
    padding: 5px 10px;
    margin-bottom: 10px;
    text-transform: uppercase;
    border-bottom: 2px solid ${gray};
  }
  .content {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    min-height: 150px;
    padding: 10px 0;
    flex-wrap: nowrap;
    .content-body {
      min-height: 150px;
      max-width: 100%;
      flex: 1;
      padding-left: ${rating_column_width + 10}px;
      .text-block {
        word-break: break-all;
        pre {
          padding: 10px;
          background: ${gray};
          font-size: 14px;
        }
      }
    }
    .content-rating {
      > * {
        margin: 0 auto 5px auto;
      }
      width: ${rating_column_width}px;
      position: absolute;
      display: flex;
      flex-direction: column;
      .chevron[data-voting='chevron-up-1'],
      .chevron[data-voting='chevron-down-2'] {
        color: blue;
      }
      .chevron {
        cursor: pointer;
        color: gray;
        font-style: normal;
        font-size: 1.5em;
      }
    }
    .add-comment {
      display: none;
    }
    .text-danger {
      padding-left: 10px;
      padding-top: 5px;
      font-size: 14px;
    }
    .content-options[data-opened='true'] ~ .add-comment {
      display: block;
    }
    .content-options {
      > * {
        margin-bottom: 10px;
      }
      > button:not(:last-child)::after {
        content: '|';
        position: absolute;
        padding: 0 ${0.8 * buttonPadding}px;
      }
      button {
        padding: 0 ${buttonPadding}px;
        cursor: pointer;
        ${buttonLink};
      }
    }
    .add-comment form {
      display: flex;
      flex-direction: column;
      button {
        font-size: 13px;
        float: right;
      }
      > * {
        flex: 1;
        margin-bottom: 10px;
      }
    }
    .content-header {
      position: relative;
      padding: 10px 0;
      .recording-date {
        position: absolute;
        top: 10px;
        right: 0;
        font-size: 14px;
      }
      .user-info {
        display: flex;
        .rating-name-block {
          padding: 3px 0;
          .name {
            font-size: 16px;
            line-height: 18px;
            text-align: left;
          }
          .rating {
            font-size: 13px;
            line-height: 18px;
            text-align: left;
          }
        }
        .user-avatar-block {
          margin-right: 10px;
          flex-basis: ${rating_column_width}px;
          .avatar {
            max-width: 100%;
          }
        }
      }
    }
    .save-edited-form {
      flex: 1;
      button {
        float: right;
        font-size: 13px;
        min-width: 80px;
      }
    }
    .comment-body {
      display: flex;
      padding: 10px;
      flex-wrap: nowrap;
      border-bottom: 2px solid ${gray};
      margin-bottom: 5px;
      p {
        margin-bottom: 0;
      }
      .comment-text {
        padding: 10px 5px 5px 5px;
      }
      .comment-content {
        .option-edit {
          ${buttonLink};
        }
        word-break: break-all;
        position: relative;
        flex: 1;
        .recording-date {
          position: absolute;
          right: 0;
          top: -10px;
          text-align: right;
          font-size: 13px;
        }
      }
    }
  }
`;

export default Box;
