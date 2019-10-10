import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LANDING_FONT, BG_SECONDARY_LIGHT } from 'style-constants';

import WarningMessage from 'components/FormFields/WarningMessage';
import Dropdown from 'components/Dropdown';

import { Message } from './DefaultInput';
import { Box, Input, Label } from './FloatingLabelInput';

/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

const Ul = styled.ul`
  font-size: 12px;
  font-family: ${LANDING_FONT};

  li {
    padding: 12px 16px;
    cursor: pointer;

    :hover {
      background: ${BG_SECONDARY_LIGHT};
    }
  }
`.withComponent('ul');

const SelectItem = ({ input, change, label, disabled, meta, items }) => (
  <div className="mb-4">
    <Dropdown
      button={
        <Box>
          <Input
            {...input}
            type="text"
            onChange={null}
            disabled={disabled}
            error={meta.touched && (meta.error || meta.warning)}
          />

          <Label>{label}</Label>
        </Box>
      }
      menu={
        <Ul>
          <li onClick={() => change([input.name], '')}>None</li>

          {items.map(x => (
            <li onClick={() => change([input.name], x)} key={x}>
              {x}
            </li>
          ))}
        </Ul>
      }
    />

    <Message className="my-1">
      <WarningMessage {...meta} />
    </Message>
  </div>
);

SelectItem.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.element,
  change: PropTypes.func,
  items: PropTypes.array,
};

export default SelectItem;
