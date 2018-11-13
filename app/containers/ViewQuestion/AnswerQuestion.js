import React from 'react';
import TextEditor from 'components/TextEditor';

const AnswerQuestion = () => (
  <div className="answer-question">
    <form>
      <h3>ReduxForm</h3>
      <TextEditor />
      <button>AuthButton</button>
    </form>
  </div>
);

export default AnswerQuestion;
