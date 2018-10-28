import { shallow } from 'enzyme';

import { LOCATION_FIELD } from 'containers/Profile/constants';
import renderLocationField, {
  cities,
  CitiesList,
} from '../renderLocationField';

describe('renderLocationField test', () => {
  it('test by snapshots', () => {
    const getCitiesList = jest.fn();
    const cmp = renderLocationField({
      input: {},
      label: 'string',
      sendProps: {
        citiesList: [{}],
        getCitiesList,
        profile: {
          ipfs: {
            [LOCATION_FIELD]: {
              name: '',
            },
          },
        },
      },
    });

    expect(cmp).toMatchSnapshot();
    expect(getCitiesList).toHaveBeenCalledTimes(0);

    shallow(cmp)
      .find('.location-field')
      .simulate('change', { target: {} });

    expect(getCitiesList).toHaveBeenCalledTimes(1);
  });

  it('test cities', () => {
    const list = [{ geonameId: 1 }];
    const chooseLocation = jest.fn();
    const cmp = cities(list, { chooseLocation })[0];
    const wrapper = shallow(cmp);

    expect(wrapper).toMatchSnapshot();

    expect(chooseLocation).toHaveBeenCalledTimes(0);
    wrapper.find('.cityItem').simulate('click');
    expect(chooseLocation).toHaveBeenCalledTimes(1);
  });

  it('CitiesList', () => {
    const sendProps = {
      citiesList: [{}],
      chooseLocation: jest.fn(),
    };
    expect(CitiesList(true, sendProps)).toMatchSnapshot();
  });
});
