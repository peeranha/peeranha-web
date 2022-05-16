import Button from './index';

const Store = {
  component: Button,
  title: 'Components/Button',
};

export const Variants = () => (
  <div>
    <div style={{ padding: 20 }}>
      <Button>Button Primary</Button>
    </div>
    <div style={{ padding: 20 }}>
      <Button>Button Secondary</Button>
    </div>
    <div style={{ padding: 20 }}>
      <Button>Button Landing</Button>
    </div>
  </div>
);

export default Store;
