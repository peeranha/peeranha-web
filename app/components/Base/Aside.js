import { LEFT_MENU_WIDTH } from 'containers/App/constants';
import BaseTransparent from './BaseTransparent';

export default BaseTransparent.extend`
  flex: 0 0 ${LEFT_MENU_WIDTH}px;
  padding-right: 0;
`.withComponent('aside');
