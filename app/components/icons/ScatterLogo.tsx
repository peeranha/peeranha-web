import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const ScatterLogo: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="scatter-logo"
    fill="curentColor"
    viewBox="0 0 54 19"
    size={[54, 19]}
  >
    <g fill="none" fillRule="evenodd">
      <g transform="translate(10 1)">
        <path
          fill={props.fill || '#282828'}
          d="M28.591 13.254c1.33-.448 2.24-1.894 2.14-3.325-.018-.264-.225-.717-.377-.73-.303-.024-.758.108-.922.33-.808 1.094-.876 2.361-.84 3.725m-9.267-1.816c0 1.204-.012 2.408.006 3.611.007.5.086 1.022.713 1.162.622.138 1.078-.209 1.277-.703.326-.812.699-1.657.755-2.506.116-1.747.03-3.506.04-5.26.002-.424-.195-.587-.622-.575-.491.014-.985.029-1.474-.006-.536-.038-.715.165-.705.666.026 1.204.008 2.408.01 3.611m.036-6.009c.796.047 1.537.118 2.278.113.157 0 .448-.275.446-.422-.016-1.504-.09-3.008-.115-4.513-.003-.15.175-.397.321-.441.93-.28 1.74.284 1.754 1.213.018 1.143.01 2.286 0 3.428-.005.428.048.65.633.63 1.526-.055 3.055-.014 4.583.004.135.002.344.086.391.186.313.659-.265 1.517-1.024 1.526-1.283.014-2.566.03-3.848.002-.558-.012-.75.165-.744.702.024 2.388.007 4.775.018 7.163.002.492.007 1.04.652 1.186.638.143 1.119-.183 1.323-.724.226-.598.457-1.246.44-1.866-.044-1.57.182-3.053 1.073-4.398.49-.74 1.138-1.324 2.02-1.627 1.603-.552 3.11.353 3.193 1.982.107 2.095-.897 3.637-2.77 4.687-.166.093-.345.162-.517.244-.15.071-.297.145-.439.215.492 1.567 2.775 2.125 4.11.938.56-.5 1.05-1.241 1.208-1.947.303-1.346.367-2.743.473-4.123.02-.25-.224-.52-.36-.774-.037-.067-.129-.106-.19-.162-.632-.581-.7-1.485-.15-1.964.615-.534 1.767-.436 2.179.314.387.705.944.784 1.628.774.427-.006.857-.015 1.282.014a1.47 1.47 0 0 1 1.356 1.815c-.378 1.588-.72 3.183-1.046 4.781-.063.31-.034.655.036.967.096.434.322.814.854.877.54.063.99-.127 1.243-.582.25-.446.43-.93.622-1.403.07-.169.077-.36.133-.535.127-.398.16-.912.795-.845.434.046.84.675.71 1.163-.344 1.304-.87 2.542-2.057 3.364-.873.604-1.871.693-2.86.256-1.001-.442-1.403-1.286-1.457-2.281-.085-1.574.336-3.073.831-4.556.129-.384.264-.767.44-1.28-.737 0-1.385-.022-2.027.022-.105.007-.248.298-.27.47-.153 1.193-.26 2.391-.416 3.584-.41 3.126-3.486 5.068-6.478 4.023-.814-.284-1.513-.868-2.34-1.36-.53.684-1.191 1.44-2.303 1.569-1.103.128-2.044-.11-2.672-1.248-.634.762-1.381 1.255-2.342 1.3-.985.045-1.822-.236-2.296-1.22-1.453 1.352-2.955 1.76-4.577.355-2.389 1.263-2.822 1.23-4.642-.249-1.077.377-2.033.858-3.049 1.036-2.36.413-4.456-.857-5.037-3.069-.634-2.418-.075-4.613 1.787-6.428.59-.575 1.343-.871 2.19-.893 1.332-.033 2.481 1.041 2.498 2.311.006.517-.4.996-.936 1.09-.36.063-.641-.004-.7-.416-.02-.141-.026-.308-.108-.412-.242-.304-.495-.788-.788-.819-.35-.036-.898.23-1.097.527-.967 1.44-1.214 3.043-.778 4.696.241.917.845 1.632 1.888 1.803 1.172.191 2.264-.058 2.955-1.036.31-.437.426-1.047.478-1.592.256-2.645 1.445-4.681 4.088-5.744.632-.255 1.362-.32 2.056-.389.286-.028.7.084.87.28.217.251.293.647.323.99.006.077-.437.288-.66.272-2.535-.186-4.34 1.807-4.603 4.184-.066.6-.08 1.222.014 1.816.142.886.74 1.324 1.525 1.25.682-.065 1.291-.75 1.302-1.528.018-1.265.001-2.53.003-3.796 0-.388-.175-.848.446-.99.498-.113 1.209.164 1.415.615.107.234.145.512.148.77.015 1.224.004 2.449.01 3.673.001.531.07 1.066.713 1.226.634.157 1.06-.231 1.254-.724.306-.774.651-1.581.699-2.39.103-1.749.015-3.508.035-5.263.006-.5-.17-.713-.702-.67a6.25 6.25 0 0 1-.961-.013c-.567-.042-.885-.372-1.014-.876-.144-.56.066-.806.68-.793.47.01.939.045 1.408.079.392.028.609-.097.593-.511a223.875 223.875 0 0 1-.145-4.45c-.003-.143.154-.37.294-.423.83-.313 1.758.264 1.776 1.11.026 1.163.007 2.327.011 3.49.001.22.022.438.034.66"
        />
      </g>
      <g>
        <path
          fill={props.fill || '#282828'}
          d="M10.962 3.929c-.025 1.37-1.218 2.748-2.76 3.9-.537.402-1.203.695-1.858.908-.85.276-1.699-.24-1.929-1.053-.094-.33-.026-.502.396-.512 1.79-.043 3.892-1.828 4.122-3.48.155-1.111-.415-1.79-1.595-1.627a7.362 7.362 0 0 0-2.562.887c-1.232.702-2.152 1.736-2.506 3.083-.404 1.535.11 2.828 1.443 3.794.924.67 1.914 1.26 2.845 1.922 1.318.937 2.304 2.05 2.15 3.748-.127 1.397-.832 2.453-2.157 3.056-1.344.611-2.742.617-4.054-.131-.861-.492-.779-1.634.139-2.038.145-.064.46.044.602.167.636.55 1.373.671 2.154.435 1.322-.4 1.697-2.039.641-3.062-.667-.646-1.502-1.139-2.265-1.697-.678-.495-1.417-.93-2.03-1.487C.07 9.227-.423 7.34.371 5.335 1.535 2.4 3.814.58 7.195.159c2.222-.277 3.74 1.033 3.767 3.77"
        />
      </g>
    </g>
  </IconComponent>
);

export default ScatterLogo;
