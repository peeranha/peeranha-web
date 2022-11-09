import React, { useState } from 'react';
import {
  Title,
  Subtitle,
  Description,
  Source,
  ArgsTable,
  PRIMARY_STORY,
} from '@storybook/addon-docs/blocks';
import Button from '../Button';
import Popover from './Popover';

const Docs = () => (
  <>
    <Title />
    <Subtitle />
    <Description />
    <Source dark />
    <ArgsTable story={PRIMARY_STORY} />
  </>
);

export default {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const style = {
  background: '#fff',
  width: 200,
};

const BasicPopover = args => (
  <>
    <Popover {...args}>
      <Popover.Trigger>
        <Button>Trigger</Button>
      </Popover.Trigger>
      <Popover.Content>
        <div style={style}>
          <h3>Popover</h3>
          <p>The content of the Popover.</p>
        </div>
      </Popover.Content>
    </Popover>
  </>
);
export const Basic = BasicPopover.bind({});
Basic.parameters = {
  docs: {
    description: {
      component: '## Basic',
    },
  },
};

const placements = [
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-start',
  'bottom',
  'bottom-end',
  'left-start',
  'left',
  'left-end',
];

const PositionPopover = () => {
  const [placement, setPlacement] = useState('bottom-start');
  const onPopoverPlacementChange = ({ target }) => {
    setPlacement(target.value);
  };

  const [offset, setOffset] = useState({
    top: 0,
    left: 0,
  });
  const onOffsetChange = type => ({ target }) => {
    setOffset({
      ...offset,
      [type]: Number(target.value),
    });
  };

  return (
    <div>
      <div className="df jcc mb16">
        <div className="mr16" style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div>
            <fieldset>
              <legend>Placement</legend>
              <div className="df fdc mr16">
                {placements.map(name => (
                  <label key={name} htmlFor={name}>
                    <input
                      type="radio"
                      checked={placement === name}
                      onChange={onPopoverPlacementChange}
                      value={name}
                      name={name}
                    />
                    <span>{name}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
        <div>
          <fieldset>
            <legend>Offset top</legend>
            <div>
              <label>
                <input
                  style={{ maxWidth: 50 }}
                  type="number"
                  name="offset"
                  value={offset.top}
                  onChange={onOffsetChange('top')}
                />
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Offset left</legend>
            <div>
              <label>
                <input
                  style={{ maxWidth: 50 }}
                  type="number"
                  name="offset"
                  value={offset.left}
                  onChange={onOffsetChange('left')}
                />
              </label>
            </div>
          </fieldset>
        </div>
      </div>
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Popover placement={placement} offset={offset}>
          <Popover.Trigger>
            <Button>Trigger</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div style={style}>
              <h3>Popover</h3>
              <p>The content of the Popover.</p>
            </div>
          </Popover.Content>
        </Popover>
      </div>
    </div>
  );
};

export const Position = PositionPopover.bind({});

Position.parameters = {
  controls: {
    disable: true,
  },
  docs: {
    description: {
      component: '## Position playground',
    },
  },
};

const HoverPopover = args => (
  <Popover {...args} event="hover">
    <Popover.Trigger>
      <Button>Trigger</Button>
    </Popover.Trigger>
    <Popover.Content>
      <div style={style}>
        <h3>Popover</h3>
        <p>The content of the Popover.</p>
        <input />
        <Button>11111</Button>
      </div>
    </Popover.Content>
  </Popover>
);
export const Hover = HoverPopover.bind({});
Hover.args = {
  event: 'hover',
};
Hover.parameters = {
  controls: {
    disable: true,
  },
  docs: {
    description: {
      component: '## Hover',
    },
  },
};

const FocusPopover = args => (
  <div style={{ height: 1600 }}>
    <Popover {...args} event="focus">
      <Popover.Trigger>
        <input label="Focus trigger element" />
      </Popover.Trigger>
      <Popover.Content>
        <div style={style}>
          <h3>Popover</h3>
          <p>The content of the Popover.</p>
        </div>
      </Popover.Content>
    </Popover>
  </div>
);
export const Focus = FocusPopover.bind({});
Focus.args = {
  event: 'hover',
};
Focus.parameters = {
  controls: {
    disable: true,
  },
  docs: {
    description: {
      component: '## Focus',
    },
  },
};

const EqualWidthPopover = args => (
  <Popover {...args} isEqualWidth>
    <Popover.Trigger>
      <Button>Trigger</Button>
    </Popover.Trigger>
    <Popover.Content>
      <div style={style}>
        <h3>Popover</h3>
        <p>The content of the Popover.</p>
      </div>
    </Popover.Content>
  </Popover>
);
export const EqualWidth = EqualWidthPopover.bind({});
EqualWidth.args = {
  isEqualWidth: true,
};
EqualWidth.parameters = {
  docs: {
    description: {
      component: '## With equal width',
    },
  },
};

const OnClosePopover = args => {
  const [history, setHistory] = useState([]);
  const onPopoverClose = () => {
    setHistory([...history, `Closed at: ${new Date().toLocaleTimeString()}`]);
  };
  return (
    <>
      <Popover {...args} onClose={onPopoverClose}>
        <Popover.Trigger>
          <Button>Trigger</Button>
        </Popover.Trigger>
        <Popover.Content>
          <div style={style}>
            <h3>Popover</h3>
            <p>The content of the Popover.</p>
          </div>
        </Popover.Content>
      </Popover>
      {history.map(el => <p key={el}>{el}</p>)}
    </>
  );
};
export const OnClose = OnClosePopover.bind({});
OnClose.parameters = {
  docs: {
    description: {
      component: '## With onClose callback',
    },
  },
};

const FunctionalPopover = args => (
  <>
    <Popover>
      <Popover.Trigger>
        {({ isOpen }) => (
          <Button variant={isOpen ? 'contained' : 'stroke'}>
            Open popover
          </Button>
        )}
      </Popover.Trigger>
      <Popover.Content>
        {({ close }) => {
          const clickHandler = () => {
            close();
          };
          return (
            <div style={style}>
              <h1>Title</h1>
              <p>The content of the Popover.</p>
              <Button onClick={clickHandler}>Close</Button>
            </div>
          );
        }}
      </Popover.Content>
    </Popover>
  </>
);

export const FuncionElements = FunctionalPopover.bind({});
FuncionElements.parameters = {
  docs: {
    description: {
      component: '## With trigger and children as functions',
    },
  },
};
