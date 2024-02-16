import React from 'react';
import IconComponent, { IconProps } from '../IconComponent';

const FileArrowUpGraph: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" viewBox="0 0 32 32" size={props.size || [32, 32]}>
    <path
      d="M26.7075 10.2925L19.7075 3.2925C19.6146 3.19967 19.5042 3.12605 19.3829 3.07586C19.2615 3.02568 19.1314 2.9999 19 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V27C5 27.5304 5.21071 28.0391 5.58579 28.4142C5.96086 28.7893 6.46957 29 7 29H25C25.5304 29 26.0391 28.7893 26.4142 28.4142C26.7893 28.0391 27 27.5304 27 27V11C27.0001 10.8686 26.9743 10.7385 26.9241 10.6172C26.8739 10.4958 26.8003 10.3854 26.7075 10.2925ZM20 6.41375L23.5863 10H20V6.41375ZM25 27H7V5H18V11C18 11.2652 18.1054 11.5196 18.2929 11.7071C18.4804 11.8946 18.7348 12 19 12H25V27ZM19.7075 17.2925C19.8004 17.3854 19.8741 17.4957 19.9244 17.6171C19.9747 17.7385 20.0006 17.8686 20.0006 18C20.0006 18.1314 19.9747 18.2615 19.9244 18.3829C19.8741 18.5043 19.8004 18.6146 19.7075 18.7075C19.6146 18.8004 19.5043 18.8741 19.3829 18.9244C19.2615 18.9747 19.1314 19.0006 19 19.0006C18.8686 19.0006 18.7385 18.9747 18.6171 18.9244C18.4957 18.8741 18.3854 18.8004 18.2925 18.7075L17 17.4137V23C17 23.2652 16.8946 23.5196 16.7071 23.7071C16.5196 23.8946 16.2652 24 16 24C15.7348 24 15.4804 23.8946 15.2929 23.7071C15.1054 23.5196 15 23.2652 15 23V17.4137L13.7075 18.7075C13.6146 18.8004 13.5043 18.8741 13.3829 18.9244C13.2615 18.9747 13.1314 19.0006 13 19.0006C12.8686 19.0006 12.7385 18.9747 12.6171 18.9244C12.4957 18.8741 12.3854 18.8004 12.2925 18.7075C12.1996 18.6146 12.1259 18.5043 12.0756 18.3829C12.0253 18.2615 11.9994 18.1314 11.9994 18C11.9994 17.8686 12.0253 17.7385 12.0756 17.6171C12.1259 17.4957 12.1996 17.3854 12.2925 17.2925L15.2925 14.2925C15.3854 14.1995 15.4957 14.1258 15.6171 14.0754C15.7385 14.0251 15.8686 13.9992 16 13.9992C16.1314 13.9992 16.2615 14.0251 16.3829 14.0754C16.5043 14.1258 16.6146 14.1995 16.7075 14.2925L19.7075 17.2925Z"
      fill={props.fill || '#E1E1E4'}
    />
  </IconComponent>
);

export default FileArrowUpGraph;
