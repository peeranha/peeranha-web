import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { memoryHistory } from 'react-router-dom';
import configureStore from 'configureStore';
import { ConnectedRouter } from 'react-router-redux';
import createdHistory from 'createdHistory';

import TextEditor from 'components/TextEditor';
import LanguageProvider from 'containers/LanguageProvider';

import AnswerQuestionForm from '../AnswerQuestionForm';

jest.mock('react-simplemde-editor');
jest.mock('simplemde/dist/simplemde.min.css');

TextEditor.instance = {
  codemirror: {
    options: {
      readOnly: true,
    },
  },
};

describe('<AnswerQuestionForm />', () => {
  const props = {
    handleSubmit: jest.fn(),
    postAnswer: jest.fn(),
    submitting: false,
    invalid: false,
    postAnswerLoading: false,
    translations: {},
  };

  it('snapshot test', () => {
    const store = configureStore({}, memoryHistory);
    const renderedComponent = mount(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={{}}>
          <ConnectedRouter history={createdHistory}>
            <AnswerQuestionForm {...props} />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('@postCommentLoading === true', () => {
    props.postAnswerLoading = true;

    const store = configureStore({}, memoryHistory);
    const renderedComponent = mount(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={{}}>
          <ConnectedRouter history={createdHistory}>
            <AnswerQuestionForm {...props} />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
