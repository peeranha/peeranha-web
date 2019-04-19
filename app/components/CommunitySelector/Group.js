import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BORDER_SECONDARY } from 'style-constants';

import CustomOption from './CustomOption';

const Box = styled.div`
  border-bottom: 1px solid ${BORDER_SECONDARY};

  &:first-child {
    border-top: 1px solid ${BORDER_SECONDARY};
  }
`;

const Group = /* istanbul ignore next */ ({ children, selectProps }) => (
  <Box>
    {children.map(x => (
      <CustomOption
        key={x.props.data.value}
        innerProps={x.props.innerProps}
        data={x.props.data}
        isFocused={x.props.isFocused}
        optionsNumber={selectProps.optionsNumber}
        selectedValue={selectProps.selectedValue}
      />
    ))}
  </Box>
);

Group.propTypes = {
  children: PropTypes.array,
  selectProps: PropTypes.object,
};

export default React.memo(Group);
