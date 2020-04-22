import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
} from 'utils/communityManagement';

const single = isSingleCommunityWebsite();
const styles = singleCommunityStyles();

export const HEADER_ID = 'containers_header_HEADER_ID';
export const HEADER_HEIGHT =
  (single && !styles.withoutSubHeader) || styles.customSubHeader ? 120 : 80;
export const MOBILE_HEADER_HEIGHT =
  (single && !styles.withoutSubHeader) || styles.customSubHeader ? 56 : 60;
