import ScrollContainer from './index';
import wombatLogo from 'images/wombat.png';

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
          <img src={wombatLogo} alt="" />
          <img src={wombatLogo} alt="" />
        </div>
      </ScrollContainer>
    </div>
    <div style={{ padding: 10 }}>
      <h4>Active scroll container</h4>
      <ScrollContainer>
        <div className="df">
          <img src={wombatLogo} alt="" />
          <img src={wombatLogo} alt="" />
          <img src={wombatLogo} alt="" />
          <img src={wombatLogo} alt="" />
          <img src={wombatLogo} alt="" />
          <img src={wombatLogo} alt="" />
          <img src={wombatLogo} alt="" />
        </div>
      </ScrollContainer>
    </div>
  </div>
);

export default Store;
