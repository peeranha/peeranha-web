import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TEXT_SECONDARY } from 'style-constants';

import Img, { CELL } from 'components/Img';
import Span from 'components/Span';
import { Box } from 'components/FormFields/SelectField';

import okayBlueIcon from 'images/okayBlueIcon.svg?inline';

const EmptyOption = styled.span`
  width: ${CELL}px;
`;

export const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: -12%;
`;

export const EmptyWrapper = ImgWrapper.extend`
  margin-left: 0;
  margin-right: -25px;
`;

const Image = ({ avatar, selectedOptionId, optionValue }) => {
  if (selectedOptionId === optionValue)
    return (
      <ImgWrapper>
        <Img src={okayBlueIcon} alt="chosen" />
        {avatar ? (
          <Img src={avatar} alt="comm_avatar" />
        ) : (
          <EmptyWrapper>
            <EmptyOption />
          </EmptyWrapper>
        )}
      </ImgWrapper>
    );
  if (!avatar) return <EmptyOption />;
  return <Img src={avatar} alt="comm_avatar" />;
};

// const Image = ({ avatar, selectedOptionId, optionValue }) => {
//   if (selectedOptionId === optionValue)
//     return <Img src={okayBlueIcon} alt="chosen" />;

//   if (!avatar) return <EmptyOption />;

//   return <Img src={avatar} alt="comm_avatar" />;
// };

export const BoxStyled = Box.extend`
  padding-left: 25px;
  ${Img}, ${EmptyOption} {
    margin-right: 8px;
  }
`;

const CustomOption = ({
  data,
  isFocused,
  optionsNumber,
  selectedValue,
  innerProps = {},
}) => (
  <BoxStyled {...innerProps} isActive={!!isFocused}>
    <Image
      avatar={data.avatar}
      selectedOptionId={selectedValue ? selectedValue.id : 0}
      optionValue={data.value}
    />

    <Span>{data.label}</Span>

    {!data.value ? (
      <Span className="pl-2" color={TEXT_SECONDARY}>
        {optionsNumber}
      </Span>
    ) : null}
  </BoxStyled>
);

Image.propTypes = {
  avatar: PropTypes.string,
  optionValue: PropTypes.number,
  selectedOptionId: PropTypes.number,
};

CustomOption.propTypes = {
  data: PropTypes.object,
  isFocused: PropTypes.bool,
  optionsNumber: PropTypes.number,
  selectedValue: PropTypes.object,
  innerProps: PropTypes.object,
};

export default React.memo(CustomOption);
