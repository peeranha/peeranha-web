import React from 'react';
import IconComponent, { IconProps } from '../IconComponent';

const SlidersGraph: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" viewBox="0 0 32 32" size={props.size || [32, 32]}>
    <path
      d="M8.00003 13.125V5C8.00003 4.73478 7.89467 4.48043 7.70714 4.29289C7.5196 4.10536 7.26525 4 7.00003 4C6.73481 4 6.48046 4.10536 6.29292 4.29289C6.10539 4.48043 6.00003 4.73478 6.00003 5V13.125C5.13962 13.3453 4.37699 13.8457 3.83239 14.5473C3.28779 15.2489 2.99219 16.1118 2.99219 17C2.99219 17.8882 3.28779 18.7511 3.83239 19.4527C4.37699 20.1543 5.13962 20.6547 6.00003 20.875V27C6.00003 27.2652 6.10539 27.5196 6.29292 27.7071C6.48046 27.8946 6.73481 28 7.00003 28C7.26525 28 7.5196 27.8946 7.70714 27.7071C7.89467 27.5196 8.00003 27.2652 8.00003 27V20.875C8.86045 20.6547 9.62307 20.1543 10.1677 19.4527C10.7123 18.7511 11.0079 17.8882 11.0079 17C11.0079 16.1118 10.7123 15.2489 10.1677 14.5473C9.62307 13.8457 8.86045 13.3453 8.00003 13.125ZM7.00003 19C6.60447 19 6.21779 18.8827 5.88889 18.6629C5.55999 18.4432 5.30365 18.1308 5.15227 17.7654C5.0009 17.3999 4.96129 16.9978 5.03846 16.6098C5.11563 16.2219 5.30611 15.8655 5.58582 15.5858C5.86552 15.3061 6.22189 15.1156 6.60985 15.0384C6.99781 14.9613 7.39995 15.0009 7.7654 15.1522C8.13085 15.3036 8.44321 15.56 8.66297 15.8889C8.88273 16.2178 9.00003 16.6044 9.00003 17C9.00003 17.5304 8.78932 18.0391 8.41424 18.4142C8.03917 18.7893 7.53046 19 7.00003 19ZM17 7.125V5C17 4.73478 16.8947 4.48043 16.7071 4.29289C16.5196 4.10536 16.2652 4 16 4C15.7348 4 15.4805 4.10536 15.2929 4.29289C15.1054 4.48043 15 4.73478 15 5V7.125C14.1396 7.3453 13.377 7.8457 12.8324 8.54731C12.2878 9.24892 11.9922 10.1118 11.9922 11C11.9922 11.8882 12.2878 12.7511 12.8324 13.4527C13.377 14.1543 14.1396 14.6547 15 14.875V27C15 27.2652 15.1054 27.5196 15.2929 27.7071C15.4805 27.8946 15.7348 28 16 28C16.2652 28 16.5196 27.8946 16.7071 27.7071C16.8947 27.5196 17 27.2652 17 27V14.875C17.8604 14.6547 18.6231 14.1543 19.1677 13.4527C19.7123 12.7511 20.0079 11.8882 20.0079 11C20.0079 10.1118 19.7123 9.24892 19.1677 8.54731C18.6231 7.8457 17.8604 7.3453 17 7.125ZM16 13C15.6045 13 15.2178 12.8827 14.8889 12.6629C14.56 12.4432 14.3036 12.1308 14.1523 11.7654C14.0009 11.3999 13.9613 10.9978 14.0385 10.6098C14.1156 10.2219 14.3061 9.86549 14.5858 9.58579C14.8655 9.30608 15.2219 9.1156 15.6098 9.03843C15.9978 8.96126 16.3999 9.00087 16.7654 9.15224C17.1308 9.30362 17.4432 9.55996 17.663 9.88886C17.8827 10.2178 18 10.6044 18 11C18 11.5304 17.7893 12.0391 17.4142 12.4142C17.0392 12.7893 16.5305 13 16 13ZM29 21C28.9992 20.1132 28.7042 19.2517 28.1614 18.5505C27.6185 17.8493 26.8584 17.3479 26 17.125V5C26 4.73478 25.8947 4.48043 25.7071 4.29289C25.5196 4.10536 25.2652 4 25 4C24.7348 4 24.4805 4.10536 24.2929 4.29289C24.1054 4.48043 24 4.73478 24 5V17.125C23.1396 17.3453 22.377 17.8457 21.8324 18.5473C21.2878 19.2489 20.9922 20.1118 20.9922 21C20.9922 21.8882 21.2878 22.7511 21.8324 23.4527C22.377 24.1543 23.1396 24.6547 24 24.875V27C24 27.2652 24.1054 27.5196 24.2929 27.7071C24.4805 27.8946 24.7348 28 25 28C25.2652 28 25.5196 27.8946 25.7071 27.7071C25.8947 27.5196 26 27.2652 26 27V24.875C26.8584 24.6521 27.6185 24.1507 28.1614 23.4495C28.7042 22.7483 28.9992 21.8868 29 21ZM25 23C24.6045 23 24.2178 22.8827 23.8889 22.6629C23.56 22.4432 23.3036 22.1308 23.1523 21.7654C23.0009 21.3999 22.9613 20.9978 23.0385 20.6098C23.1156 20.2219 23.3061 19.8655 23.5858 19.5858C23.8655 19.3061 24.2219 19.1156 24.6098 19.0384C24.9978 18.9613 25.3999 19.0009 25.7654 19.1522C26.1308 19.3036 26.4432 19.56 26.663 19.8889C26.8827 20.2178 27 20.6044 27 21C27 21.5304 26.7893 22.0391 26.4142 22.4142C26.0392 22.7893 25.5305 23 25 23Z"
      fill={props.fill || '#E1E1E4'}
    />
  </IconComponent>
);

export default SlidersGraph;
