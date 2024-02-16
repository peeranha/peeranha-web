import React from 'react';
import IconComponent, { IconProps } from '../IconComponent';

const PostTypeChangedGraph: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" viewBox="0 0 32 32" size={props.size || [32, 32]}>
    <path
      d="M12.775 8.53329H4.4525C4.214 8.53329 3.98528 8.62804 3.81664 8.79668C3.648 8.96532 3.55325 9.19405 3.55325 9.43254V23.8205C3.55325 24.059 3.648 24.2877 3.81664 24.4564C3.98528 24.625 4.214 24.7198 4.4525 24.7198L11.1373 24.7197C11.2926 24.7197 11.4453 24.7599 11.5804 24.8364C11.7155 24.9129 11.8285 25.0231 11.9084 25.1563L13.5731 27.9308C13.653 28.0639 13.766 28.1741 13.9012 28.2506C14.0363 28.3271 14.1889 28.3674 14.3442 28.3674C14.4995 28.3674 14.6522 28.3271 14.7873 28.2506C14.9224 28.1741 15.0354 28.0639 15.1153 27.9308L16.78 25.1563C16.8599 25.0231 16.9729 24.9129 17.1081 24.8364C17.2432 24.7599 17.3958 24.7197 17.5511 24.7197L23.3078 24.7198C23.5463 24.7198 23.775 24.625 23.9436 24.4564C24.1123 24.2877 24.207 24.059 24.207 23.8205V23.1111"
      fill={props.fill || '#E1E1E4'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25.9984 8.89999C26.4955 8.89999 26.8984 8.49705 26.8984 7.99999C26.8984 7.50294 26.4955 7.09999 25.9984 7.09999L19.0778 7.09999L21.1852 4.8879C21.5281 4.52802 21.5143 3.95834 21.1544 3.61549C20.7945 3.27263 20.2248 3.28644 19.882 3.64633L16.3254 7.37962C16.1606 7.55261 16.0713 7.78405 16.0773 8.02291C16.0833 8.26177 16.184 8.48845 16.3572 8.65299L19.9138 12.0308C20.2742 12.3731 20.8439 12.3584 21.1862 11.998C21.5285 11.6376 21.5138 11.0679 21.1534 10.7256L19.2311 8.89999L25.9984 8.89999Z"
      fill={props.fill || '#E1E1E4'}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.9373 18.3726C22.5769 18.7149 22.5622 19.2846 22.9045 19.645C23.2468 20.0054 23.8165 20.0201 24.1769 19.6778L27.7335 16.2999C27.9067 16.1354 28.0074 15.9087 28.0134 15.6699C28.0194 15.431 27.9301 15.1996 27.7653 15.0266L24.2087 11.2933C23.8659 10.9334 23.2962 10.9196 22.9363 11.2624C22.5764 11.6053 22.5626 12.175 22.9055 12.5349L25.3492 15.1H18.0016C17.5045 15.1 17.1016 15.503 17.1016 16C17.1016 16.4971 17.5045 16.9 18.0016 16.9H24.4879L22.9373 18.3726Z"
      fill={props.fill || '#E1E1E4'}
    />
  </IconComponent>
);

export default PostTypeChangedGraph;
