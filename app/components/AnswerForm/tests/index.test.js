import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { memoryHistory } from 'react-router-dom';
import configureStore from 'configureStore';
import { ConnectedRouter } from 'react-router-redux';
import createdHistory from 'createdHistory';

import TextEditor from 'components/TextEditor';
import LanguageProvider from 'containers/LanguageProvider';

import { AnswerForm } from '../index';

jest.mock('react-simplemde-editor');
jest.mock('simplemde/dist/simplemde.min.css');

TextEditor.instance = {
  codemirror: {
    options: {
      readOnly: true,
    },
  },
};

describe('<AnswerForm />', () => {
  const props = {
    form: 'form1',
    handleSubmit: jest.fn(),
    postAnswer: jest.fn(),
    submitting: false,
    invalid: false,
    sendAnswerLoading: false,
    translations: {},
  };

  it('snapshot test', () => {
    const store = configureStore({}, memoryHistory);
    const renderedComponent = shallow(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={{}}>
          <ConnectedRouter history={createdHistory}>
            <AnswerForm {...props} />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('@sendAnswerLoading === true', () => {
    props.sendAnswerLoading = true;

    const store = configureStore({}, memoryHistory);
    const renderedComponent = shallow(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={{}}>
          <ConnectedRouter history={createdHistory}>
            <AnswerForm {...props} />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
