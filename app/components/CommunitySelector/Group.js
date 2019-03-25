import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { gray } from 'style-constants';

import CustomOption from './CustomOption';

const Box = styled.div`
  border-bottom: 1px solid ${gray};
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
