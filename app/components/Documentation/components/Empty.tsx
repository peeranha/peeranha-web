import React from 'react';
import Button from 'common-components/Button';
import noQuestionsAllQuestionsPage from 'images/noQuestionsAllQuestionsPage.svg?inline';

const Empty: React.FC<{ onClickAddArticle: () => void }> = ({
  onClickAddArticle,
}): JSX.Element => (
  <div
    css={{
      padding: 24,
      fontSize: 20,
    }}
    className="df aic jcc"
  >
    <img src={noQuestionsAllQuestionsPage} className="mr24" />
    <div>
      <div className="mb24">
        {"There aren't any articles yet. Would you like to add your first one?"}
      </div>
      <Button variant="primary" onClick={onClickAddArticle}>
        Add new article
      </Button>
    </div>
  </div>
);

export default Empty;
