import loadable, { LoadableComponent } from '@loadable/component';
import { Route as Router5Route } from 'router5';

const routes: Route[] = [
  {
    name: 'home',
    path: '/',
    Component: loadable(() => import('../pages/home')),
  },
  {
    name: 'detail',
    path: '/:userName',
    Component: loadable(() => import('../pages/detail')),
  },
  {
    name: 'repo',
    path: '/:userName/:repoName',
    Component: loadable(() => import('../pages/repo')),
  },
];

export default routes;

export interface Route extends Router5Route {
  Component: LoadableComponent<Record<string, unknown>>;
}
