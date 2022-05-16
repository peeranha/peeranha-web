import { useState } from 'react';
import { Source } from '@storybook/addon-docs';
import * as icons from './index';
import { css } from '@emotion/react';
import colors from 'styles/colors';

export default {
  title: 'Thema',
  parameters: {
    controls: { disable: true },
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
};

export const Colors = () => {
  return (
    <div>
      {Object.keys(colors).map(varname => (
        <div className="df aic" style={{ margin: 10 }} key={varname}>
          <div
            style={{ background: colors[varname], width: 100, height: 50 }}
          />
          <div style={{ marginLeft: 10 }}>
            {varname}: {colors[varname]}
          </div>
        </div>
      ))}
    </div>
  );
};

// export const Icons = () => {
//   const [search, setSearch] = useState('')
//   const [iconName, setIconName] = useState('IconName')

//   return (
//     <>
//       <div style={{ width: 300 }}>
//         <input
//           placeholder={'Search Icons'}
//           value={search}
//           type="search"
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>
//       <Source
//         language={'js'}
//         code={`
// import ${iconName}Icon from 'icons/${iconName}'
//         `}
//       />
//       <div css={css`
//         display: flex;
//         margin: -8px;
//         & span {
//           margin: 8px;
//           cursor: pointer;
//         }
//       `}>
//         {Object.entries(icons)
//           .filter(([name]) => name.toLowerCase().includes(search.toLowerCase()))
//           .map(([name, Icon]) => (
//             <span
//               key={name}
//               onClick={() => setIconName(name)}
//             >
//               <Icon />
//             </span>
//           ))}
//       </div>
//     </>
//   )
// }
