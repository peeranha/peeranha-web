import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { memoryHistory } from 'react-router-dom';
import configureStore from 'configureStore';
import { ConnectedRouter } from 'react-router-redux';
import createdHistory from 'createdHistory';

import LanguageProvider from 'containers/LanguageProvider';

import AskQuestionFormDefault from '../AskQuestionForm';
import messages from '../messages';

jest.mock('react-simplemde-editor');
jest.mock('simplemde/dist/simplemde.min.css');

const props = {
  invalid: false,
  submitting: false,
  askQuestionLoading: false,
  userIsInSystem: true,
  handleSubmit: jest.fn(),
  postQuestion: jest.fn(),
  translations: {
    [messages.title.id]: 'content',
  },
};

describe('<AskQuestionFormDefault />', () => {
  it('snapshot test 1', () => {
    const store = configureStore({}, memoryHistory);
    const renderedComponent = mount(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={{}}>
          <ConnectedRouter history={createdHistory}>
            <AskQuestionFormDefault {...props} />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('snapshot test 2', () => {
    props.invalid = true;
    const store = configureStore({}, memoryHistory);
    const renderedComponent = mount(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={{}}>
          <ConnectedRouter history={createdHistory}>
            <AskQuestionFormDefault {...props} />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('snapshot test 3', () => {
    props.submitting = true;
    const store = configureStore({}, memoryHistory);
    const renderedComponent = mount(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={{}}>
          <ConnectedRouter history={createdHistory}>
            <AskQuestionFormDefault {...props} />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('snapshot test 4', () => {
    props.askQuestionLoading = true;
    const store = configureStore({}, memoryHistory);
    const renderedComponent = mount(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={{}}>
          <ConnectedRouter history={createdHistory}>
            <AskQuestionFormDefault {...props} />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
