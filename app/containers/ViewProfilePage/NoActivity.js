import React from 'react';
import { FormattedMessage } from 'react-intl';

import Span from 'components/Span';
import BaseRounded from 'components/Base/BaseRounded';
import H4 from 'components/H4';

import noActivityImg from 'images/userHasntActivity.png';
import messages from 'containers/Profile/messages';

const NoActivity = () => (
  <div>
    <H4 isHeader>
      <FormattedMessage {...messages.activity} />
    </H4>
    <BaseRounded className="d-flex align-items-center py-5">
      <img src={noActivityImg} alt="noActivityImg" />
      <div className="ml-5 mb-2">
        <p className="mb-1">
          <Span fontSize="24" bold>
            <FormattedMessage {...messages.userHasntActivityYet} />
          </Span>
        </p>
        <p>
          <Span>
            <FormattedMessage {...messages.heHasnoAnswersAndQuestions} />
          </Span>
        </p>
      </div>
    </BaseRounded>
  </div>
);

export default React.memo(NoActivity);
