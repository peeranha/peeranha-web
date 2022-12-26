import DropdownTrigger from 'components/TagSelector/DropdownTrigger';
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dropdown from 'components/common/Dropdown';
import Wrapper from 'components/FormFields/Wrapper';

const Base = styled.div`
  margin-bottom: ${({ isOpen }) => (isOpen ? 120 : 0)}px;
  @media only screen and (min-width: 769px) and (max-width: 991px) {
    padding-bottom: ${({ isOpen }) => (isOpen ? 150 : 0)}px;
  }
  @media only screen and (min-width: 235px) and (max-width: 768px) {
    padding-bottom: ${({ isOpen }) => (isOpen ? 130 : 0)}px;
  }
  @media only screen and (max-width: 234px) {
    padding-bottom: ${({ isOpen }) => (isOpen ? 110 : 0)}px;
  }
`;

export const TagSelector = ({
  input,
  meta,
  label,
  tip,
  setTags,
  disabled,
  splitInHalf,
  options = [],
}) => {
  const [value, filteredOptions] = useMemo(() => {
    const inputValue =
      (input?.value?.toJS ? input.value.toJS() : input?.value) || [];
    // In menu show only which are NOT chosen
    const fO = options?.filter((option) => !inputValue.includes(option?.id));
    return [inputValue, fO];
  }, [input, input.value]);

  const error = useMemo(
    () => meta.touched && (meta.warning || meta.error),
    [meta],
  );

  const onChange = useCallback(
    (tagIds) => {
      setTags([...value, ...tagIds]);
    },
    [setTags, value],
  );

  const onClick = useCallback(
    (e, id) => {
      e.stopPropagation();
      setTags(value.filter((y) => y !== id));
    },
    [value, setTags],
  );

  const formattedTags = filteredOptions.map((tag) => ({
    ...tag,
    label: tag.name,
    value: tag.id,
  }));

  return (
    <Base>
      <Wrapper
        label={label}
        tip={tip}
        meta={meta}
        splitInHalf={splitInHalf}
        disabled={disabled}
        id={input.name}
      >
        <Dropdown
          options={formattedTags}
          value={value}
          triggerClassName="full-width"
          isMultiple={true}
          isSearchable
          onSelect={onChange}
          trigger={
            <DropdownTrigger
              value={value}
              options={options}
              onClick={onClick}
              disabled={disabled}
              error={error}
            />
          }
        />
      </Wrapper>
    </Base>
  );
};

TagSelector.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  tip: PropTypes.string,
  splitInHalf: PropTypes.bool,
  setTags: PropTypes.func,
  options: PropTypes.array,
  disabled: PropTypes.bool,
};

export default TagSelector;
