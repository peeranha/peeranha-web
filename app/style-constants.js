import _get from 'lodash/get';
import {
  singleCommunityColors,
  singleCommunityFonts,
} from './utils/communityManagement';

const colors = singleCommunityColors();
const fonts = singleCommunityFonts();

const black = _get(colors, 'black', '#282828');
const white = '#ffffff';
const gray = '#bdbdbd';
const darkgray = '#7b7b7b';
const lightgray = '#efefef';
const pink = '#fc6655';
const lightblue = '#edeff6';
const blue = _get(colors, 'blue', '#576fed');
const purple = _get(colors, 'purple', 'rgba(39, 56, 104, 0.85)');
const darkblue = _get(colors, 'darkBlue', '#5065A5');
const transparent = 'rgba(0, 0, 0, 0)';
const green = '#28A745';
const lightgreen = '#ebffe7';
const darkred = '#dc3545';
const blue2 = _get(colors, 'blue2', '#dfe3f2');
const attentionColor = _get(colors, 'attentionColor', '#ff4026');
const linkColor = _get(colors, 'linkColor', '#576fed')

const blueRGB = _get(colors, 'blueRGB', `118, 153, 255`);
const darkBlueRGB = `80, 101, 165`;
const pinkRGB = `252, 102, 85`;
const graySpecialRGB = `40, 40, 40`;
const transparentSpecialRGB = `255, 255, 255`;
const lightblueSpecial = `#7699FF`;

const graySpecial2 = `rgba(${graySpecialRGB}, 0.1)`;
const graySpecial3 = 'rgba(250, 250, 250, 1)';
const graySpecial4 = '#f9f9f9';
const primarySpecial = 'rgba(53, 74, 137, 0.11)';
const secondarySpecial = _get(colors, 'secondarySpecial', '#c2c6d8');

export const LANDING_FONT = 'Open Sans, sans-serif';
export const APP_FONT = _get(fonts, 'main', 'Source Sans Pro, sans-serif');
export const SECONDARY_SPECIAL = secondarySpecial;
export const SECONDARY_SPECIAL_2 = graySpecial2;
export const SECONDARY_SPECIAL_3 = graySpecial3;
export const BG_SECONDARY_SPECIAL_4 = graySpecial4;
export const PRIMARY_SPECIAL = primarySpecial;
export const TRANSPARENT_SPECIAL = transparentSpecialRGB;

export const TEXT_LIGHT = white;
export const TEXT_DARK = black;
export const TEXT_SECONDARY = darkgray;
export const TEXT_SECONDARY_LIGHT = gray;
export const TEXT_SUCCESS = green;
export const TEXT_WARNING = darkred;
export const TEXT_WARNING_LIGHT = _get(colors, 'warningLight', pink);
export const TEXT_PRIMARY_DARK = darkblue;
export const TEXT_PRIMARY = blue;

export const LINK_COLOR = linkColor;

export const BORDER_SECONDARY = secondarySpecial;
export const BORDER_PRIMARY_DARK = darkblue;
export const BORDER_PRIMARY_LIGHT = lightblueSpecial;
export const BORDER_PRIMARY = blue;
export const BORDER_PRIMARY_RGB = blueRGB;
export const BORDER_TRANSPARENT = transparent;
export const BORDER_SUCCESS = green;
export const BORDER_WARNING = darkred;
export const BORDER_WARNING_LIGHT = _get(colors, 'warningLight', pink);
export const BORDER_WARNING_LIGHT_RGB = pinkRGB;
export const BORDER_DARK = black;
export const BORDER_SECONDARY_LIGHT = gray;

export const BG_SUCCESS = green;
export const BG_PRIMARY = blue;
export const BG_PRIMARY_LIGHT = lightblue;
export const BG_PRIMARY_DARK = darkblue;
export const BG_PRIMARY_DARK_RGB = darkBlueRGB;
export const BG_PRIMARY_SPECIAL = purple;
export const BG_LIGHT = white;
export const BG_BLACK = black;
export const BG_TRANSPARENT = transparent;
export const BG_SUCCESS_LIGHT = lightgreen;
export const BG_SECONDARY_LIGHT = lightgray;
export const BG_WARNING_LIGHT = _get(colors, 'warningLight', pink);
export const BG_PRIMARY_SPECIAL_2 = blue2;
export const ATTENTION_COLOR = attentionColor;
