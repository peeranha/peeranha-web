import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { memoryHistory } from 'react-router-dom';
import configureStore from 'configureStore';
import { ConnectedRouter } from 'react-router-redux';
import createdHistory from 'createdHistory';

import LanguageProvider from 'containers/LanguageProvider';

import CommentForm from '../CommentForm';

describe('<CommentForm />', () => {
  const props = {
    form: 'form-1010',
    handleSubmit: jest.fn(),
    postComment: jest.fn(),
    submitting: false,
    invalid: false,
    postCommentLoading: false,
    translations: {},
  };

  it('snapshot test', () => {
    const store = configureStore({}, memoryHistory);
    const renderedComponent = mount(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={{}}>
          <ConnectedRouter history={createdHistory}>
            <CommentForm {...props} />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('@postCommentLoading === true', () => {
    props.postCommentLoading = true;

    const store = configureStore({}, memoryHistory);
    const renderedComponent = mount(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={{}}>
          <ConnectedRouter history={createdHistory}>
            <CommentForm {...props} />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
