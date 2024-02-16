import React from 'react';
import IconComponent, { IconProps } from '../IconComponent';

const PostAnsweredGraph: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" viewBox="0 0 32 32" size={props.size || [32, 32]}>
    <path
      d="M14.0039 14.8282H21.1979"
      stroke={props.stroke || '#E1E1E4'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.0039 18.4249H21.1979"
      stroke={props.stroke || '#E1E1E4'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.73434 16.8889L7.73438 19.9103V23.8206C7.73438 24.0591 7.82912 24.2878 7.99776 24.4564C8.1664 24.6251 8.39513 24.7198 8.63362 24.7198L14.3903 24.7198C14.5456 24.7198 14.6982 24.76 14.8334 24.8365C14.9685 24.913 15.0815 25.0232 15.1614 25.1563L16.8261 27.9308C16.906 28.064 17.019 28.1742 17.1541 28.2507C17.2893 28.3272 17.4419 28.3674 17.5972 28.3674C17.7525 28.3674 17.9051 28.3272 18.0402 28.2507C18.1754 28.1742 18.2884 28.064 18.3683 27.9308L20.033 25.1564C20.1129 25.0232 20.2259 24.913 20.361 24.8365C20.4961 24.76 20.6488 24.7198 20.8041 24.7198L27.4889 24.7198C27.7274 24.7198 27.9561 24.6251 28.1248 24.4564C28.2934 24.2878 28.3882 24.0591 28.3882 23.8206V9.4326C28.3882 9.19411 28.2934 8.96538 28.1248 8.79674C27.9561 8.6281 27.7274 8.53336 27.4889 8.53336H18.0402"
      stroke={props.stroke || '#E1E1E4'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.55469 7.70372L7.70284 11.8519L15.9991 3.55557"
      stroke={props.stroke || '#E1E1E4'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconComponent>
);

export default PostAnsweredGraph;
