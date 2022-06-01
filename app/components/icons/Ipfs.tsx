import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Ipfs: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="ipfs"
    fill="curentColor"
    viewBox="0 0 169 196"
    size={[169, 196]}
  >
    <g fill="none">
      <path
        d="m.3 146 84 48.5 84-48.5v-97l-84-48.5-84 48.5z"
        fill={props.stroke || '#282828'}
      />
      <path
        d="m75.7 12.1-61 35.2c.0999862 1.0977279.0999862 2.2022721 0 3.3l60.9 35.2c5.1404674-3.8005698 12.1595326-3.8005698 17.3 0l60.9-35.2c-.099986-1.0977279-.099986-2.2022721 0-3.3l-60.8-35.2c-5.1404674 3.8005698-12.1595326 3.8005698-17.3 0zm84 48.2-61 35.6c.6781079 6.333528-2.7916258 12.385389-8.6 15l.1 70c.986199.434978 1.9245643.971186 2.8 1.6l60.9-35.2c-.678108-6.333528 2.791626-12.385389 8.6-15v-70.4c-.974881-.4570934-1.911257-.9921657-2.8-1.6zm-150.8.4c-.87543567.6288135-1.81380101 1.1650223-2.8 1.6v70.4c5.8882155 2.52578 9.3951061 8.642449 8.6 15l60.9 35.2c.8754357-.628814 1.813801-1.165022 2.8-1.6v-70.4c-5.8882155-2.52578-9.3951061-8.642449-8.6-15z"
        fill="#FFF"
      />
      <path
        d="m84.3 11 75.1 43.4v86.7l-75.1 43.4-75.1-43.4v-86.8zm0-10.3-84 48.5v97l84 48.5 84-48.5v-97z"
        fill={props.fill || '#282828'}
      />
      <path
        d="m84.9 114.000051h-1.2c-4.167157.010607-8.1667088-1.640073-11.1133434-4.586708-2.9466346-2.946634-4.5973143-6.946186-4.5867079-11.113343v-1.2c-.0106064-4.167157 1.6400733-8.1667088 4.5867079-11.1133434s6.9461864-4.5973143 11.1133434-4.5867079h1.2c4.167157-.0106064 8.1667088 1.6400733 11.1133434 4.5867079s4.5973146 6.9461864 4.5867076 11.1133434v1.2c.010607 4.167157-1.640073 8.166709-4.5867076 11.113343-2.9466346 2.946635-6.9461864 4.597315-11.1133434 4.586708zm0 64.499878h-1.2c-5.6800683-.017032-10.9234942 3.044823-13.7 8.000071l14.3 8.2 14.3-8.2c-2.7765058-4.955248-8.0199317-8.017103-13.7-8.000071zm83.5-48.49998h-.6c-4.167157-.010607-8.166709 1.640073-11.113343 4.586708-2.946635 2.946634-4.597315 6.946186-4.586657 11.113343v1.2c-.014381 2.665273.67556 5.287049 2 7.6l14.3-8.3zm-14.3-88.999949c-1.312716 2.3177361-2.001821 4.936333-2.000051 7.6v1.2c-.010607 4.167157 1.640073 8.1667088 4.586708 11.1133434 2.946634 2.9466346 6.946186 4.5973143 11.113343 4.5867079h.6v-16.3000513zm-69.8-40.3-14.3 8.2c2.763108 4.9814936 8.0035416 8.0798521 13.7 8.1000713h1.2c5.6800683.0170313 10.9234942-3.0448232 13.7-8.0000713zm-69.7 40.2-14.3 8.3v16.3000513h.6c4.16715701.0106064 8.16670879-1.6400733 11.1133434-4.5867079 2.9466346-2.9466346 4.5973143-6.9461864 4.5867079-11.1133434v-1.2c-.0339338-2.6906753-.7202372-5.3329433-2.0000513-7.7zm-13.7 89.099949h-.6v16.200051l14.3 8.3c1.3127164-2.317736 2.0018209-4.936333 2.0000513-7.6v-1.2c.0106064-4.167157-1.6400733-8.166709-4.5867079-11.113343-2.94663461-2.946635-6.94618639-4.597315-11.1133434-4.586708z"
        fill={props.stroke || '#282828'}
      />
      <g fill="#FFF">
        <path d="m84.3 195.2v-97.1l-84-48.5v97.1z" fillOpacity=".15" />
        <path d="m168.4 145.8v-97l-84 48.5v97.1z" fillOpacity=".05" />
      </g>
    </g>
  </IconComponent>
);

export default Ipfs;
