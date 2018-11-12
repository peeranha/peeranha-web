import { shallow } from 'enzyme';

import { LOCATION_FIELD } from 'containers/Profile/constants';
import LocationField, { cities, CitiesList } from '../LocationField';

describe('LocationField test', () => {
  it('test by snapshots', () => {
    const getCitiesList = jest.fn();
    const cmp = LocationField({
      input: {},
      label: 'string',
      sendProps: {
        citiesList: [{ geonameId: 1 }],
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
      citiesList: [{ geonameId: 1 }],
      chooseLocation: jest.fn(),
    };
    expect(CitiesList(true, sendProps)).toMatchSnapshot();
  });
});
