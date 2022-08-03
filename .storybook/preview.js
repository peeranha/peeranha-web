import { addDecorator } from '@storybook/react';
import { Global, ThemeProvider } from '@emotion/react';
import global from 'styles/global';
import { withKnobs } from '@storybook/addon-knobs';
import { select } from '@storybook/addon-knobs';
import './global.css';

import { theme as PeeranhaTheme } from 'themes/default';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

const themeObjects = {
  peeranha: PeeranhaTheme,
};

const chooseTheme = choice => {
  const _theme = themeObjects[choice.toLowerCase()];

  if (_theme) {
    return _theme;
  }

  return _theme;
};

addDecorator((Story, context) => {
  if (context.viewMode !== 'story') {
    return <Story />;
  }

  return (
    <div className="storybook-custom-story">
      <div className="storybook-custom-story__header">
        {context.kind}/{context.name}
      </div>
      <div className="storybook-custom-story__body">
        <ThemeProvider
          theme={chooseTheme(select('Choose Theme', ['Peeranha'], 'Peeranha'))}
        >
          <Global styles={global} />
          <Story />
        </ThemeProvider>
        <div id="portal-root" />
      </div>
    </div>
  );
});

addDecorator(withKnobs);
