import React from 'react';
import Loader from 'components/LoadingIndicator/HeightWidthCentered';

const LoaderDocumentation = (): JSX.Element => (
  <div
    css={{
      '& > div': {
        height: 200,
        width: '100%',
      },
    }}
  >
    <Loader />
  </div>
);

export default LoaderDocumentation;
