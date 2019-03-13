import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import messages from 'common-messages';
import { gray, black, white, APP_FONT } from 'style-constants';

import Select from 'react-select';

import Dropdown from 'components/Dropdown/AllowedClickInside';

import CustomOption from './CustomOption';
import DropdownIndicator from './DropdownIndicator';
import Group from './Group';
import ManageMyCommunities from './ManageMyCommunities';

class CommunityChooser extends React.PureComponent {
  state = { isOpen: false };

  toggleOpen = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  };

  onSelectChange = ({ value }) => {
    this.toggleOpen();
    this.props.toggle(value);
  };

  render() {
    const { isOpen } = this.state;
    const { Button, intl, options, optionsNumber, selectedValue } = this.props;

    return (
      <Dropdown
        isArrowed
        isOpen={isOpen}
        onClose={this.toggleOpen}
        target={<Button toggleOpen={this.toggleOpen} />}
      >
        <Select
          components={{
            Group,
            DropdownIndicator,
            IndicatorSeparator: null,
            Option: CustomOption,
          }}
          optionsNumber={optionsNumber}
          selectedValue={selectedValue}
          onChange={this.onSelectChange}
          placeholder={intl.formatMessage({ id: messages.search.id })}
          controlShouldRenderValue={false}
          backspaceRemovesValue={false}
          hideSelectedOptions={false}
          tabSelectsValue={false}
          isClearable={false}
          menuIsOpen
          autoFocus
          options={options}
          styles={{
            control: base => ({
              ...base,
              border: `1px solid ${gray}`,
              borderRadius: '3px',
              color: black,
              fontFamily: APP_FONT,
              fontSize: '16px',
              background: `${white} !important`,
              minWidth: 340,
              margin: '5px',
              padding: '0 5px',
            }),
            menu: base => ({
              ...base,
              color: black,
              fontFamily: APP_FONT,
              fontSize: '16px',
              position: 'relative',
              margin: 0,
              boxShadow: 'none',
            }),
            menuList: base => ({
              ...base,
              paddingBottom: 0,
            }),
          }}
        />
        <ManageMyCommunities />
      </Dropdown>
    );
  }
}

CommunityChooser.propTypes = {
  intl: intlShape.isRequired,
  Button: PropTypes.any,
  options: PropTypes.array,
  optionsNumber: PropTypes.number,
  selectedValue: PropTypes.number,
  toggle: PropTypes.func,
};

export default injectIntl(React.memo(CommunityChooser));
