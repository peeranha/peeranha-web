import routes from 'app/constants/routes';
import {
  BaseLayout,
  HomePage,
} from 'containers';

export default [
  {
    path: routes.root,
    component: BaseLayout,
    routes: [
      {
        path: routes.home,
        component: HomePage,
      },
    ],
  },
];
