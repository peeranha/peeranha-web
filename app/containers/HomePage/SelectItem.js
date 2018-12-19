import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import TextField from '@material-ui/core/TextField';

import messages from './messages';
import { Wrapper } from './FloatingLabelInput';

const Box = Wrapper.extend`
  .floating-label-input.show-menu + ul {
    display: block;
  }
`;

/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
const SelectItem = ({
  input,
  change,
  items,
  label,
  disabled,
  meta: { touched, error, warning },
}) => (
  <Box className="floating-label-input-wrapper select-item">
    <TextField
      {...input}
      id={`${input.name}_input`}
      className="floating-label-input"
      label={label}
      disabled={disabled}
      error={touched && (warning || error)}
      onChange={null}
      onFocus={() => window.$(`#${input.name}`).css({ display: 'block' })}
      onBlur={() =>
        setTimeout(
          () => window.$(`#${input.name}`).css({ display: 'none' }),
          250,
        )
      }
    />
    <ul className="menu-items" id={input.name}>
      <li onClick={() => change([input.name], '')}>
        <FormattedMessage {...messages.none} />
      </li>
      {items.map(x => (
        <li key={x} onClick={() => change([input.name], x)}>
          {x}
        </li>
      ))}
    </ul>
    <h6 className="text-danger">
      {touched &&
        ((error && <FormattedMessage {...error} />) ||
          (warning && <FormattedMessage {...warning} />))}
    </h6>
  </Box>
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
