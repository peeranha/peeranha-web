import Spinner from './index';

const Store = {
  component: Spinner,
  title: 'Components/Spinner',
};

export const Variants = () => (
  <div>
    <div style={{ padding: 10 }}>
      <Spinner />
    </div>
    <div style={{ padding: 10 }}>
      <Spinner color="rgb(87,111,237)" />
    </div>
    <div style={{ padding: 10 }}>
      <Spinner size={18} />
    </div>
    <div style={{ padding: 10 }}>
      <Spinner size={54} />
    </div>
  </div>
);

export default Store;
