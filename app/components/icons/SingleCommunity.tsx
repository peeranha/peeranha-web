import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const SingleCommunity: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="search-big"
    fill="curentColor"
    viewBox="0 0 16 16"
    size={[16, 16]}
  >
    <line
      fill="none"
      stroke={props.stroke || '#282828'}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      x1="15.5"
      y1="0.5"
      x2="7.5"
      y2="8.5"
    />
    <polyline
      fill="none"
      stroke={props.stroke || '#282828'}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      points="8.5,0.5
	15.5,0.5 15.5,7.5 "
      data-color="color-2"
    />
    <path
      fill="none"
      stroke={props.stroke || '#282828'}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      d="M12.5,9.5v5
	      c0,0.552-0.448,1-1,1h-10c-0.552,0-1-0.448-1-1v-10c0-0.552,0.448-1,1-1h5"
    />
  </IconComponent>
);

export default SingleCommunity;
