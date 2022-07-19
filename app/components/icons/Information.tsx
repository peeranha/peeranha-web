import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Information: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="information"
    fill="curentColor"
    viewBox="0 0 18 19"
    size={[18, 19]}
  >
    <g transform="translate(2 1)" fill="none">
      <circle
        stroke={props.stroke || '#282828'}
        fillOpacity=".2"
        fill="#FFF"
        cx="7.5"
        cy="7.5"
        r="7"
      />
      <g transform="translate(5 3)" fill="#000">
        <path d="m3.818 8.144-.142.508c-.306.124-.55.217-.73.28a1.47 1.47 0 0 1-.617.065c-.354-.031-.62-.168-.796-.408-.177-.241-.25-.534-.22-.878.012-.133.031-.27.058-.408.027-.138.065-.294.113-.467l.511-1.643c.047-.157.088-.307.123-.449.034-.14.057-.271.067-.39.019-.213-.002-.366-.063-.456-.06-.09-.187-.144-.38-.16a.814.814 0 0 0-.295.031 3.46 3.46 0 0 0-.265.087l.143-.508c.25-.105.488-.193.715-.264a1.64 1.64 0 0 1 .633-.08c.351.03.613.164.784.4.17.238.241.532.21.883-.006.073-.023.2-.053.383-.03.182-.068.349-.117.499l-.51 1.636a5.596 5.596 0 0 0-.19.84c-.02.22.006.375.075.463.07.087.2.138.388.155a.913.913 0 0 0 .306-.034c.115-.03.199-.058.252-.085" />
        <circle cx="3" cy="1" r="1" />
      </g>
    </g>
  </IconComponent>
);

export default Information;
