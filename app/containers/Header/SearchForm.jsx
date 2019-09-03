import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as routes from 'routes-config';
import Input from 'components/Input';

const SearchForm = ({ placeholder }) => {
  const initialState = '';
  const [text, changeText] = useState(initialState);

  return (
    <form
      target="_blank"
      className="d-none d-lg-flex"
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
          id: 'q',
          name: 'q',
          value: text,
          onChange: e => changeText(e.target.value),
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
};

export default React.memo(SearchForm);
