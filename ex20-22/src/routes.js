import { Route } from 'react-router-dom';
import { Home, About, Contact, Products, Profile, NotFound } from './pages/Pages';
import Users from './pages/Users';
import DishList from './pages/DishList';
import DishDetail from './pages/DishDetail';

// Exercise 20: route declarations are kept outside App.js.
// React Router 6 expects JSX elements and no longer uses the exact prop.
export const routes = [
  { path: '/', element: <Home /> },
  { path: '/products', element: <Products /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '/users/:userId?', element: <Users /> },
  { path: '/dishes', element: <DishList /> },
  { path: '/dishes/:dishId', element: <DishDetail /> },
  { path: '/profile/:userId?', element: <Profile /> },
  { path: '*', element: <NotFound /> },
];

export function renderRoutes() {
  return routes.map(({ path, element }) => (
    <Route key={path} path={path} element={element} />
  ));
}
