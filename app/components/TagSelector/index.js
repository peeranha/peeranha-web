import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TEXT_PRIMARY, BORDER_PRIMARY, BORDER_RADIUS_S } from 'style-constants';

import closeIcon from 'images/closeCircle.svg?external';

import { Select2 } from 'components/FormFields/SelectField';
import Dropdown from 'components/Dropdown/AllowedClickInside';
import Wrapper from 'components/FormFields/Wrapper';
import { Input } from 'components/Input/InputStyled';
import { IconMd } from 'components/Icon/IconWithSizes';

const TagsContainer = styled.ul`
  ${props => Input(props)};

  cursor: pointer;
  height: auto !important;
`;

const RemoveTagIcon = styled.button`
  display: inline-flex;
  padding: 0 0 0 10px;
`;

const Tag = styled.li`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${TEXT_PRIMARY};
  padding: 2px 8px;
  margin: 5px 10px 5px 0;
  border: 1px solid ${BORDER_PRIMARY};
  border-radius: ${BORDER_RADIUS_S};
`;

const Base = styled.div`
  margin-bottom: ${({ isOpen }) => (isOpen ? 120 : 0)}px;
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
  const [isOpen, toggleOpen] = useState(false);

  const [value, filteredOptions] = useMemo(
    () => {
      const v = (input?.value?.toJS ? input.value.toJS() : input?.value) || [];
      const valueIds = v?.map(x => x.id);

      // In menu show only which are NOT chosen
      const fO = options?.filter(x => !valueIds.includes(x?.id));
      return [v, fO];
    },
    [input, input.value],
  );

  const error = useMemo(() => meta.touched && (meta.warning || meta.error), [
    meta,
  ]);

  const toggle = useCallback(() => toggleOpen(!isOpen), [isOpen]);
  const onChange = useCallback(x => setTags([...value, x]), [setTags, value]);

  const onClick = useCallback(
    (e, id) => {
      e.stopPropagation();
      setTags(value.filter(y => y.id !== id));
    },
    [value, setTags],
  );

  return (
    <Base isOpen={isOpen}>
      <Wrapper
        label={label}
        tip={tip}
        meta={meta}
        splitInHalf={splitInHalf}
        disabled={disabled}
        id={input.name}
      >
        <Dropdown
          isOpen={isOpen}
          toggle={toggle}
          target={
            <TagsContainer disabled={disabled} error={error}>
              {value.map(({ label: valueLabel, id }) => (
                <Tag key={valueLabel}>
                  <span>{valueLabel}</span>
                  <RemoveTagIcon type="button" onClick={e => onClick(e, id)}>
                    <IconMd icon={closeIcon} fill={BORDER_PRIMARY} />
                  </RemoveTagIcon>
                </Tag>
              ))}
            </TagsContainer>
          }
        >
          <Select2
            input={{
              ...input,
              value: null,
              onBlur: null,
              onChange,
            }}
            options={filteredOptions}
            disabled={disabled}
            autoFocus
            menuIsOpen
            isWrapped
          />
        </Dropdown>
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
