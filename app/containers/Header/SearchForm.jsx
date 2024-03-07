import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import createdHistory from 'createdHistory';

import * as routes from 'routes-config';
import Input from 'components/Input';
import { graphCommunityColors } from 'utils/communityManagement';

const graphCommunity = graphCommunityColors();

const SearchForm = ({ placeholder, className, onBlur, searchFormId }) => {
  const [text, changeText] = useState('');
  const [lastPathName, changeLastPathName] = useState('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      createdHistory.push(routes.search(text));
      changeLastPathName(routes.search());
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
      <Input
        type="text"
        input={input}
        placeholder={placeholder}
        isSearchable
        onClick={onSubmit}
        css={{
          input: {
            paddingRight: '35px',
            ...(graphCommunity && {
              border: '1px solid #161426',
              borderRadius: '4px',
              '&:focus': {
                border: '1px solid rgba(111, 76, 255, 1)',
                background: 'rgba(111, 76, 255, 0.06) !important',

                '&:hover': {
                  border: '1px solid rgba(111, 76, 255, 1)',
                  background: 'rgba(111, 76, 255, 0.06) !important',
                },
              },
              '&:hover': {
                border: '1px solid #3D3D54',
                background: 'rgba(255, 255, 255, 0.06)',
              },
            }),
          },
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
