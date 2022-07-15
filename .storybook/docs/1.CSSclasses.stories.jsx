import React from 'react';
import colors from 'styles/colors';

export default {
  title: 'Docs',
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

export const GlobalCSSStyles = () => (
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
