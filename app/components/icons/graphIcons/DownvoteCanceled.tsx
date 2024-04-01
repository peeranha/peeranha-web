import React from 'react';
import IconComponent, { IconProps } from '../IconComponent';

const DownvoteCanceledGraph: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" viewBox="0 0 32 32" size={props.size || [32, 32]}>
    <path
      d="M22.9185 18.4961L18.497 28.4443C17.6176 28.4443 16.7741 28.095 16.1522 27.4731C15.5303 26.8512 15.181 26.0077 15.181 25.1282L15.181 20.7068L8.9246 20.7068C8.60415 20.7104 8.28674 20.6443 7.99436 20.5131C7.70198 20.3819 7.44163 20.1887 7.23134 19.9468C7.02105 19.705 6.86586 19.4204 6.77651 19.1126C6.68715 18.8048 6.65928 18.3658 6.70737 18.049V18.4393M22.9185 18.4961L22.9185 6.33708M22.9185 18.4961H26.2346C26.8209 18.4961 27.3832 18.2632 27.7978 17.8486C28.2124 17.434 28.4453 16.8717 28.4453 16.2853L28.4453 8.5478C28.4453 7.96148 28.2124 7.39918 27.7978 6.98459C27.3832 6.56999 26.8209 6.33708 26.2346 6.33708H22.9185M22.9185 6.33708H17.8891"
      stroke={props.stroke || '#E1E1E4'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="9.88715"
      cy="9.92405"
      r="5.32222"
      transform="rotate(180 9.88715 9.92405)"
      stroke={props.stroke || '#E1E1E4'}
      strokeWidth="1.8"
    />
    <path
      d="M7.22135 13.4795L12.5547 6.36838"
      stroke={props.stroke || '#E1E1E4'}
      strokeWidth="1.8"
    />
  </IconComponent>
);

export default DownvoteCanceledGraph;
