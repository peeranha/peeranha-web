import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { blue, transparent, lightgray } from 'style-constants';

import Img, { CELL } from 'components/Img';
import Span from 'components/Span';

import okayBlueIcon from 'images/okayBlueIcon.svg';

const EmptyOption = styled.span`
  width: ${CELL}px;
`;

const Image = /* istanbul ignore next */ ({
  avatar,
  selectedValue,
  optionValue,
}) => {
  if (selectedValue === optionValue)
    return <Img src={okayBlueIcon} alt="chosen" />;

  if (!avatar) return <EmptyOption />;

  return <Img src={avatar} alt="comm_avatar" />;
};

/* istanbul ignore next */
export const Box = styled.div`
  padding: 0 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 36px;
  box-sizing: border-box;
  border: 1px solid ${transparent};

  background: ${(props) /* istanbul ignore next */ =>
    props.isActive ? lightgray : transparent};

  :hover {
    border: 1px solid ${blue};
    background: none;
  }

  ${Img}, ${EmptyOption} {
    margin-right: 8px;
  }
`;

const CustomOption = /* istanbul ignore next */ ({
  data,
  isFocused,
  optionsNumber,
  selectedValue,
  innerProps = {},
}) => {
  let isActive = false;

  if (isFocused) {
    isActive = true;
  }

  return (
    <Box {...innerProps} isActive={isActive}>
      <Image
        avatar={data.avatar}
        selectedValue={selectedValue}
        optionValue={data.value}
      />

      <Span>{data.label}</Span>

      {!data.value ? (
        <Span className="pl-2" color="gray">
          {optionsNumber}
        </Span>
      ) : null}
    </Box>
  );
};

Image.propTypes = {
  avatar: PropTypes.string,
  selectedValue: PropTypes.number,
  optionValue: PropTypes.number,
};

CustomOption.propTypes = {
  data: PropTypes.object,
  isFocused: PropTypes.bool,
  optionsNumber: PropTypes.number,
  selectedValue: PropTypes.number,
  innerProps: PropTypes.object,
};

export default React.memo(CustomOption);
