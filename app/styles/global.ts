/* eslint-disable */
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
    key => `
      ${key}: ${colors[key]};
    `,
  )};
  }

  body {
    font-family: 'Sourse Sans Pro', sans-serif;
    font-style: normal;
    font-weight: 400;
    background: rgb(234, 236, 244);
  }

  html,
  body,
  #app {
    height: 100%;
  }

  .container {
    max-width: 1366px;
    width: calc(100% - 48px);
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
  .aife {
    align-items: flex-end;
  }
  .fdc {
    flex-direction: column;
  }
  .f1 {
    flex: 1;
  }
  .fww {
    flex-wrap: wrap;
  }
  .fh {
    height: 100%;
  }
  .fw {
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
  .fz14 {
    font-size: 14px;
  }
  .fz16 {
    font-size: 16px;
  }
  .fz18 {
    font-size: 18px;
  }
  .pr {
    position: relative;
  }
  .pa {
    position: absolute;
  }
`;
