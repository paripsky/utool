import { Fragment } from 'react';
import { Route } from 'react-router-dom';

const routeFiles = import.meta.globEager('/src/pages/utilities/*.tsx');

const routes = Object.keys(routeFiles).map((route) => {
  const path = route
    .replace(/\/src\/pages\/utilities|index|\.tsx$/g, '')
    .replace(/\[\.{3}.+\]/, '*')
    .replace(/\[(.+)\]/, ':$1');

  return {
    path: `util/builtin${path}`,
    name: routeFiles[route].name,
    component: routeFiles[route].default,
  };
});

export const utilityRoutesPaths = routes.map(({ path, name }) => ({
  path,
  name: typeof name === 'string' ? name : 'Unkown',
}));

const utilityRoutes = routes.map(({ path, component: Component = Fragment }) => (
  <Route key={path} path={path} element={<Component />} />
));

export default utilityRoutes;
