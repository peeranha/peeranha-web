import React from 'react';
import EditorOptions from 'simplemde';
import { shallow } from 'enzyme';

import TextEditor from '../index';

jest.mock('simplemde', () => ({
  EditorOptions: jest.fn(),
}));

const cmp = new TextEditor();
cmp.props = {
  input: {},
  content: 'content',
  onChange: jest.fn(),
  onBlur: jest.fn(),
};

describe('<TextEditor />', () => {
  describe('onBlurHandler', () => {
    it('test', () => {
      const txt = 'some txt';
      cmp.props.value = txt;
      cmp.onBlurHandler();
      expect(cmp.props.onBlur).toHaveBeenCalledWith(txt);
    });
  });

  describe('getHtmlText', () => {
    it('test', () => {
      const md = '# Hello';
      const returnedText = '<h1>Hello</h1>';

      EditorOptions.prototype = {
        markdown: jest.fn().mockImplementation(() => returnedText),
      };

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
