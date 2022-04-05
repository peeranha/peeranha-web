import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import createdHistory from 'createdHistory';

import * as routes from 'routes-config';
import Input from 'components/Input';

const SearchForm = ({ placeholder, className, onBlur, searchFormId }) => {
  const [text, changeText] = useState('');
  const [lastPathname, changeLastPathname] = useState('');

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      createdHistory.push(routes.search(text));
      changeLastPathname(createdHistory.location.pathname.substring(0, 7));
    },
    [text],
  );

  const input = useMemo(
    () => ({
      id: searchFormId,
      name: searchFormId,
      value: text,
      onChange: e => changeText(e.target.value),
      onBlur,
    }),
    [text, searchFormId, onBlur],
  );

  if (
    createdHistory.location.pathname.substring(0, 7) !== lastPathname &&
    lastPathname === '/search' &&
    text !== ''
  ) {
    changeText('');
    changeLastPathname('');
  }

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <form className={className} onSubmit={onSubmit}>
      <Input
        type="text"
        input={input}
        placeholder={placeholder}
        isSearchable
        onClick={onSubmit}
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
