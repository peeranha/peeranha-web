import Checkbox from './index';

const Store = {
  component: Checkbox,
  title: 'Components/Checkbox',
};

export const Variants = () => (
  <div>
    <div style={{ padding: 10 }}>
      <Checkbox isChecked>Checkbox with text</Checkbox>
    </div>
    <div style={{ padding: 10 }}>
      <Checkbox />
    </div>
    <div style={{ padding: 10 }}>
      <Checkbox isChecked disabled>
        Disabled checkbox with text
      </Checkbox>
    </div>
    <div style={{ padding: 10 }}>
      <Checkbox disabled />
    </div>
  </div>
);

export default Store;
