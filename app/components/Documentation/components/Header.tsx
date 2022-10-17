import React from 'react';
import Button from 'common-components/Button';
import SaveIcon from 'icons/Save';
import CloseRoundedIcon from 'icons/CloseRounded';

const Header: React.FC<any> = ({ toggleEditDocumentation }) => (
  <div
    className="df jcsb aic pl32 pr32 pt12 pb12"
    css={{
      height: 72,
      background: '#A5BCFF',
      color: 'var(--color-white)',
      fontWeight: 600,
      fontSize: 38,
      lineHeight: '48px',
    }}
  >
    <div>Edit documentation</div>
    <div className="df aic">
      <Button
        variant="third"
        icon={
          <CloseRoundedIcon
            className="icon"
            css={{ width: 18, height: 18, fill: 'transparent' }}
          />
        }
        className="mr16"
        onClick={toggleEditDocumentation}
      >
        Close
      </Button>
      <Button
        variant="secondary"
        icon={
          <SaveIcon
            className="icon"
            css={{
              color: 'transparent',
              stroke: '#F76F60',
              width: 18,
              height: 18,
            }}
          />
        }
        css={{
          borderWidth: 0,
          '&:hover .icon': { stroke: 'var(--color-white)' },
        }}
      >
        Save changes
      </Button>
    </div>
  </div>
);

export default Header;
