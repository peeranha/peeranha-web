import React from 'react';
import IconComponent, { IconProps } from './IconComponent';

const SearchFaq: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="search-faq"
    fill="curentColor"
    viewBox="0 0 43 43"
    size={[43, 43]}
  >
    <g transform="translate(8 7)" fill="none" fillRule="evenodd">
      <circle fill="#FFF" fillRule="nonzero" cx="14.5" cy="14.5" r="14.5" />
      <circle
        stroke={props.stroke || '#282828'}
        fill="#FFF"
        fillRule="nonzero"
        cx="13.5"
        cy="13.5"
        r="13"
      />
      <path
        d="M12.52 16.461c-.455-3.372 2.828-4.604 2.828-6.895 0-1.145-.681-2.096-2.003-2.096-.908 0-1.734.475-2.374 1.253L10 7.793C10.867 6.757 12.003 6 13.469 6 15.596 6 17 7.318 17 9.458c0 2.832-3.324 3.977-2.994 7.003h-1.487Zm-.434 3.199c0-.821.536-1.383 1.218-1.383.681 0 1.239.562 1.239 1.383 0 .778-.558 1.34-1.24 1.34-.68 0-1.217-.562-1.217-1.34Z"
        fill="#000"
      />
    </g>
  </IconComponent>
);

export default SearchFaq;
