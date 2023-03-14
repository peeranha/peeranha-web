import ScrollContainer from './index';

const Store = {
  component: ScrollContainer,
  title: 'Components/ScrollContainer',
};

export const Variants = () => (
  <div>
    <div style={{ padding: 10 }}>
      <h4>Inactive scroll container</h4>
      <ScrollContainer>
        <div className="df">
          <span>123</span>
          <span>123</span>
        </div>
      </ScrollContainer>
    </div>
    <div style={{ padding: 10 }}>
      <h4>Active scroll container</h4>
      <ScrollContainer>
        <div className="df">
          <span>123</span>
          <span>123</span>
          <span>123</span>
          <span>123</span>
          <span>123</span>
          <span>123</span>
          <span>123</span>
        </div>
      </ScrollContainer>
    </div>
  </div>
);

export default Store;
