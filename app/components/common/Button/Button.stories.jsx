import PlusIcon from 'icons/Plus';
import Button from './index';

const Store = {
  component: Button,
  title: 'Components/Button',
};

export const Variants = () => (
  <div>
    <div style={{ padding: 10 }}>
      <Button>Button Primary</Button>
    </div>
    <div style={{ padding: 10 }}>
      <Button variant="secondary">Button Secondary</Button>
    </div>
    <div style={{ padding: 10 }}>
      <Button icon={<PlusIcon className="icon" />}>Button Primary Icon</Button>
    </div>
    <div style={{ padding: 10 }}>
      <Button variant="secondary" icon={<PlusIcon className="icon" />}>
        Button Secondary Icon
      </Button>
    </div>
  </div>
);

export default Store;
