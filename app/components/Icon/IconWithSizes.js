import React from 'react';

import Icon from './index';

const IconSm = (props) => <Icon width="14" {...props} />;
const IconXm = (props) => <Icon width="15" {...props} />;
const IconMd = (props) => <Icon width="18" {...props} />;
const IconEm = (props) => <Icon width="19" {...props} />;
const IconLm = (props) => <Icon width="20" {...props} />;
const IconLg = (props) => <Icon width="24" {...props} />;
const IconXl = (props) => <Icon width="140" {...props} />;
const IconLabel = (props) => <Icon width="34" height="22" {...props} />;

export { IconSm, IconXm, IconMd, IconEm, IconLm, IconLg, IconXl, IconLabel };
