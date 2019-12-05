import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as routes from 'routes-config';
import Input from 'components/Input';

const SearchForm = ({ placeholder, className, onBlur, searchFormId }) => {
  const initialState = '';
  const [text, changeText] = useState(initialState);

  return (
    <form
      className={className}
      id={`searchbox_${process.env.GOOGLE_SEARCH_FORM_ID}`}
      action={routes.search()}
    >
      <input
        value={process.env.GOOGLE_SEARCH_FORM_ID}
        name="cx"
        type="hidden"
      />
      <input
        value={process.env.GOOGLE_SEARCH_FORM_ID}
        name="cof"
        type="hidden"
      />

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
        onClick={() => changeText(initialState)}
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
