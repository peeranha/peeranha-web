import renderer from 'react-test-renderer';
import 'jest-styled-components';

import TextInputField from '../TextInputField';
jest.mock('react-intl');

const props = {
  input: {},
  label: 'string',
  sendProps: {},
  meta: {},
};

describe('TextInputField test', () => {
  describe('test by snapshots', () => {
    it('default', () => {
      const rendered = renderer.create(TextInputField(props)).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('meta.touched = true', () => {
      props.meta.touched = true;
      const rendered = renderer.create(TextInputField(props)).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('meta.error = true', () => {
      props.meta.error = true;
      const rendered = renderer.create(TextInputField(props)).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('meta.warning = true', () => {
      props.meta.warning = true;
      const rendered = renderer.create(TextInputField(props)).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });
});
