import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';

import Dropdown from 'components/Dropdown';
import Span from 'components/Span/index';
import { QUESTION_TYPES } from 'components/QuestionForm/QuestionTypeField';
import Ul from 'components/Ul';
import CheckedItem from 'components/Li/CheckedItem';

// eslint-disable-next-line react/prop-types
const Button = ({ sorting }) => {
  const type = Object.values(QUESTION_TYPES).find((x) => sorting === x.value);

  return (
    <Span
      className="d-inline-flex align-items-center mr-2 text-capitalize"
      bold
    >
      <FormattedMessage {...messages[type ? type.label : 'all']} />
    </Span>
  );
};

// eslint-disable-next-line react/prop-types
const Menu = ({ sort, sorting }) => (
  <Ul>
    {Object.values({
      all: { value: null, label: 'all' },
      ...QUESTION_TYPES,
    }).map((x) => (
      <CheckedItem
        key={x.label}
        onClick={() => sort(x.value)}
        isActive={x.value === sorting}
      >
        <FormattedMessage {...messages[x.label]} />
      </CheckedItem>
    ))}
  </Ul>
);

// eslint-disable-next-line react/prop-types
const DateFilterDropdown = ({ typeFilter, setTypeFilter }) => (
  <Dropdown
    button={<Button sorting={typeFilter} />}
    menu={<Menu sort={setTypeFilter} sorting={typeFilter} />}
    id="question-type-dropdown"
    isArrowed
  />
);

export default React.memo(DateFilterDropdown);
