import styled from 'styled-components';

const IconHover = ({ color }) => `
  .fill {
    fill: ${color};
  }

  .stroke {
    stroke: ${color};
  }
`;

/* istanbul ignore next */
const IconStyled = styled.span`
  display: inline-block;
  margin-right: ${x => (x.noMargin ? '0' : '10')}px;
  vertical-align: 1px;
  transform: rotate(${x => (x.rotate ? '180deg' : '0deg')});
  transition: 0.5s;
  cursor: pointer;

  ${x =>
    x.width
      ? `
    width: ${x.width}px;
  `
      : ``};

  svg {
    width: inherit;
    height: inherit;
  }

  ${x => (x.hover ? `:hover { ${IconHover({ color: x.hover })} }` : ``)};
`;

export { IconHover };
export default IconStyled;
