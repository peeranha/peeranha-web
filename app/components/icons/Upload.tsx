import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const Upload: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="currentColor" viewBox="0 0 48 59" size={[48, 59]}>
    <g fill="none">
      <path
        fill="#000"
        d="M.984 50.664v-6.16h1.344v6.192c0 2.528 1.072 3.328 2.432 3.328 1.392 0 2.496-.8 2.496-3.328v-6.192h1.28v6.16c0 3.376-1.632 4.528-3.776 4.528S.984 54.04.984 50.664Zm11.488 3.632.032 1.36v2.624h-1.312V47.224h1.088l.112.896h.048c.704-.592 1.568-1.088 2.48-1.088 2 0 3.072 1.552 3.072 3.968 0 2.64-1.584 4.192-3.36 4.192-.72 0-1.44-.336-2.16-.896Zm.032-1.024c.704.592 1.392.816 1.904.816 1.28 0 2.224-1.168 2.224-3.088 0-1.712-.576-2.864-2.048-2.864-.656 0-1.312.368-2.08 1.056v4.08Zm7.568.16v-9.824h1.312v9.92c0 .416.176.576.368.576.08 0 .144 0 .288-.032l.176.992c-.176.08-.4.128-.752.128-.992 0-1.392-.624-1.392-1.76Zm3.504-2.304c0-2.608 1.696-4.096 3.6-4.096 1.904 0 3.6 1.488 3.6 4.096 0 2.576-1.696 4.064-3.6 4.064-1.904 0-3.6-1.488-3.6-4.064Zm1.36 0c0 1.776.912 2.976 2.24 2.976 1.344 0 2.24-1.2 2.24-2.976 0-1.792-.896-3.008-2.24-3.008-1.328 0-2.24 1.216-2.24 3.008Zm7.28 1.856c0-1.696 1.472-2.544 4.784-2.912 0-.992-.336-1.952-1.6-1.952-.912 0-1.712.416-2.32.832l-.528-.912c.72-.464 1.808-1.008 3.056-1.008 1.904 0 2.704 1.264 2.704 3.2V55h-1.088l-.112-.928h-.032c-.752.608-1.616 1.12-2.576 1.12-1.312 0-2.288-.816-2.288-2.208Zm1.296-.096c0 .88.592 1.248 1.36 1.248.752 0 1.376-.368 2.128-1.04v-2.16c-2.608.32-3.488.96-3.488 1.952Zm6.72-1.76c0-2.528 1.6-4.096 3.376-4.096.896 0 1.488.336 2.176.896L45.72 46.6v-2.992h1.328V55H45.96l-.112-.912H45.8c-.608.592-1.44 1.104-2.352 1.104-1.952 0-3.216-1.472-3.216-4.064Zm1.36-.016c0 1.856.784 2.976 2.144 2.976.72 0 1.344-.352 1.984-1.072v-4.064c-.656-.592-1.248-.816-1.888-.816-1.248 0-2.24 1.2-2.24 2.976Z"
      />
      <g stroke={props.stroke || '#282828'} opacity=".9">
        <path
          fillOpacity=".2"
          fill="#FFF"
          d="M5 2.5A3.5 3.5 0 0 0 1.5 6v23A3.5 3.5 0 0 0 5 32.5h38a3.5 3.5 0 0 0 3.5-3.5V6A3.5 3.5 0 0 0 43 2.5H5Zm19 24.618c-5.356 0-9.7-4.305-9.7-9.618 0-5.313 4.344-9.618 9.7-9.618 5.356 0 9.7 4.305 9.7 9.618 0 5.313-4.344 9.618-9.7 9.618ZM41.48 9.794a2.332 2.332 0 0 1-2.34-2.323 2.332 2.332 0 0 1 2.34-2.324c1.291 0 2.34 1.04 2.34 2.324a2.332 2.332 0 0 1-2.34 2.323Z"
        />
        <path d="M17.55 2.5h13.9A2.5 2.5 0 0 0 29 .5h-9a2.5 2.5 0 0 0-2.45 2Z" />
      </g>
    </g>
  </IconComponent>
);

export default Upload;
