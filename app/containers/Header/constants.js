import { isSingleCommunityWebsite } from 'utils/communityManagement';

const singleCommunityId = isSingleCommunityWebsite();

export const HEADER_ID = 'containers_header_HEADER_ID';
export const HEADER_HEIGHT = singleCommunityId ? 120 : 80;
export const MOBILE_HEADER_HEIGHT = singleCommunityId ? 90 : 60;
