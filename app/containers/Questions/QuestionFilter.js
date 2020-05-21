import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';

import {
  BORDER_PRIMARY,
  BORDER_PRIMARY_RGB,
  BORDER_SECONDARY,
} from 'style-constants';

import { getCookie, setCookie } from 'utils/cookie';

import { QUESTION_FILTER } from './constants';
import { changeQuestionFilter } from './actions';

const Container = styled.div`
  display: flex;
  width: 140px;
  height: 35px;
  border-radius: 5px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ left }) => (left ? 45 : 55)}%;
  border: 1px solid ${({ active }) => (active ? 'blue' : 'black')};
  border-top-left-radius: ${({ left }) => (left ? '5px' : 0)};
  border-bottom-left-radius: ${({ left }) => (left ? '5px' : 0)};
  border-top-right-radius: ${({ left }) => (!left ? '5px' : 0)};
  border-bottom-right-radius: ${({ left }) => (!left ? '5px' : 0)};
  border: 1px solid
    ${({ active }) => (active ? BORDER_PRIMARY : BORDER_SECONDARY)};

  box-shadow: ${({ active }) =>
    active ? `0 0 0 3px rgba(${BORDER_PRIMARY_RGB}, 0.4)` : `none`};
`;

const cookieFilterSetter = value => ({
  name: QUESTION_FILTER,
  value,
  options: {
    defaultPath: true,
    neverExpires: true,
  },
});

const QuestionFilter = ({ changeQuestionFilterDispatch }) => {
  const [filter, setFilterValue] = useState(+(getCookie(QUESTION_FILTER) || 1));

  useEffect(() => {
    const cookieValue = getCookie(QUESTION_FILTER);

    if (!cookieValue) {
      setCookie(cookieFilterSetter(1));
      setFilter(1);
    }
  }, []);

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
  const setQuestionFilter = useCallback(() => setFilter(1), [filter]);

  return (
    <Container>
      <Button active={!filter} left onClick={setAllFilter}>
        <FormattedMessage {...commonMessages.all} />
      </Button>
      <Button active={!!filter} onClick={setQuestionFilter}>
        Top
      </Button>
    </Container>
  );
};

QuestionFilter.propTypes = {
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
  )(QuestionFilter),
);
