import styled from 'styled-components';

const svgDraw = ({ color }) => `
  color: ${color};
  .fill {
    fill: ${color};
  }
  .stroke {
    stroke: ${color};
  } 
`;

const IconStyled = styled.span`
  width: ${x => x.width}px;
  height: auto;
  transform: rotate(${x => (x.rotate ? '180deg' : '0deg')});
  transition: 0.5s;
  display: inline-flex;

  svg {
    width: inherit;
    height: inherit;
  }

  ${x => (x.color ? svgDraw({ color: `${x.color} !important` }) : ``)};
`;

export { svgDraw };
export default IconStyled;
