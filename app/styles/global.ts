import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';
import breakpoints from './breakpoints';
import colors from './colors';

const spacing = (): string => {
  const result: string[] = [];
  const position = { '': '', r: '-right', l: '-left', t: '-top', b: '-bottom' };
  const name = { m: 'margin', p: 'padding' };

  for (let size = 4; size <= 32; ++size) {
    if (size % 4 === 0) {
      Object.entries(name).forEach(([key, value]) => {
        Object.entries(position).forEach(([keySecond, valueSecond]) => {
          result.push(`
            .${key}${keySecond}${size} {
              ${value}${valueSecond}: ${size}px;
            }
          `);
        });
      });
    }
  }

  return result.join('\n');
};

export default css`
  ${emotionReset} ${spacing()}

  :root {
    ${Object.keys(colors).map(
      (key) => `
      ${key}: ${(colors as any)[key]};
    `,
    )};
  }

  body,
  button {
    font-family: 'Source Sans Pro', sans-serif;
    font-style: normal;
    font-weight: 400;
  }

  body {
    background: rgb(234, 236, 244);
  }

  html,
  #app {
    height: 100%;
  }

  .container {
    max-width: 1366px;
    width: calc(100% - 20px);
    margin: 0 auto;
  }

  .scroll-disabled {
    overflow: hidden;
    height: 100%;
  }

  // css helpers
  .dib {
    display: inline-block;
  }
  .dn {
    display: none;
  }
  .db {
    display: block;
  }
  .df {
    display: flex;
  }
  .dg {
    display: grid;
  }
  .jcsb {
    justify-content: space-between;
  }
  .jcc {
    justify-content: center;
  }
  .jcfs {
    justify-content: flex-start;
  }
  .jcfe {
    justify-content: flex-end;
  }
  .aic {
    align-items: center;
  }
  .ais {
    align-items: start;
  }
  .aife {
    align-items: flex-end;
  }
  .aifs {
    align-items: flex-start;
  }
  .fdc {
    flex-direction: column;
  }
  .fdr {
    flex-direction: row;
  }
  .f1 {
    flex: 1;
  }
  .fww {
    flex-wrap: wrap;
  }
  .full-height {
    height: 100%;
  }
  .full-width {
    width: 100%;
  }
  .cup {
    cursor: pointer;
  }
  .tr {
    text-align: right;
  }
  .tc {
    text-align: center;
  }
  .tl {
    text-align: left;
  }
  .fz12 {
    font-size: 12px;
  }
  .fz14 {
    font-size: 14px;
  }
  .fz16 {
    font-size: 16px;
  }
  .fz18 {
    font-size: 18px;
  }
  .fz24 {
    font-size: 24px;
  }
  .pr {
    position: relative;
  }
  .pa {
    position: absolute;
  }
  .pf {
    position: fixed;
  }
  .ps {
    position: sticky;
  }
  .l0 {
    left: 0;
  }
  .r0 {
    right: 0;
  }
  .t0 {
    top: 0;
  }
  .b0 {
    bottom: 0;
  }
  .ovh {
    overflow: hidden;
  }
  .on {
    outline: none;
  }
  .p0 {
    padding: 0;
  }
  .m0 {
    margin: 0;
  }
  .bd0 {
    border: none;
  }
  .no-wrap {
    white-space: nowrap;
  }
  .border-box {
    box-sizing: border-box;
  }
  .transform90 {
    transform: rotate(90deg);
  }
  .transform180 {
    transform: rotate(180deg);
  }
  .transform270 {
    transform: rotate(270deg);
  }
  .uppercase {
    text-transform: uppercase;
  }
  .capitalize {
    text-transform: capitalize;
  }
  .light {
    font-weight: 400;
  }
  .medium {
    font-weight: 500;
  }
  .semi-bold {
    font-weight: 600;
  }
  .bold {
    font-weight: 700;
  }
  a {
    text-decoration: none;
  }
  .icon {
    color: var(--color-icon-background);
  }
  .text-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .break-word {
    word-break: break-word;
  }
  .break-all {
    word-break: break-all;
  }
  .lh1-5 {
    line-height: 1.5;
  }
  .text-block strong {
    font-weight: 700;
  }
  .text-block em {
    font-style: italic;
  }
  .walletconnect-modal__close__wrapper {
    top: 67px !important;
    right: 20px !important;
    border: solid 1px #000000;
  }
  .pl15 {
    padding-left: 15px;
  }
`;
