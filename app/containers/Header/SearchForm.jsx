import React, { useState } from 'react';
import PropTypes from 'prop-types';

import createdHistory from 'createdHistory';

import * as routes from 'routes-config';
import Input from 'components/Input';

const SearchForm = ({ placeholder, className, onBlur, searchFormId }) => {
  const initialState = '';
  const [text, changeText] = useState(initialState);

  return (
    <form
      className={className}
      onSubmit={e => {
        e.preventDefault();
        createdHistory.push(routes.search(text));
      }}
    >
      <Input
        type="text"
        input={{
          id: searchFormId,
          name: searchFormId,
          value: text,
          onChange: e => changeText(e.target.value),
          onBlur,
        }}
        placeholder={placeholder}
        isSearchable
        onClick={() => {
          changeText(initialState);
          createdHistory.push(routes.search(''));
        }}
      />
    </form>
  );
};

SearchForm.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  searchFormId: PropTypes.string,
  onBlur: PropTypes.func,
};

export default React.memo(SearchForm);
