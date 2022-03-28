import React, { useCallback, useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { QUESTION_FILTER } from '../constants';

import { setCookie } from 'utils/cookie';
import { changeQuestionFilter } from '../actions';

import LargeOutlinedButton from 'components/Button/Outlined/InfoLarge';

const cookieFilterSetter = value => ({
  name: QUESTION_FILTER,
  value,
  options: {
    defaultPath: true,
    neverExpires: true,
  },
});

export const ShowMoreButton = ({
  changeQuestionFilterDispatch,
  children,
  questionFilterFromCookies,
}) => {
  const [filter, setFilterValue] = useState(+(questionFilterFromCookies || 1));

  useEffect(
    () => {
      const cookieValue = questionFilterFromCookies;

      setFilterValue(cookieValue);

      if (!cookieValue || cookieValue === '1') {
        //TODO single community page
        // setCookie(cookieFilterSetter(1));
        // changeQuestionFilterDispatch(1);
      }
    },
    [filter],
  );

  const setFilter = useCallback(
    value => {
      if (value !== filter) {
        setFilterValue(value);
        setCookie(cookieFilterSetter(value));
        changeQuestionFilterDispatch(value);
      }
    },
    [filter],
  );

  const setAllFilter = useCallback(() => setFilter(0), [filter]);

  return (
    <LargeOutlinedButton onClick={setAllFilter}>{children}</LargeOutlinedButton>
  );
};

ShowMoreButton.propTypes = {
  changeQuestionFilterDispatch: PropTypes.func,
};

export default memo(
  connect(
    null,
    dispatch => ({
      changeQuestionFilterDispatch: bindActionCreators(
        changeQuestionFilter,
        dispatch,
      ),
    }),
  )(ShowMoreButton),
);
