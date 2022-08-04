import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Clock: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="clock"
    fill="curentColor"
    viewBox="0 0 15 15"
    size={[15, 15]}
  >
    <g stroke={props.stroke || '#282828'}>
      <g stroke="none" strokeWidth="1">
        <g transform="translate(-27.000000, -277.000000)">
          <g transform="translate(25.000000, 276.000000)">
            <g transform="translate(2.000000, 1.000000)">
              <g
                fill={props.fill || '#282828'}
                fillOpacity="0.2"
                stroke={props.stroke || '#282828'}
              >
                <circle id="Oval" cx="7.5" cy="7.5" r="7" />
              </g>
              <rect
                fill={props.fill || '#282828'}
                x="6"
                y="4"
                width="1"
                height="5"
              />
              <rect
                fill={props.fill || '#282828'}
                transform="translate(8.500000, 8.500000) rotate(90.000000) translate(-8.500000, -8.500000) "
                x="8"
                y="7"
                width="1"
                height="3"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </IconComponent>
);

export default Clock;
