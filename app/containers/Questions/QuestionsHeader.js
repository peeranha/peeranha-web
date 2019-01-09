import React from 'react';
import PropTypes from 'prop-types';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import SelectField from 'components/FormFields/SelectField';

import messages from './messages';

const askQuestion = () => createdHistory.push(routes.question_ask());

const QuestionsHeader = ({ translations, communities, getInitQuestions }) => {
  const options = [{ label: 'ALL', value: 0 }, ...communities];

  return (
    <div>
      <div className="questions-header">
        <h4 className="text-uppercase font-weight-bold">
          {translations[messages.title.id]}
        </h4>
        <button className="btn btn-secondary" onClick={askQuestion}>
          {translations[messages.askQuestion.id]}
        </button>
      </div>
      <SelectField
        input={{ onChange: e => getInitQuestions(e.value) }}
        isMulti={false}
        isClearable={false}
        isSearchable
        isDisabled={false}
        defaultValue={options[0]}
        options={options}
      />
    </div>
  );
};

QuestionsHeader.propTypes = {
  translations: PropTypes.object,
  communities: PropTypes.array,
  getInitQuestions: PropTypes.func,
};

export { askQuestion };
export default QuestionsHeader;
