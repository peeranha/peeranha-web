import styled from 'styled-components';

const MARGIN_X = 8;
const MARGIN_Y = 15;

const BuildDevice = ({ screen, marginX, cell }) =>
  cell
    ? `
    @media only screen and (max-width: ${screen}px) {
      > * {
        max-width: calc(${100 / cell}% - ${2 * marginX}px);
        flex: 0 0 calc(${100 / cell}% - ${2 * marginX}px);
      }
    }
    `
    : ``;

export default styled.ul`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -${(x) => x.marginX || MARGIN_X}px;

  @media only screen and (max-width: 576px) {
    padding: 0 10px;
  }

  > * {
    margin: 0 ${(x) => x.marginX || MARGIN_X}px
      ${(x) => x.marginY || MARGIN_Y}px;
  }

  ${(x) =>
    BuildDevice({
      screen: 9999,
      marginX: x.marginX || MARGIN_X,
      cell: x.xl,
    })};

  ${(x) =>
    BuildDevice({
      screen: 1200,
      marginX: x.marginX || MARGIN_X,
      cell: x.lg,
    })};

  ${(x) =>
    BuildDevice({
      screen: 768,
      marginX: x.marginX || MARGIN_X,
      cell: x.md,
    })};

  ${(x) =>
    BuildDevice({
      screen: 576,
      marginX: x.marginX || MARGIN_X,
      cell: x.sm,
    })};

  ${(x) =>
    BuildDevice({
      screen: 360,
      marginX: x.marginX || MARGIN_X,
      cell: x.xs,
    })};
`;
