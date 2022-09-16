/**
 *
 * Faq
 *
 */
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { redirectToEditQuestionPage } from 'containers/EditQuestion/actions';
import { getDocumentation } from 'containers/Documentation/actions';
import reducer from 'containers/Documentation/reducer';
import saga from 'containers/Documentation/saga';
import { selectDocumentation } from 'containers/Documentation/selectors';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';

import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { DAEMON } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { css } from '@emotion/react';

import Base from 'components/Base/BaseRoundedNoPadding';
import TextBlock from 'components/FormFields/TextBlock';
import commonMessages from 'common-messages';
import * as routes from 'routes-config';
import { TEXT_PRIMARY } from 'style-constants';

import faqPageHeader from 'images/faqPageHeader.svg?inline';
import infoIcon from 'images/icon-information.svg?inline';
import { FormattedMessage } from 'react-intl';
import { MediumImageStyled } from 'components/Img/MediumImage';
import H3 from 'components/H3';
import Span from 'components/Span';
import A from 'components/A';
import Wrapper, { WrapperRightPanel } from 'components/Header/Simple';

type User = {
  id: string;
  avatar: string;
  displayName: string;
  ratings: Array<{ communityId: number; rating: number }>;
  company: string;
  position: string;
  location: string;
  about: string;
  creationTime: number;
  achievements: Array<{ id: number }>;
};

type DocumentationProps = {
  match: {params: {sectionId: number}};
  getDocumentationDispatch: Function;
  documentation: Array<{ id: number, content: string, isDeleted: boolean }> | undefined;
  history: object;
};

export const Documentation: React.FC<DocumentationProps> = /* istanbul ignore next */ ({
   match,
   getDocumentationDispatch,
   documentation,
                                                                                         history,
 }) => {
  const single = isSingleCommunityWebsite();

  useEffect(() => {
    if (single) {
      getDocumentationDispatch(match.params.sectionId);
    }
  }, [match.params.sectionId]);

  const documentationSection = documentation.find((documentationSection => documentationSection.id === match.params.sectionId));
  if (!documentation) {
    return null;
  }

  if (documentationSection && documentationSection.isDeleted) {
    history.push(routes.notFound());
  }

  return (documentationSection && !documentationSection.isDeleted) ? (
    // prettier-ignore
    <div css={css`flex-grow: 1`}>
      <Wrapper className="mb-to-sm-0 mb-from-sm-3">
        <H3>
          <MediumImageStyled src={faqPageHeader} alt="documentation-header" />
          <span className="d-none d-md-inline-block">
           {documentationSection?.title}
          </span>
        </H3>
      </Wrapper>

      <Wrapper>
          <TextBlock content={documentationSection?.content} />
      </Wrapper>
    </div>
  ) : null;
};

export default compose(
  injectReducer({ key: 'documentationReducer', reducer }),
  injectSaga({ key: 'documentationReducer', saga, mode: DAEMON }),
  connect(
    createStructuredSelector({
      locale: makeSelectLocale(),
      profileInfo: makeSelectProfileInfo(),
      documentation: selectDocumentation(),
    }),
    (dispatch: Dispatch<AnyAction>) => ({
      getDocumentationDispatch: bindActionCreators(getDocumentation, dispatch),
      redirectToEditQuestionPageDispatch: bindActionCreators(
        redirectToEditQuestionPage,
        dispatch,
      ),
    }),
  ),
)(Documentation);
