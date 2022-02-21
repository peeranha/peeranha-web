import _get from 'lodash/get';
import {
  singleCommunityColors,
  singleCommunityFonts,
  singleCommunityStyles,
  getSingleCommunityDetails,
} from './utils/communityManagement';

const colors = singleCommunityColors();
const styles = singleCommunityStyles();
const fonts = singleCommunityFonts();
const communityDetails = getSingleCommunityDetails();

export const PEER_PRIMARY_COLOR = communityDetails?.colors?.main || '#576fed';
export const PEER_PRIMARY_TRANSPARENT_COLOR = '#dde2fb';
export const PEER_WARNING_COLOR =
  communityDetails?.colors?.highlight || '#fc6655';
export const PEER_WARNING_TRANSPARENT_COLOR = '#FDE2DF';
export const PEER_ERROR_COLOR = '#DC3545';
export const PEER_ERROR_TRANSPARENT_COLOR = '#dc35452b';
export const PEER_PREMIUM_COLOR = '#FF8500';
export const PEER_PREMIUM_TRANSPARENT_COLOR = '#FFECCC';

const black = _get(colors, 'black', '#282828');
const white = '#ffffff';
const gray = '#bdbdbd';
const darkgray = '#7b7b7b';
const lightgray = '#efefef';
const pink = PEER_WARNING_COLOR;
const lightblue = '#edeff6';
const blue = _get(colors, 'blue', PEER_PRIMARY_COLOR);
const premium = _get(colors, 'premium', PEER_PREMIUM_COLOR);
const premiumLight = _get(
  colors,
  'premiumLight',
  PEER_PREMIUM_TRANSPARENT_COLOR,
);
const purple = _get(colors, 'purple', 'rgba(39, 56, 104, 0.85)');
const darkblue = _get(colors, 'darkBlue', '#5065A5');
const transparent = 'rgba(0, 0, 0, 0)';
const green = '#28A745';
const lightgreen = '#ebffe7';
const lightgreen2 = green;
const darkred = '#dc3545';
const blue2 = _get(colors, 'blue2', '#dfe3f2');
const attentionColor = _get(colors, 'attentionColor', '#ff4026');
const linkColor = _get(colors, 'linkColor', PEER_PRIMARY_COLOR);

const blueRGB = _get(colors, 'blueRGB', `118, 153, 255`);
const premiumRGB = _get(colors, 'premiumRGB', `255, 133, 0`);
const darkBlueRGB = `80, 101, 165`;
const pinkRGB = `252, 102, 85`;
const graySpecialRGB = `40, 40, 40`;
const transparentSpecialRGB = `255, 255, 255`;
const lightblueSpecial = `#7699FF`;
const iconTransparentBlue = '#a5bcff';

const graySpecial2 = `rgba(${graySpecialRGB}, 0.1)`;
const graySpecial3 = 'rgba(250, 250, 250, 1)';
const graySpecial4 = '#f9f9f9';
const primarySpecial = _get(
  colors,
  'primarySpecial',
  'rgba(53, 74, 137, 0.11)',
);

export const FACEBOOK_MAIN = 'rgb(66, 103, 178)';

const secondarySpecial = _get(colors, 'secondarySpecial', '#c2c6d8');

export const LANDING_FONT = 'Open Sans, sans-serif';
export const APP_FONT = _get(fonts, 'main', 'Source Sans Pro, sans-serif');
export const TITLE_FONT = _get(fonts, 'title', 'Source Sans Pro, sans-serif');
export const SECONDARY_SPECIAL = secondarySpecial;
export const DARK_SECONDARY = _get(colors, 'darkSecondary', darkgray);
export const SECONDARY_SPECIAL_2 = graySpecial2;
export const SECONDARY_SPECIAL_3 = graySpecial3;
export const BG_SECONDARY_SPECIAL_4 = graySpecial4;
export const PRIMARY_SPECIAL = primarySpecial;
export const TRANSPARENT_SPECIAL = transparentSpecialRGB;

export const TEXT_LIGHT = white;
export const TEXT_DARK = black;
export const TEXT_SECONDARY = darkgray;
export const TEXT_SECONDARY_LIGHT = gray;
export const TEXT_SUCCESS = _get(colors, 'successColor', green);
export const TEXT_WARNING = darkred;
export const TEXT_WARNING_LIGHT = _get(colors, 'warningLight', pink);
export const TEXT_PRIMARY_DARK = darkblue;
export const TEXT_PRIMARY = blue;
export const TEXT_PREMIUM = premium;

export const LINK_COLOR = linkColor;
export const LINK_COLOR_SECONDARY = _get(
  colors,
  'linkColorSecondary',
  linkColor,
);
export const ICON_TRASPARENT_BLUE = iconTransparentBlue;

export const BORDER_LIGHT = white;
export const BORDER_SECONDARY = secondarySpecial;
export const BORDER_PRIMARY_DARK = darkblue;
export const BORDER_PRIMARY_LIGHT = lightblueSpecial;
export const BORDER_PRIMARY = blue;
export const BORDER_TUTORIAL = lightgreen2;
export const BORDER_PRIMARY_RGB = blueRGB;
export const BORDER_PREMIUM = premium;
export const BORDER_PREMIUM_RGB = premiumRGB;
export const BORDER_TRANSPARENT = transparent;
export const BORDER_SUCCESS = _get(colors, 'successColor', green);
export const BORDER_WARNING = darkred;
export const BORDER_WARNING_LIGHT = _get(colors, 'warningLight', pink);
export const BORDER_WARNING_LIGHT_RGB = pinkRGB;
export const BORDER_DARK = black;
export const BORDER_SECONDARY_LIGHT = _get(colors, 'secondaryLight', gray);
export const BORDER_ATTENTION_LIGHT = _get(colors, 'attentionLight', pink);

export const BG_SUCCESS = _get(colors, 'successColor', green);
export const BG_PRIMARY = blue;
export const BG_PRIMARY_RGB = blueRGB;
export const BG_PRIMARY_LIGHT = lightblue;
export const BG_PRIMARY_DARK = darkblue;
export const BG_PRIMARY_DARK_RGB = darkBlueRGB;
export const BG_PRIMARY_SPECIAL = purple;
export const BG_PREMIUM_LIGHT = premiumLight;
export const BG_LIGHT = white;

export const EXPERT_BACKLIGHT = 'rgba(87,111,237,0.4)';
export const TUTORIAL_BACKLIGHT = 'rgba(39,178,71,0.3)';
export const TUTORIAL_ICON_COLOR = 'rgb(39,178,71)';

export const BG_BLACK = black;
export const BG_TRANSPARENT = transparent;
export const BG_SUCCESS_LIGHT = _get(colors, 'lightSuccessColor', lightgreen);
export const BG_SECONDARY_LIGHT = lightgray;
export const BG_WARNING_LIGHT = _get(colors, 'warningLight', pink);
export const BG_WARNING_LIGHT_TRANSPARENT = `rgba(${pinkRGB}, 0.3)`;
export const BG_PRIMARY_SPECIAL_2 = blue2;
export const BG_PRIMARY_TRANSPARENT = `rgba(${blueRGB}, 0.1)`;

export const ATTENTION_COLOR = attentionColor;

export const BUTTON_COLOR = _get(colors, 'btnColor', pink);
export const TAG_COLOR = _get(colors, 'tagColor', blue);

export const BORDER_RADIUS_S = _get(styles, 'projectBorderRadius', '2px');
export const BORDER_RADIUS_M = _get(styles, 'projectBorderRadius', '3px');
export const BORDER_RADIUS_L = _get(styles, 'projectBorderRadius', '5px');
