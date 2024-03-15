import React from 'react';
import { graphCommunityColors } from 'utils/communityManagement';
import IconComponent, { IconProps } from './IconComponent';

const graphCommunity = graphCommunityColors();

const TransactionLoader: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="transactionLoader"
    fill="currentColor"
    viewBox="0 0 36 36"
    size={[36, 36]}
  >
    <path
      d="M36 18C36 27.9411 27.9411 36 18 36C8.05887 36 0 27.9411 0 18C0 8.05887 8.05887 0 18 0C27.9411 0 36 8.05887 36 18ZM1.98 18C1.98 26.8476 9.1524 34.02 18 34.02C26.8476 34.02 34.02 26.8476 34.02 18C34.02 9.1524 26.8476 1.98 18 1.98C9.1524 1.98 1.98 9.1524 1.98 18Z"
      fill={graphCommunity ? 'rgb(111, 76, 255)' : '#7699FF'}
      fillOpacity="0.2"
    />
    <path
      d="M18 0C22.6181 5.507e-08 27.0595 1.77495 30.4056 4.95774C33.7517 8.14052 35.7466 12.4876 35.9775 17.0999L34.0007 17.1989C33.7952 13.0938 32.0197 9.22465 29.0415 6.39183C26.0633 3.55902 22.1103 1.97923 18 1.97923V0Z"
      fill={graphCommunity ? 'rgba(237, 74, 109, 1)' : '#F76F60'}
    />
  </IconComponent>
);

export default TransactionLoader;
