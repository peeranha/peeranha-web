import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import createdHistory from 'createdHistory';

import * as routes from 'routes-config';
import Input from 'components/Input';
import i18next from 'app/i18n';

const SearchForm = ({ placeholder, className, onBlur, searchFormId }) => {
  const [text, changeText] = useState('');
  const [lastPathName, changeLastPathName] = useState('');
  const baseUrl = i18next.language === 'en' ? '' : `/${i18next.language}`;

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      createdHistory.push(baseUrl + routes.search(text));
      changeLastPathName(baseUrl + routes.search());
    },
    [text],
  );

  const input = useMemo(
    () => ({
      id: searchFormId,
      name: searchFormId,
      value: text,
      onChange: (e) => changeText(e.target.value),
      onBlur,
    }),
    [text, searchFormId, onBlur],
  );

  if (
    !createdHistory.location.pathname.includes(routes.search()) &&
    lastPathName === routes.search() &&
    text !== ''
  ) {
    changeText('');
    changeLastPathName('');
  }

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <form className={className} onSubmit={onSubmit}>
      <Input type="text" input={input} placeholder={placeholder} isSearchable onClick={onSubmit} />
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
