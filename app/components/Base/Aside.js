import { LEFT_MENU_WIDTH } from 'containers/AppWrapper/constants';
import BaseTransparent from './BaseTransparent';

export default BaseTransparent.extend`
  flex: 0 0 ${LEFT_MENU_WIDTH}px;
  padding-left: 0;
  padding-right: 0;
  margin-left: 30px;
`.withComponent('aside');
