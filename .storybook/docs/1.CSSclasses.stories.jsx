import { Fragment } from 'react';
import globalStyles from 'styles/global';
import { css } from '@emotion/react';

export default {
  title: 'Docs',
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    knobs: { disable: true },
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

const stylesRow = {
  height: 'auto',
  padding: 10,
};

const clearStyles = globalStyles.styles
  .split('.')
  .map(item => item.replace(/\s{2,}/gi, ''))
  .slice(1)
  .filter(item => !item.includes(':root') && !/\s.+{/gi.test(item));

export const GlobalCSSStyles = () => (
  <div
    css={css({
      display: 'grid',
      gridTemplateColumns: '100px 300px',
      fontSize: '16px',
      textAlign: 'center',
      fontFamily: 'sans-serif',
    })}
  >
    {clearStyles.map((item, index) => (
      <Fragment key={item}>
        <div
          css={css({
            ...stylesRow,
            ...(index % 2 > 0 && { backgroundColor: '#f1f1f1' }),
          })}
        >
          {item}
        </div>
        <div
          css={css({
            ...stylesRow,
            ...(index % 2 > 0 && { backgroundColor: '#f1f1f1' }),
          })}
        >
          {item}
        </div>
      </Fragment>
    ))}
  </div>
);
