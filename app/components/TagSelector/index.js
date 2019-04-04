import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { blue } from 'style-constants';
import closeIcon from 'images/closeCircle.svg';

import { CustomizedSelector } from 'components/FormFields/SelectField';
import Dropdown from 'components/Dropdown/AllowedClickInside';
import Wrapper from 'components/FormFields/Wrapper';
import { Input } from 'components/Input/InputStyled';

const TagsContainer = styled.ul`
  ${(props) /* istanbul ignore next */ => Input(props)};

  cursor: pointer;
  height: auto;
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
  color: ${blue};
  padding: 2px 8px;
  margin: 5px 10px 5px 0;
  border: 1px solid ${blue};
  border-radius: 2px;
`;

export const TagSelector = /* istanbul ignore next */ ({
  input,
  meta,
  label,
  tip,
  setTags,
  disabled,
  options = [],
}) => {
  const value = input.value || [];

  const [isOpen, toggleOpen] = useState(false);

  const valueIds = value.map(x => x.id);

  // In menu show only which are NOT chosen
  const filteredOptions = options.filter(x => !valueIds.includes(x.id));

  return (
    <Wrapper label={label} tip={tip} meta={meta}>
      <Dropdown
        isOpen={isOpen}
        onClose={() => toggleOpen(false)}
        target={
          <TagsContainer
            disabled={disabled}
            error={meta.touched && (meta.warning || meta.error)}
            onClick={() => (!disabled ? toggleOpen(true) : null)}
          >
            {value.map(x => (
              <Tag>
                <span>{x.label}</span>
                <RemoveTagIcon
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    setTags(value.filter(y => y.id !== x.id));
                  }}
                >
                  <img src={closeIcon} alt="X" />
                </RemoveTagIcon>
              </Tag>
            ))}
          </TagsContainer>
        }
      >
        <CustomizedSelector
          input={{
            ...input,
            onChange: x => {
              setTags([...value, x]);
              toggleOpen(false);
            },
          }}
          options={filteredOptions}
          disabled={disabled}
          autoFocus
          menuIsOpen
        />
      </Dropdown>
    </Wrapper>
  );
};

TagSelector.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  tip: PropTypes.string,
  setTags: PropTypes.func,
  options: PropTypes.array,
  disabled: PropTypes.bool,
};

export default React.memo(TagSelector);
