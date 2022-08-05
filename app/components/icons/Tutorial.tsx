import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Tutorial: React.FC<IconProps> = ({ className, size }): JSX.Element => (
  <IconComponent
    id="tutorial"
    fill="currentColor"
    viewBox="0 0 24 24"
    size={size || [24, 24]}
    className={className}
  >
    <g stroke="none" fill="none" transform="translate(3, 1)">
      <path d="M1,3 L3.03979492,3 L5,3 L5,21 C4.64615885,21 3.98978678,21 3.03088379,21 C1.59545898,21 1,19.9549513 1,18.7734172 C1,18.7734172 1,13.5156115 1,3 Z" />
      <path d="M2.99897502,1 C3.67324232,1 8.67358398,1 18,1 C17.3333333,1.38777669 17,2.05444336 17,3 C17,3.94555664 17.3333333,4.61222331 18,5 C8.6546224,5 3.6546224,5 3,5 C1.99996426,5 1,4.45019531 1,3 C1,1.54980469 2,1 2.99897502,1 Z" />
      <line className="stroke" x1="4" y1="19.5" x2="16" y2="19.5" />
      <line className="stroke" x1="7" y1="7" x2="13" y2="7" />
      <line className="stroke" x1="7" y1="10" x2="13" y2="10" />
      <line className="stroke" x1="7" y1="13" x2="13" y2="13" />
      <path
        className="stroke"
        fill="none"
        d="M0.5,2.5 C0.5,9.23204602 0.5,9.33807363 0.5,13.8300629 C0.5,15.6374336 0.5,15.6374336 0.5,16.7875786 C0.5,17.6091108 0.5,17.6091108 0.5,17.7734172 C0.5,18.8516356 1.02048254,19.5 2.03088379,19.5 C2.91545141,19.5 3.19208916,19.5 3.49999986,19.5 L3.5,2.5 L0.5,2.5 Z"
      />
      <path
        className="stroke"
        fill="#ffffff"
        d="M15.8375322,3.5 C15.612694,3.0820515 15.5,2.57864653 15.5,2 C15.5,1.42135347 15.612694,0.917948502 15.8375322,0.5 C10.5283784,0.5 10.2713777,0.5 6.25493174,0.5 C4.51499344,0.5 4.51499344,0.5 3.31581444,0.5 C2.38701508,0.5 2.38701508,0.5 1.99897502,0.5 C1.08310954,0.5 0.5,0.995774532 0.5,2 C0.5,3.00433835 1.08316907,3.5 2,3.5 C2.38127645,3.5 2.38127645,3.5 3.3057251,3.5 C4.50175985,3.5 4.50175985,3.5 6.2409668,3.5 C10.2599668,3.5 10.5166297,3.5 15.837533,3.5 Z"
      />
      <line className="stroke" x1="16" y1="4" x2="16" y2="20" />
    </g>
  </IconComponent>
);

export default Tutorial;