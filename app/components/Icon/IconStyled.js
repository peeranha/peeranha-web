import styled from 'styled-components';

const svgDraw = ({ color, fill }) => `
  color: ${color};

  .fill {
    fill: ${fill};
  }

  .stroke {
    stroke: ${color};
  }
`;

const IconStyled = styled.span`
  width: ${x => x.width}px;
  height: ${x => x.height || x.width}px;
  transform: rotate(${x => (x.shouldBeRotated ? '180deg' : '0deg')});
  transition: ${x => (x.isTransition === false ? '0' : '0.5')}s;
  display: inline-flex;

  svg {
    width: inherit;
    height: inherit;
  }

  ${({ color, fill, isColorImportant }) => {
    if (color) {
      return svgDraw({
        color: `${color} ${isColorImportant ? `!important` : ``}`,
        fill: `${fill || color} ${isColorImportant ? `!important` : ``}`,
      });
    }

    return '';
  }};

  ${({ specialStyles }) => specialStyles};
`;

export { svgDraw };
export default IconStyled;
