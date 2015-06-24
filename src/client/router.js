import { create as createRouter, HashLocation } from 'react-router';
import routes from './routes';

export default createRouter({
  location: HashLocation,
  routes: routes
});
