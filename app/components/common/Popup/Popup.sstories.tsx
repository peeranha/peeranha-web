import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import DeleteForeverIcon from 'citrus-ui/core/icons/DeleteForever';
import Popup, { PopupProps } from './Popup';
import Popover from '../Popover';

export default {
  title: 'Components/Popup',
  component: Popup,
  parameters: {
    controls: {
      disabled: true,
    },
  },
} as Meta;

export const Basic: Story<PopupProps> = args => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>Open popup</button>
      {open && (
        <Popup title="This is a popup" onClose={() => setOpen(false)}>
          <p className="">
            This is a very very long long long popup popup popup popup text This
            is a very very long long long popup popup popup popup text This is a
            very very long long long popup popup popup popup text This is a very
            very long long long popup popup popup popup text This is a very very
            long long long popup popup popup popup text This is a very very long
            long long popup popup popup popup text This is a very very long long
            long popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text This is a very very long long long
            popup popup popup popup text
          </p>
        </Popup>
      )}
    </>
  );
};

export const Sizes: Story<PopupProps> = args => {
  const SIZES = ['full', 'big', 'medium', 'small', 'tiny', 'atom'];
  const [activeSize, setSize] = useState<
    'full' | 'big' | 'medium' | 'small' | 'tiny' | 'atom'
  >('full');
  const [open, setOpen] = useState(false);

  return (
    <>
      {SIZES.map(size => (
        <div
          key={size}
          style={{
            display: 'inline-block',
            marginRight: 10,
            marginBottom: 10,
          }}
        >
          <label>
            <input
              type="radio"
              checked={activeSize === size}
              onChange={() => {
                setSize(size);
              }}
              value={size}
              name={size}
            />
            <span style={{ marginLeft: 5 }}>{size}</span>
          </label>
        </div>
      ))}
      <div>
        <button onClick={() => setOpen(!open)}>Open popup</button>
      </div>
      {open && (
        <Popup
          title="This is a popup"
          size={activeSize}
          onClose={() => setOpen(false)}
        >
          <p>
            This is a very very long long long popup popup popup popup text This
            is a very very long long long popup popup popup popup text This is a
            very very long long long popup popup popup popup text This is a very
            very long long long popup popup popup popup text
            <Popover>
              <Popover.Trigger>
                <DeleteForeverIcon />
              </Popover.Trigger>
              <Popover.Content>
                <div>
                  <h3>Popover</h3>
                  <p>The content of the Popover.</p>
                </div>
              </Popover.Content>
            </Popover>
          </p>
        </Popup>
      )}
    </>
  );
};

export const WithoutAnimation: Story<PopupProps> = args => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>Open popup</button>
      {open && (
        <Popup
          title="This is a popup"
          onClose={() => setOpen(false)}
          isTransition={false}
        >
          <p>
            This is a very very long long long popup popup popup popup text This
            is a very very long long long popup popup popup popup text This is a
            very very long long long popup popup popup popup text This is a very
            very long long long popup popup popup popup text
          </p>
        </Popup>
      )}
    </>
  );
};

export const Advertising: Story<PopupProps> = args => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>Open popup</button>
      {open && (
        <Popup
          title="This is a popup"
          onClose={() => setOpen(false)}
          type="advertising"
        >
          <p>
            This is a very very long long long popup popup popup popup text This
            is a very very long long long popup popup popup popup text This is a
            very very long long long popup popup popup popup text This is a very
            very long long long popup popup popup popup textThis is a very very
            long long long This is a very very long long long This is a very
            very long long long This is a very very long long long This is a
            very very long long long popup popup popup popup textThis is a very
            very long long long This is a very very long long long This is a
            very very long long long popup popup popup popup textThis is a very
            very long long long This is a very very long long long This is a
            very very long long long This is a very very long long long This is
            a very very long long long popup popup popup popup textThis is a
            very very long long long This is a very very long long long This is
            a very very long long long This is a very very long long long popup
            popup popup popup textThis is a very very long long long This is a
            very very long long long This is a very very long long long popup
            popup popup popup textThis is a very very long long long This is a
            very very long long long This is a very very long long long This is
            a very very long long long This is a very very long long long popup
            popup popup popup textThis is a very very long long long This is a
            very very long long long This is a very very long long long This is
            a very very long long long popup popup popup popup textThis is a
            very very long long long This is a very very long long long This is
            a very very long long long This is a very very long long long This
            is a very very long long long This is a very very long long long
            This is a very very long long long This is a very very long long
            long This is a very very long long long This is a very very long
            long long This is a very very long long long This is a very very
            long long long This is a very very long long long This is a very
            very long long long popup popup popup popup textp popup text
          </p>
        </Popup>
      )}
    </>
  );
};
