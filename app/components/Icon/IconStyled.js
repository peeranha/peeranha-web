import styled from 'styled-components';

/* istanbul ignore next */
const IconStyled = styled.span`
  display: inline-block;
  margin-right: ${x => (x.noMargin ? '0' : '10')}px;
  vertical-align: 1px;
  transform: rotate(${x => (x.rotate ? '180deg' : '0deg')});
  transition: 0.5s;
`;

export default IconStyled;
