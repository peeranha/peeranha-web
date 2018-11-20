import React from 'react';
import { shallow } from 'enzyme';

import TextEditor from '../index';

const cmp = new TextEditor();
cmp.props = {
  input: {},
  content: 'content',
  onChange: jest.fn(),
  onBlur: jest.fn(),
};

beforeEach(() => {
  TextEditor.instance = {
    options: {
      previewRender: jest.fn(),
    },
    codemirror: {
      options: {
        readOnly: true,
      },
    },
  };
});

describe('<TextEditor />', () => {
  describe('componentDidUpdate', () => {
    it('test', () => {
      const renderedComponent = shallow(<TextEditor {...cmp.props} />);
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('onBlurHandler', () => {
    it('test', () => {
      const txt = 'some txt';
      cmp.props.value = txt;
      cmp.onBlurHandler();
      expect(cmp.props.onBlur).toHaveBeenCalledWith(txt);
    });
  });

  describe('getMdeInstance', () => {
    it('test', () => {
      const instance = { id: 101 };
      cmp.getMdeInstance(instance);
      expect(TextEditor.instance).toEqual(instance);
    });
  });

  describe('getHtmlText', () => {
    it('test', () => {
      const md = '# Hello';
      const returnedText = '<h1>Hello</h1>';

      TextEditor.instance.options.previewRender = jest
        .fn()
        .mockImplementation(() => returnedText);

      expect(TextEditor.getHtmlText(md)).toBe(returnedText);
    });
  });

  describe('snapshot test', () => {
    it('test', () => {
      const renderedComponent = shallow(<TextEditor {...cmp.props} />);
      expect(renderedComponent).toMatchSnapshot();
    });
  });
});
