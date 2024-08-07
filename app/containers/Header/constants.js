import { isSingleCommunityWebsite, singleCommunityStyles } from 'utils/communityManagement';

const single = isSingleCommunityWebsite();
const styles = singleCommunityStyles();

export const HEADER_ID = 'containers_header_HEADER_ID';
export const HEADER_HEIGHT =
  (single && !styles.withoutSubHeader) || styles.customSubHeader ? styles?.headerHeight || 120 : 80;
export const MOBILE_HEADER_HEIGHT =
  (single && !styles.withoutSubHeader) || styles.customSubHeader ? 56 : 60;
export const LOADER_HEIGHT = 35;

export const SEARCH_FORM_ID = 'q';

export const MIN_REPUTATION = 0;

export const IS_SUI_MAIN = styles.name === 'suiMain';
