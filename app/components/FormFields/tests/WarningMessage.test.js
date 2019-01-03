import WarningMessage from '../WarningMessage';
jest.mock('react-intl');

const props = {
  touched: true,
  error: {},
  warning: {},
};

describe('WarningMessage test', () => {
  describe('test by snapshots', () => {
    it('touched: true, error: true', () => {
      props.error = {};
      props.warning = null;
      props.touched = true;

      expect(WarningMessage(props)).toMatchSnapshot();
    });

    it('touched: false,', () => {
      props.touched = false;

      expect(WarningMessage(props)).toMatchSnapshot();
    });

    it('touched: true, warning: true', () => {
      props.touched = true;
      props.error = null;
      props.warning = {};

      expect(WarningMessage(props)).toMatchSnapshot();
    });
  });
});
