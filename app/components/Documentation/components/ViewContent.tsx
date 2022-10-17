import React from 'react';
import TextBlock from 'components/FormFields/TextBlock';
import { MediumImageStyled } from 'components/Img/MediumImage';
import H3 from 'components/H3';
import Wrapper from 'components/Header/Simple';

const ViewContent: React.FC<any> = ({
  faqPageHeader,
  documentationSection,
}): JSX.Element => (
  <>
    <Wrapper className="mb-to-sm-0 mb-from-sm-3">
      <H3>
        {faqPageHeader && (
          <MediumImageStyled src={faqPageHeader} alt="documentation-header" />
        )}
        <span className="d-none d-md-inline-block">
          {documentationSection?.title}
        </span>
      </H3>
    </Wrapper>
    <Wrapper>
      <TextBlock content={documentationSection?.content} />
    </Wrapper>
  </>
);

export default ViewContent;
