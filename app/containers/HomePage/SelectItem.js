import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import TextField from '@material-ui/core/TextField';

import messages from './messages';
import { Wrapper } from './FloatingLabelInput';

const Box = Wrapper.extend`
  ul {
    box-shadow: 0 0 10px #e6e6e6;
    margin-top: 10px;

    li {
      font-size: 14px;
      font-family: Open Sans, sans-serif;
      color: #282828;
      padding: 10px 21px;

      :hover {
        cursor: pointer;
        background: #e6e6e6;
      }
    }
  }
`;

/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
const SelectItem = /* istanbul ignore next */ ({
  input,
  change,
  items,
  label,
  disabled,
  meta: { touched, error, warning },
}) => (
  <Box className="floating-label-input-wrapper select-item">
    <div
      id={input.name}
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <TextField
        {...input}
        className="floating-label-input"
        label={label}
        disabled={disabled}
        error={!!(touched && (warning || error))}
        onChange={null}
      />
    </div>
    <ul className="dropdown-menu" aria-labelledby={input.name}>
      <li key={messages.none.id} onClick={() => change([input.name], '')}>
        <FormattedMessage {...messages.none} />
      </li>
      {items.map(item => (
        <li key={item} onClick={() => change([input.name], item)}>
          {item}
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
