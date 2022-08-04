import React, { useState } from 'react';
import { css } from '@emotion/react';
import colors from 'styles/colors';
import * as icons from './index';

export default {
  title: 'Thema',
  parameters: {
    controls: { disable: true },
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

export const Colors = () => (
  <div>
    {Object.keys(colors).map(varname => (
      <div className="df aic" style={{ margin: 10 }} key={varname}>
        <div style={{ background: colors[varname], width: 100, height: 50 }} />
        <div style={{ marginLeft: 10 }}>
          {varname}: {colors[varname]}
        </div>
      </div>
    ))}
  </div>
);

export const Icons = () => {
  const [search, setSearch] = useState('');
  const [iconName, setIconName] = useState('IconName');

  return (
    <>
      <div style={{ width: 300 }}>
        <input
          placeholder={'Search Icons'}
          value={search}
          type="search"
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div
        css={css`
          background: #f1f1f1;
          padding: 10px;
          margin-top: 10px;
        `}
      >
        {`import ${iconName}Icon from 'icons/${iconName}';`}
      </div>
      <div
        css={css`
          display: flex;
          color: #282828;
          flex-wrap: wrap;
          padding-top: 10px;
          & span {
            margin: 8px;
            cursor: pointer;
            & svg {
              width: 24px;
              height: 24px;
            }
          }
        `}
      >
        {Object.entries(icons)
          .filter(([name]) => name.toLowerCase().includes(search.toLowerCase()))
          .map(([name, Icon]) => (
            <span key={name} onClick={() => setIconName(name)}>
              <Icon />
            </span>
          ))}
      </div>
    </>
  );
};
