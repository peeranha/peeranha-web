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
          <img
            src="https://images.peeranha.io/communities/aave/aaveLogo.svg"
            alt=""
          />
        </div>
      </ScrollContainer>
    </div>
    <div style={{ padding: 10 }}>
      <h4>Active scroll container</h4>
      <ScrollContainer>
        <div className="df">
          <img
            src="https://images.peeranha.io/communities/aave/aaveLogo.svg"
            alt=""
          />
          <img
            src="https://images.peeranha.io/communities/aave/aaveLogo.svg"
            alt=""
          />
          <img
            src="https://images.peeranha.io/communities/aave/aaveLogo.svg"
            alt=""
          />
          <img
            src="https://images.peeranha.io/communities/aave/aaveLogo.svg"
            alt=""
          />
          <img
            src="https://images.peeranha.io/communities/aave/aaveLogo.svg"
            alt=""
          />
          <img
            src="https://images.peeranha.io/communities/aave/aaveLogo.svg"
            alt=""
          />
          <img
            src="https://images.peeranha.io/communities/aave/aaveLogo.svg"
            alt=""
          />
          <img
            src="https://images.peeranha.io/communities/aave/aaveLogo.svg"
            alt=""
          />
          <img
            src="https://images.peeranha.io/communities/aave/aaveLogo.svg"
            alt=""
          />
        </div>
      </ScrollContainer>
    </div>
  </div>
);

export default Store;
