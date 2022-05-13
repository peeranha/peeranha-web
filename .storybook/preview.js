import { addDecorator } from '@storybook/react';
import { Global } from '@emotion/react';
import global from 'styles/global';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

addDecorator((Story, context) => {
  if (context.viewMode !== 'story') {
    return <Story />;
  }

  return (
    <div>
      <Global styles={global} />
      <Story />
    </div>
  );
});
