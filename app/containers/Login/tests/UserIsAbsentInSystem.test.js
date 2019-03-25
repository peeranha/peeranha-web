import UserIsAbsentInSystem from '../UserIsAbsentInSystem';

it('LoginOptions', () => {
  expect(UserIsAbsentInSystem({})).toMatchSnapshot();
});
