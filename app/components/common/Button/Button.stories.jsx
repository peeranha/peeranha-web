import PlusIcon from 'icons/Plus';
import Button from './index';
import Spinner from './Spinner';

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
      <Button
        icon={<PlusIcon className="icon" />}
        spinner={<Spinner thema={'light'} />}
        isLoading={true}
      >
        Button Primary Icon
      </Button>
    </div>
    <div style={{ padding: 10 }}>
      <Button
        variant="secondary"
        icon={<PlusIcon />}
        spinner={<Spinner />}
        isLoading={true}
      >
        Button Secondary Icon
      </Button>
    </div>
    <div style={{ padding: 10 }}>
      <Button
        variant="link"
        icon={<PlusIcon className="icon" />}
        spinner={<Spinner />}
        isLoading={true}
      >
        Change type
      </Button>
    </div>
    <div style={{ padding: 10 }}>
      <Button
        variant="link"
        icon={<PlusIcon className="icon" />}
        spinner={<Spinner />}
        isHideText={true}
        isLoading={true}
      >
        Button Link with hidden text
      </Button>
    </div>
  </div>
);

export default Store;
