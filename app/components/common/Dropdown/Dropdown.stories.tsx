import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import ClockIcon from 'icons/Clock';
import ArrowDownIcon from 'icons/ArrowDown';
import Dropdown, {
  DropdownProps,
  OptionValue,
  MutableOption,
} from './Dropdown';

export default {
  title: 'Forms/Dropdown',
  component: Dropdown,
  parameters: {
    controls: {
      disable: true,
    },
  },
} as Meta;

export const Basic: Story<DropdownProps> = (args) => {
  const [value, setValue] = useState<OptionValue>();
  return (
    <>
      <p style={{ marginBottom: 10 }}>Selected value: {value}</p>
      <Dropdown
        {...args}
        options={[
          {
            label: 'This is first item',
            value: 1,
          },
          {
            label: 'This is second item',
            value: 2,
          },
          {
            label: 'This is third item',
            value: '3',
          },
          {
            label: 'This is fourth item',
            value: 4,
          },
          {
            label: 'This is fifth item',
            value: '5',
          },
        ]}
        isMultiple={false}
        value={value}
        placeholder="Select something in the list bellow"
        onSelect={setValue}
      />
    </>
  );
};

export const Disabled: Story<DropdownProps> = (args) => (
  <Dropdown
    {...args}
    options={[
      {
        label: 'This is first item',
        value: 1,
      },
      {
        label: 'This is second item',
        value: 2,
      },
      {
        label: 'This is third item',
        value: '3',
      },
      {
        label: 'This is fourth item',
        value: 4,
      },
      {
        label: 'This is fifth item',
        value: '5',
      },
    ]}
    isDisabled
    placeholder="Select something in the list bellow"
  />
);

export const Invalid: Story<DropdownProps> = (args) => {
  const [value, setValue] = useState<OptionValue>();
  return (
    <Dropdown
      {...args}
      options={[
        {
          label: 'This is invalid item',
          value: 0,
        },
        {
          label: 'This is valid item',
          value: 1,
        },
        {
          label: 'This is invalid item',
          value: '',
        },
        {
          label: 'This is valid item',
          value: 2,
        },
      ]}
      isMultiple={false}
      isInvalid={Boolean(!value)}
      value={value}
      onSelect={setValue}
      placeholder="Select something in the list bellow"
    />
  );
};

export const Icon: Story<DropdownProps> = (args) => {
  const [value, setValue] = useState<OptionValue>();
  return (
    <Dropdown
      {...args}
      options={[
        {
          label: 'I am ArrowDown',
          value: 1,
          icon: <ArrowDownIcon />,
        },
        {
          label: 'I am Clock',
          value: 2,
          icon: <ClockIcon />,
        },
      ]}
      isMultiple={false}
      value={value}
      placeholder="Select something in the list bellow"
      onSelect={setValue}
    />
  );
};

export const RenderOption: Story<DropdownProps> = (args) => {
  const [value, setValue] = useState<OptionValue>();

  const FunctionalComponent: React.FC<MutableOption> = ({ label, value }) => (
    <span>
      {label}
      <b>{value}</b>
    </span>
  );

  return (
    <Dropdown
      {...args}
      options={[
        {
          label: 'I am button',
          value: 1,
          render: <button>Render</button>,
        },
        {
          label: 'I am Functional Component',
          value: 2,
          render: FunctionalComponent,
        },
        {
          label: 'I am string',
          value: 3,
          render: 'Just a string',
        },
      ]}
      isMultiple={false}
      value={value}
      placeholder="Select something in the list bellow"
      onSelect={setValue}
    />
  );
};

export const DisabledOption: Story<DropdownProps> = (args) => {
  const [value, setValue] = useState<OptionValue>();

  return (
    <Dropdown
      {...args}
      options={[
        {
          label: 'This is disabled item',
          value: 1,
          isDisabled: true,
        },
        {
          label: 'This is second item',
          value: 2,
        },
        {
          label: 'This is disabled item',
          value: '3',
          isDisabled: true,
        },
        {
          label: 'This is fourth item',
          value: 4,
        },
        {
          label: 'This is disabled item',
          value: '5',
          isDisabled: true,
        },
      ]}
      isMultiple={false}
      value={value}
      placeholder="Select something in the list bellow"
      onSelect={setValue}
    />
  );
};

export const Multiple: Story<DropdownProps> = (args) => {
  const [value, setValue] = useState<OptionValue[]>([2, '5']);

  return (
    <>
      <p style={{ marginBottom: 10 }}>
        Selected values: {JSON.stringify(value)}
      </p>
      <Dropdown
        {...args}
        options={[
          {
            label: 'This is first item',
            value: 1,
          },
          {
            label: 'This is second item',
            value: 2,
          },
          {
            label: 'This is third item',
            value: '3',
          },
          {
            label: 'This is fourth item',
            value: 4,
            isDisabled: true,
          },
          {
            label: 'This is fifth item',
            value: '5',
            isDisabled: true,
          },
        ]}
        isMultiple
        value={value}
        placeholder="Select something in the list bellow"
        onSelect={setValue}
      />
    </>
  );
};
