import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import createdHistory from 'createdHistory';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

import * as routes from 'routes-config';
import Input from 'components/Input';

const single = isSingleCommunityWebsite();

const SearchForm = ({ placeholder, className, onBlur, searchFormId }) => {
  const [text, changeText] = useState('');
  const [disabled, setDisabled] = useState(false);

  const onMouseEnter = useCallback(
    () => {
      if (single) {
        setDisabled(true);
      }
    },
    [setDisabled],
  );

  const onMouseLeave = useCallback(
    () => {
      if (single) {
        setDisabled(false);
      }
    },
    [setDisabled],
  );

  const onClickHandler = useCallback(
    () => {
      onBlur();
      if (!disabled) {
        changeText('');
        createdHistory.push(routes.search(''));
      }
    },
    [onBlur, changeText, disabled],
  );

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      createdHistory.push(routes.search(text));
    },
    [text],
  );

  const input = useMemo(
    () => ({
      id: searchFormId,
      name: searchFormId,
      value: disabled
        ? 'Search functionality is currently in development'
        : text,
      onChange: e => changeText(e.target.value),
      onBlur,
    }),
    [disabled, text, searchFormId, onBlur],
  );

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <form
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseEnter}
      onSubmit={onSubmit}
    >
      <Input
        type="text"
        input={input}
        disabled={disabled}
        placeholder={placeholder}
        isSearchable
        onClick={onClickHandler}
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
