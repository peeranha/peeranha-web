import React from 'react';
import { useTranslation } from 'react-i18next';

import Dropdown from 'components/Dropdown';
import Span from 'components/Span/index';
import { QUESTION_TYPES } from 'components/QuestionForm/QuestionTypeField';
import Ul from 'components/Ul';
import CheckedItem from 'components/Li/CheckedItem';

const Button = ({ sorting }) => {
  const { t } = useTranslation();
  const type = Object.values(QUESTION_TYPES).find(
    item => sorting === item.value,
  );

  return (
    <Span
      className="d-inline-flex align-items-center mr-2 text-capitalize"
      bold
    >
      {t(`common.${type?.label || 'all'}`)}
    </Span>
  );
};

const Menu = ({ sort, sorting }) => {
  const { t } = useTranslation();

  return (
    <Ul>
      {Object.values({
        all: { value: null, label: 'all' },
        ...QUESTION_TYPES,
      }).map(item => (
        <CheckedItem
          key={item.label}
          onClick={() => sort(item.value)}
          isActive={item.value === sorting}
        >
          {t(item.label)}
        </CheckedItem>
      ))}
    </Ul>
  );
};

const DateFilterDropdown = ({ typeFilter, setTypeFilter }) => (
  <Dropdown
    button={<Button sorting={typeFilter} />}
    menu={<Menu sort={setTypeFilter} sorting={typeFilter} />}
    id="question-type-dropdown"
    isArrowed
  />
);

export default React.memo(DateFilterDropdown);
